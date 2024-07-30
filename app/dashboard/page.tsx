"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

const DashboardClient = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const jwtToken = sessionStorage.getItem("token");

		if (jwtToken) {
			const values = {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			};

			axios
				.post("/api/auth/getcurrentuser", values)
				.then((res) => {
					setUser(res.data.user);
				})
				.catch((error) => {});
		}
	}, []);

	const logOut = async () => {
		const jwtToken = sessionStorage.getItem("token");

		if (jwtToken) {
			const values = {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			};

			await axios
				.post("/api/auth/logout", values)
				.then((res) => {})
				.catch((error) => {});
		}

		sessionStorage.removeItem("token");
		window.open("/", "_self");
	};

	if (!user) {
		return (
			<Container>
				<div className="flex flex-col gap-8 p-12 w-[600px]">
					<p className="font-light">
						<em>here would be your</em>
					</p>
					<h1 className="text-3xl font-extrabold">TODO APP DASHBOARD</h1>
					<p className="text-xl">but no user seems to be logged in</p>
					<div className="flex gap-2 p-4 flex-col">
						<h3 className="text-lg font-bold">Proceed to log in</h3>
						<a href="/auth/login" target="_self">
							<Button variant="outline" className="flex w-full" size="lg">
								Open log in
							</Button>
						</a>
					</div>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<div className="flex flex-col gap-8 p-12 w-[600px]">
				<p className="font-light">
					<em>welcome back to your unsecure</em>
				</p>
				<h1 className="text-3xl font-extrabold">TODO APP DASHBOARD</h1>
				<p className="text-xl">{user?.username}</p>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<h3 className="text-lg font-bold">Check your todos</h3>
					<p className="text-neutral-500 text-sm">
						<em>(create, modify, or delete your todos)</em>
					</p>
					<a href="/todos" className="flex w-full">
						<Button className="flex w-full" size="lg">
							Let&apos;s check them
						</Button>
					</a>
				</div>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<h3 className="text-lg font-bold">See your account information</h3>
					{/**
					While fixing issues 1 and 3, please replace the anchor tag on line 99 with this one to get redirected to the user page:
					<a href="/user" className="flex w-full"> 
					*/}
					<a href={`/user?id=${user?.id}`} className="flex w-full">
						<Button className="flex w-full" size="lg">
							I&apos;m interested
						</Button>
					</a>
				</div>
				<div className="flex gap-2 p-4 flex-col">
					<h3 className="text-lg font-bold">Log out</h3>
					<Button
						onClick={() => {
							logOut();
						}}
						variant="outline"
						className="flex w-full"
						size="lg"
					>
						I wanna get out
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default DashboardClient;
