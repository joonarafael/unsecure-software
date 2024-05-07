"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Container from "@/components/container";
import CreateTodoForm from "@/components/todos/createtodoform";
import DeleteButton from "@/components/todos/delete";
import MarkAsDoneButton from "@/components/todos/markasdone";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types";

const TodosPage = () => {
	const [todos, setTodos] = useState<Todo[] | null>(null);

	useEffect(() => {
		const jwtToken = sessionStorage.getItem("token");

		if (jwtToken) {
			const values = {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			};

			axios
				.post("/api/todos/get", values)
				.then((res) => {
					setTodos(res.data.todos);
				})
				.catch((error) => {});
		}
	}, []);

	return (
		<Container>
			<div className="flex flex-col gap-8 p-12 w-[600px]">
				<p className="font-light">
					<em>here are your</em>
				</p>
				<h1 className="text-3xl font-extrabold">TODOS</h1>
				<div className="flex flex-col text-left gap-2">
					{todos?.map((todo, i) => (
						<div key={i} className="border rounded-md p-2 gap-1 flex flex-col">
							<div className="flex flex-row justify-between items-center">
								<div>
									<h3
										className={`font-bold ${todo.done && "text-emerald-500"}`}
									>
										{todo.title}
									</h3>
									<p className="font-light">{todo.description}</p>
								</div>
								<div className="font-extrabold text-lg text-emerald-800">
									{todo?.done && "D"}
								</div>
							</div>
							<div className="flex flex-row gap-1">
								{!todo.done && <MarkAsDoneButton todoId={todo.id} />}
								<DeleteButton todoId={todo.id} />
							</div>
						</div>
					))}
				</div>
				<CreateTodoForm />
				<div className="flex gap-2 p-4 flex-col w-full">
					<a href="/dashboard" target="_self">
						<Button variant="outline" className="flex w-full" size="lg">
							Back to dashboard
						</Button>
					</a>
				</div>
			</div>
		</Container>
	);
};

export default TodosPage;
