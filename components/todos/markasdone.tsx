"use client";

import axios from "axios";
import { useTransition } from "react";

import { Button } from "../ui/button";

interface MarkAsDoneButtonProps {
	todoId: string;
}

const MarkAsDoneButton = ({ todoId }: MarkAsDoneButtonProps) => {
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
				.post("/api/todos/markasdone", values)
				.then((res) => {
					window.location.reload();
				})
				.catch((error) => {
					console.log(error);
				});
		});
	};

	return (
		<Button onClick={onClick} disabled={isPending}>
			Mark as done
		</Button>
	);
};

export default MarkAsDoneButton;
