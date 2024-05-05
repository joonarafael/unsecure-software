"use client";

// LOGIN PAGE CLIENT SIDE

import axios from "axios";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Container from "@/components/container";
import FormError from "@/components/formerror";
import FormSuccess from "@/components/formsuccess";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const LogInClient = () => {
	const [isPending, startTransition] = useTransition();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof userSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			axios
				.post("/api/auth/login", values)
				.then((res) => {
					sessionStorage.setItem("token", res.data.token);
					setSuccess("Log in successful!");
					window.open("/dashboard", "_self");
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
					<em>the unsecure</em>
				</p>
				<h1 className="text-3xl font-extrabold">TODO APP LOGIN</h1>
				<div className="flex gap-2 p-4 flex-col border rounded-lg">
					<p>Log in to your account.</p>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-4"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="user123" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="*****" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{error && <FormError text={error} />}
							{success && <FormSuccess text={success} />}
							<Button type="submit" disabled={isPending}>
								Log in
							</Button>
						</form>
					</Form>
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

export default LogInClient;
