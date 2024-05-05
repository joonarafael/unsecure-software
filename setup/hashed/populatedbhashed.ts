import populateTodos from "../common/populatetodos";
import populateUsersHashed from "./populateusershashed";

export async function populateDBHashed() {
	const ids = await populateUsersHashed();

	if (ids.length > 0) {
		await populateTodos(ids);
	}

	console.log("Database populated/updated with hashed password entries.");
}
