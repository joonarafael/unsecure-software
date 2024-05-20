# SECURITY ISSUES

## Issue 1 - [A01 Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/ "OWASP/Top 10: Broken Access Control")

**OWASP**: "_Bypassing access control checks by modifying the URL (parameter tampering or force browsing), internal application state, or the HTML page, or by using an attack tool modifying API requests._"

### How this is present in my application

User data fetching on route `/user` is not safe. While the user information fetching requires access token, the API request is made based on the URL parameter. You can give any user ID within the URL `?id=` search parameter to query for any user in the database.

### How to perform an attack against the unsecure system yourself

User ID generation is quite safe, so try not to guess a user ID. Instead, copy a user ID for yourself from the user information page (when logged in as that user). Then, log out, and log in as **any other** user. Navigate again to `/user`, and replace the search parameter for `userId` with the previous user's ID, e.g. the one you copied first. See the results.

## Issue 2 - [A02 Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/ "OWASP/Top 10: Cryptographic Failures")

**OWASP**: "_Shifting up one position to #2, previously known as Sensitive Data Exposure, which is more of a broad symptom rather than a root cause, the focus is on failures related to cryptography (or lack thereof). Which often lead to exposure of sensitive data._"

### How this is present in my application

As a default, passwords are not encrypted in the database. They are stored as plaintext. If anyone hypothetically got access to the database, they could read the passwords in clear text.

## Issue 3 - [A03 Injection](https://owasp.org/Top10/A03_2021-Injection/ "OWASP/Top 10: Injection")

**OWASP**: "_An application is vulnerable to attack when:_

_- User-supplied data is not validated, filtered, or sanitized by the application._

_- Dynamic queries or non-parameterized calls without context-aware escaping are used directly in the interpreter._

_- Hostile data is used within object-relational mapping (ORM) search parameters to extract additional, sensitive records._

_- Hostile data is directly used or concatenated. The SQL or command contains the structure and malicious data in dynamic queries, commands, or stored procedures._"

### How this is present in my application

The user data is fetched in a dangerous manner when user info is retrieved. The user ID for database query is fetched from the URL search parameter (see [first issue](./security_issues.md#how-this-is-present-in-my-application "Issue 1 - How this is present in my application")), and directly used in the SQL command. While the library I've used in my application does not allow _prepared statements with multiple commands_, the data is still left exposed and vulnerable to an SQL injection.

### How to perform an attack against the unsecure system yourself

While logged in, replace the user ID within the URL `?id=` search parameter to `' OR 1=1; --`. This will return the complete user table from the database. You may read the list by navigating to your browser's developer tools (open with F12) and looking at the response from the API request ("Network" tab).

## Issue 4 - [A04 Insecure Design](https://owasp.org/Top10/A04_2021-Insecure_Design/ "OWASP/Top 10: Insecure Design")

**OWASP**: "_Notable Common Weakness Enumerations (CWEs) include CWE-209: Generation of Error Message Containing Sensitive Information, ..., and CWE-522: Insufficiently Protected Credentials._"

### How this is present in my application

Response messages from the server during login are not generic. They give away information about the user's existence (or the lack thereof) in the database.

Other insecure design issues are present in the API design as well, like the returning of passwords and access tokens, which should not be returned to user when inspecting their account details (page `/user`).

### How to perform an attack against the unsecure system yourself

Try to login with wrong credentials. The response message will tell you if the user exists in the database or not. And if the user exists, it will tell you that the password is wrong.

## Issue 5 - [A07 Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/ "OWASP/Top 10: Identification and Authentication Failures")

**OWASP**: "_Does not correctly invalidate Session IDs. User sessions or authentication tokens (mainly single sign-on (SSO) tokens) aren't properly invalidated during logout or a period of inactivity._"

### How this is present in my application

The session token is not invalidated when the user logs out. The token is still valid and can be used to access the system. The token is, however, invalidated/updated when the user logs in again. This still leaves a window of opportunity for an attacker to use the token to access the system.

### How to perform an attack against the unsecure system yourself

Log in as any user. Copy the value for the `token` key from your browser's session storage. Now log out by clicking "I wanna get out" button on dashboard. Open a new tab in your browser and visit the `/user` page (still logged out). Open developer tools and create an entry into the session storage for `token` with the copied value. Refresh the page. You are now logged in as the user you copied the token from.

**How to access session storage?** Open developer tools with F12. If using _Chrome_, open tab "Application" and below subheader "Storage", click "Session storage". If using _Firefox_, open tab "Storage" and click "Session Storage". The route is similar with other web browsers as well.
