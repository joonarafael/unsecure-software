"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";

// HOME PAGE CLIENT SIDE

interface HomeClientProps {
	currentTime?: string;
}

const HomeClient = ({ currentTime }: HomeClientProps) => {
	let safeTime = "N/A";

	if (currentTime) {
		try {
			safeTime = currentTime.split('"')[3];
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Container>
			<div className="flex flex-col gap-8 p-12">
				<p>GMT {safeTime}</p>
				<p className="font-light">
					<em>the unsecure</em>
				</p>
				<h1 className="text-3xl font-extrabold">TODO APP</h1>
				<div className="flex flex-col gap-2 border rounded-lg p-4">
					<pre>&lt;Cyber Security Base 2024&gt;</pre>
					<p className="text-neutral-500 text-sm">University of Helsinki</p>
					<p className="font-bold">Project I - Joona Kettunen</p>
				</div>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<p>
						TODO web application built <em>initially intentionally</em> unsafe.
					</p>
					<span className="flex flex-wrap gap-1">
						<a
							className="bg-slate-300 hover:underline"
							href="https://github.com/joonarafael/unsecure-software/tree/main/docs"
							target="_blank"
						>
							Check the documentation
						</a>
						<p>to learn about the issues and how to fix them.</p>
					</span>
				</div>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<h3 className="text-lg font-bold">Log in to your account</h3>
					<p className="text-neutral-500 text-sm">
						<em>(both standard and admin users)</em>
					</p>
					<a href="/auth/login" className="flex w-full">
						<Button className="flex w-full" size="lg">
							Log in
						</Button>
					</a>
				</div>
			</div>
		</Container>
	);
};

export default HomeClient;
