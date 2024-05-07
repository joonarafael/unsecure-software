"use client";

import axios from "axios";
import { useTransition } from "react";

import { Button } from "../ui/button";

interface DeleteButtonProps {
	todoId: string;
}

const DeleteButton = ({ todoId }: DeleteButtonProps) => {
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		const jwtToken = sessionStorage.getItem("token");

		const values = {
			todoId: todoId,
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
		};

		startTransition(() => {
			axios
				.post("/api/todos/delete", values)
				.then((res) => {
					window.location.reload();
				})
				.catch((error) => {
					console.log(error);
				});
		});
	};

	return (
		<Button variant="destructive" onClick={onClick} disabled={isPending}>
			Delete
		</Button>
	);
};

export default DeleteButton;
