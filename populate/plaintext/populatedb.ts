import populateTodos from "../common/populatetodos";
import populateUsers from "./populateusers";

export async function populateDB() {
	const ids = await populateUsers();

	if (ids.length > 0) {
		await populateTodos(ids);
	}

	console.log("Database populated/updated with plaintext entries.");
}
