import { db } from "@/lib/db";

import TODOS from "./todos";

export default async function populateTodos(userIds: string[]) {
	for (const entry of TODOS) {
		await db.todo.create({
			data: {
				...entry,
				done: false,
				userId: userIds[Math.floor(Math.random() * userIds.length)],
			},
		});
	}
}
