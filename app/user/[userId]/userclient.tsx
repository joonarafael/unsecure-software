"use client";

// USER PAGE CLIENT SIDE

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

interface UserClientProps {
	user: User;
}

const UserClient = ({ user }: UserClientProps) => {
	return (
		<Container>
			<div className="flex flex-col gap-8 p-12 w-[600px]">
				<p className="font-light">
					<em>here are your account details</em>
				</p>
				<h1 className="text-3xl font-extrabold">{user.username}</h1>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<div className="flex w-full justify-between flex-row">
						<p className="text-neutral-500">id</p>
						<p>{user.id}</p>
					</div>
					<div className="flex w-full justify-between flex-row">
						<p className="text-neutral-500">username</p>
						<p>{user.username}</p>
					</div>
					<div className="flex w-full justify-between flex-row">
						<p className="text-neutral-500">password</p>
						<p>{user.password}</p>
					</div>
					<div className="flex w-full justify-between flex-row">
						<p className="text-neutral-500">role</p>
						<p>{user.role}</p>
					</div>
					<div className="flex w-full justify-between flex-row">
						<p className="text-neutral-500">created at</p>
						<p>{user.createdAt.toISOString()}</p>
					</div>
					<div className="flex w-full justify-between flex-row">
						<p className="text-neutral-500">updated at</p>
						<p>{user?.updatedAt?.toISOString()}</p>
					</div>
				</div>
				<a href="/dashboard" className="flex w-full">
					<Button variant="outline" className="flex w-full" size="lg">
						Back to dashboard
					</Button>
				</a>
			</div>
		</Container>
	);
};

export default UserClient;
