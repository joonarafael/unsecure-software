import { db } from "@/lib/db";

import TODOS from "./todos";

export default async function populateTodos(userIds: string[]) {
	for (const entry of TODOS) {
		const todo = await db.todo.create({
			data: {
				...entry,
			},
		});

		await db.user.update({
			data: {
				todos: {
					connect: [{ id: todo.id }],
				},
			},
			where: {
				id: userIds[Math.floor(Math.random() * userIds.length)],
			},
		});
	}
}
