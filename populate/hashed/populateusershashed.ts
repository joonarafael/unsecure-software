import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

async function updateUserHashed(username: string, password: string) {
	const existing = await db.user.findFirst({
		where: {
			username: username,
		},
	});

	const hashedPassword = await bcrypt.hash(password, 10);

	if (existing) {
		await db.user.update({
			data: {
				password: hashedPassword,
			},
			where: {
				id: existing.id,
			},
		});
	} else {
		const create = await db.user.create({
			data: {
				username: username,
				password: hashedPassword,
			},
		});

		return create.id;
	}
}

export default async function populateUsersHashed() {
	let ids: string[] = [];

	const aliceId = await updateUserHashed("alice", "redqueen");

	if (aliceId) {
		ids.push(aliceId);
	}

	const bobId = await updateUserHashed("bob", "squarepants");

	if (bobId) {
		ids.push(bobId);
	}

	const patrickId = await updateUserHashed("patrick", "asteroid");

	if (patrickId) {
		ids.push(patrickId);
	}

	return ids;
}
