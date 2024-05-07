"use client";

import axios from "axios";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { todoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateTodoForm = () => {
	const [isPending, startTransition] = useTransition();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof todoSchema>>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const onSubmit = (values: z.infer<typeof todoSchema>) => {
		setError("");
		setSuccess("");

		const jwtToken = sessionStorage.getItem("token");

		const dataToAPI = {
			todo: {
				title: values.title,
				description: values.description,
			},
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
		};

		startTransition(() => {
			axios
				.post("/api/todos/create", dataToAPI)
				.then((res) => {
					setSuccess("Todo created!");
					window.location.reload();
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
		<div className="flex flex-col border rounded-md p-4">
			<h3>Add a new todo:</h3>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 text-left"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Todo Title</FormLabel>
								<FormControl>
									<Input placeholder="Short concise title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Todo Description</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="In more detail I mean that..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{error && <FormError text={error} />}
					{success && <FormSuccess text={success} />}
					<Button type="submit" disabled={isPending}>
						Create
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateTodoForm;
