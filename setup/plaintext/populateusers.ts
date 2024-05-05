import { db } from "@/lib/db";

async function updateUser(username: string, password: string, admin?: boolean) {
	const existing = await db.user.findFirst({
		where: {
			username: username,
		},
	});

	if (existing) {
		await db.user.update({
			data: {
				password: password,
			},
			where: {
				id: existing.id,
			},
		});
	} else {
		const create = await db.user.create({
			data: {
				username: username,
				password: password,
			},
		});

		if (admin) {
			await db.user.update({
				data: {
					role: "ADMIN",
				},
				where: {
					id: create.id,
				},
			});
		}

		return create.id;
	}
}

export default async function populateUsers() {
	let ids: string[] = [];

	const aliceId = await updateUser("alice", "redqueen", true);

	if (aliceId) {
		ids.push(aliceId);
	}

	const bobId = await updateUser("bob", "squarepants");

	if (bobId) {
		ids.push(bobId);
	}

	const patrickId = await updateUser("patrick", "asteroid");

	if (patrickId) {
		ids.push(patrickId);
	}

	return ids;
}
