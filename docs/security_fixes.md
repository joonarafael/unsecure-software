# SECURITY FIXES

This document will provide you with the necessary steps to fix the security issues present in the application. The fixes are based on the issues described in [this document](./security_issues.md "Security Issues").

**NOTE**: If you are running the application locally as a _Docker_ container, you will need to build the image again after making these changes. The application will not automatically update itself when modifying the source code. See the [Installation Manual](https://github.com/joonarafael/unsecure-software/blob/main/docs/installation_manual.md#create-the-docker-image-for-the-app "Installation Manual") for more information on how to build the Docker image.

## Fixing [Issue 2](./security_issues.md#issue-2---a02-cryptographic-failures "Issue 2 - Cryptographic Failures")

Replace plaintext passwords with hashed passwords in the database through the database control panel (behind button "_Let's do it_" on index page or route `/populate`). Login credentials remain the same, they are just stored in a more secure manner.

Then, change the authentication logic within the _login API endpoint_ (file [`/app/api/auth/login/route.ts`](../app/api/auth/login/route.ts "Open file")) to look like this:

```typescript
...
43			);
44		}
45
46		// comment / uncomment code below to switch between hashed and plaintext password comparison
47		// const validPassword = existingUser.password === password;
48		const validPassword = await bcrypt.compare(password, existingUser.password);
49
50		if (!validPassword) {
51			return NextResponse.json(
...
```

## Fixing [Issue 4](./security_issues.md#issue-4---a04-insecure-design "Issue 4 - Insecure Design")

Let's make the login error response messages more generic. Change every response message within the _login API endpoint_ (file [`/app/api/auth/login/route.ts`](../app/api/auth/login/route.ts "Open file")) to look like this:

```typescript
...
return NextResponse.json(
	{
		message: "Invalid username or password.",
	},
	{
		status: 400,
	}
);
...
```

These messages exist on lines [21](https://github.com/joonarafael/unsecure-software/blob/1d9ec2805918650ab06ca7d7634e54bbac8e4a8d/app/api/auth/login/route.ts#L21 "View exact line on GitHub"), [38](https://github.com/joonarafael/unsecure-software/blob/1d9ec2805918650ab06ca7d7634e54bbac8e4a8d/app/api/auth/login/route.ts#L38 "View exact line on GitHub"), and [56](https://github.com/joonarafael/unsecure-software/blob/1d9ec2805918650ab06ca7d7634e54bbac8e4a8d/app/api/auth/login/route.ts#L56 "View exact line on GitHub").

## Fixing [Issue 5](./security_issues.md#issue-5---a07-identification-and-authentication-failures "Issue 5 - Identification and Authentication Failures")

Let's invalidate tokens on logout. Change the logout logic within the _logout API endpoint_ (file [`/app/api/auth/logout/route.ts`](../app/api/auth/logout/route.ts "Open file")) to look like this:

```typescript
...
44				},
45			});
46
47			if (verifiedUser) {
48				await db.user.update({
49					where: {
50						id: jwtToken.id,
51					},
52					data: {
53						accessToken: "null",
54					},
55				});
56
57				return NextResponse.json(
58					{
59						message: "Logout successful.",
60					},
61					{
62						status: 200,
63					}
64				);
65			}
66		}
...
```

Now after user logs out, no requests made with the old token will get through. Any request made with an `accessToken` equal to `"null"` will be globally rejected by the API routes.

## Fixing [Issue 1](./security_issues.md#issue-1---a01-broken-access-control "Issue 1 - Broken Access Control") and [Issue 3](./security_issues.md#issue-3---a03-injection "Issue 3 - Injection")

We'll address both the broken access control and injection simply by not fetching the user data based on the URL search parameter. Change the user data fetching within the _getUser API endpoint_ (file [`/app/api/getuser/route.ts`](../app/api/getuser/route.ts "Open file")) to look like this:

```typescript
...
45			});
46
47			if (verifiedUser) {
48				const user = await db.user.findFirst({
49                  where: {
50                      id: verifiedUser.id,
51                  },
52              });
53
54				if (user) {
55					return NextResponse.json(
...
```

Now the user data fetching is based on the user ID from the token, not from the URL parameter. This change will make the application more secure and prevent any further SQL injection attacks against the system.

**OPTIONAL**: If you want, you may remove the URL search parameter logic completely from the application.

First, update the button on the dashboard page (file [`/app/dashboard/page.tsx`](../app/dashboard/page.tsx "Open file")) to look like this:

```typescript
...
92				</div>
93				<div className="flex gap-2 p-4 flex-col border rounded-lg">
94					<h3 className="text-lg font-bold">See your account information</h3>
95					<a href="/user" className="flex w-full">
96						<Button className="flex w-full" size="lg">
97							I&apos;m interested
98						</Button>
...
```

Then, remove the "client-side user data fetching request logic" within the user page (file [`/app/user/page.tsx`](../app/user/page.tsx "Open file")) to look like this:

```typescript
...
09  import { User } from "@/types";
10
11  const UserClient = () => {
12      const [user, setUser] = useState<User | null>(null);
13
14      useEffect(() => {
15          const jwtToken = sessionStorage.getItem("token");
16
17          if (jwtToken) {
18              const values = {
19                  headers: {
20                      Authorization: `Bearer ${jwtToken}`,
21                  },
22              };
23
24              axios
25                  .post("/api/getuser", values)
26                  .then((res) => {
27                      setUser(res.data.user);
28                  })
29                  .catch((error) => {});
30          }
31      }, []);
32
33      if (!user) {
34          return (
...
```

## Further Fixing [Issue 4](./security_issues.md#issue-4---a04-insecure-design "Issue 4 - Insecure Design")

Let's not return passwords and access tokens in the API responses while fetching user info. Change the user data fetching within the _getUser API endpoint_ (file [`/app/api/getuser/route.ts`](../app/api/getuser/route.ts "Open file")) to look like this:

**Assuming you fixed already [issues 1 and 3 above](./security_fixes.md#fixing-issue-1-and-issue-3 "Fixing Issue 1 and Issue 3")**!

```typescript
...
45			});
46
47			if (verifiedUser) {
48				const user = await db.user.findFirst({
49                  where: {
50                      id: verifiedUser.id,
51                  },
52                  select: {
53                      id: true,
54                      username: true,
55                      createdAt: true,
56                      updatedAt: true,
57                  }
58              });
59
60				if (user) {
61					return NextResponse.json(
...
```

You may also want to change the client UI to not display the empty password (optional, purely a cosmetic touch). Change the user page (file [`/app/user/page.tsx`](../app/user/page.tsx "Open file")) to look like this:

```typescript
...
68				<p className="font-light">
69					<em>here are your account details</em>
70				</p>
71				<h1 className="text-3xl font-extrabold">{user.username}</h1>
72				<div className="flex gap-2 p-4 flex-col border rounded-lg">
73					<div className="flex w-full justify-between flex-row">
74						<p className="text-neutral-500">id</p>
75						<p>{user.id}</p>
76					</div>
77					<div className="flex w-full justify-between flex-row">
78						<p className="text-neutral-500">username</p>
79						<p>{user.username}</p>
80					</div>
81					<div className="flex w-full justify-between flex-row">
82						<p className="text-neutral-500">created at</p>
83						<p>{JSON.stringify(user.createdAt)}</p>
84					</div>
85					<div className="flex w-full justify-between flex-row">
86						<p className="text-neutral-500">updated at</p>
87						<p>{JSON.stringify(user.updatedAt)}</p>
88					</div>
89				</div>
...
```

## Congrats, you just made the application substantially more secure! 🎉

Now rebuild the Docker image and run the application again. You can try again all the described attacks in the [Security Issues document](./security_issues.md "Security Issues") and learn that none work anymore!
