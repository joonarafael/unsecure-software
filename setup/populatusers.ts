import { db } from "@/lib/db";

export default async function populateUsers() {
	const alice = await db.user.create({
		data: {
			username: "alice",
			password: "redqueen",
		},
	});

	const bob = await db.user.create({
		data: {
			username: "bob",
			password: "squarepants",
		},
	});

	const patrick = await db.user.create({
		data: {
			username: "patrick",
			password: "asteroid",
		},
	});

	return [alice.id, bob.id, patrick.id];
}
