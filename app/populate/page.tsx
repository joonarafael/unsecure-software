"use client";

import axios from "axios";
import { useState, useTransition } from "react";

import Container from "@/components/container";
import FormError from "@/components/formerror";
import FormSuccess from "@/components/formsuccess";
import { Button } from "@/components/ui/button";

const PopulateClient = () => {
	const [pending, startTransition] = useTransition();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [position, setPosition] = useState<string>("");

	const clearDatabase = () => {
		setPosition("clear");
		setError("");
		setSuccess("");

		startTransition(() => {
			axios
				.post("/api/populate/clear")
				.then(() => {
					setSuccess("Database cleared!");
				})
				.catch((error) => {
					console.log(error);
					setError(
						JSON.stringify(error?.response?.data?.message).replaceAll('"', "")
					);
				});
		});
	};

	const addPlaintext = () => {
		setPosition("plaintext");
		setError("");
		setSuccess("");

		startTransition(() => {
			axios
				.post("/api/populate/plaintext")
				.then(() => {
					setSuccess("Database entries added or modified!");
				})
				.catch((error) => {
					console.log(error);
					setError(
						JSON.stringify(error?.response?.data?.message).replaceAll('"', "")
					);
				});
		});
	};

	const addHashed = () => {
		setPosition("hashed");
		setError("");
		setSuccess("");

		startTransition(() => {
			axios
				.post("/api/populate/hashed")
				.then(() => {
					setSuccess("Database entries added or modified!");
				})
				.catch((error) => {
					console.log(error);
					setError(
						JSON.stringify(error?.response?.data?.message).replaceAll('"', "")
					);
				});
		});
	};

	return (
		<Container>
			<div className="flex flex-col gap-8 p-12 w-[600px]">
				<p className="font-light">
					<em>this is the panel to control</em>
				</p>
				<h1 className="text-3xl font-extrabold">THE DATABASE</h1>
				<p className="font-light">
					this is not part of the actual application, but merely a tool to
					populate the database
				</p>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<h3 className="text-lg font-bold">
						You messed up? My logic messed up?
					</h3>
					<p className="text-neutral-500 text-sm">
						<em>(clear every single entry)</em>
					</p>
					<Button
						onClick={() => {
							clearDatabase();
						}}
						disabled={pending}
						variant="destructive"
						className="flex w-full"
						size="lg"
					>
						Clear database
					</Button>
					{error && position === "clear" && <FormError text={error} />}
					{success && position === "clear" && <FormSuccess text={success} />}
				</div>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<h3 className="text-lg font-bold">
						Add or convert to plaintext password entries
					</h3>
					<p className="text-neutral-500 text-sm">
						<em>(entries will be either added or existing ones modified)</em>
					</p>
					<Button
						onClick={() => {
							addPlaintext();
						}}
						disabled={pending}
						className="flex w-full"
						size="lg"
					>
						Populate with plaintext passwords (the unsafe option)
					</Button>
					<p className="font-bold">Start with this!</p>
					{error && position === "plaintext" && <FormError text={error} />}
					{success && position === "plaintext" && (
						<FormSuccess text={success} />
					)}
				</div>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<h3 className="text-lg font-bold">
						Add or convert to hashed passwords entries
					</h3>
					<p className="text-neutral-500 text-sm">
						<em>(entries will be either added or existing ones modified)</em>
					</p>
					<Button
						onClick={() => {
							addHashed();
						}}
						disabled={pending}
						className="flex w-full"
						size="lg"
					>
						Populate with hashed passwords (the safe option)
					</Button>
					{error && position === "hashed" && <FormError text={error} />}
					{success && position === "hashed" && <FormSuccess text={success} />}
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">
						Have you read the documentation?
					</h3>
					<p>
						You need to ensure the backend logic is on pair with the chosen
						password storing method.
					</p>
				</div>
				<a href="/" className="flex w-full">
					<Button variant="outline" className="flex w-full" size="lg">
						Back
					</Button>
				</a>
			</div>
		</Container>
	);
};

export default PopulateClient;
