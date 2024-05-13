"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

const UserClient = () => {
	const searchParams = useSearchParams();
	const userId = searchParams.get("id");

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (userId) {
			const jwtToken = sessionStorage.getItem("token");

			if (jwtToken) {
				const values = {
					userId: userId,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				};

				axios
					.post("/api/getuser", values)
					.then((res) => {
						setUser(res.data.user[0]);
					})
					.catch((error) => {});
			}
		}
	}, [userId]);

	if (!user) {
		return (
			<Container>
				<div className="flex flex-col gap-8 p-12 w-[600px]">
					<p className="font-light">
						<em>no user was fetched</em>
					</p>
					<h1 className="text-3xl font-extrabold">Is the URL correct?</h1>
					<div className="flex gap-2 p-4 flex-col border rounded-lg"></div>
					<a href="/dashboard" className="flex w-full">
						<Button variant="outline" className="flex w-full" size="lg">
							Back to dashboard
						</Button>
					</a>
				</div>
			</Container>
		);
	}

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
						<p className="text-neutral-500">created at</p>
						<p>{JSON.stringify(user.createdAt)}</p>
					</div>
					<div className="flex w-full justify-between flex-row">
						<p className="text-neutral-500">updated at</p>
						<p>{JSON.stringify(user.updatedAt)}</p>
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
