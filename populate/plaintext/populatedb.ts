import populateTodos from "../common/populatetodos";
import populateUsers from "./populateusers";

export async function populateDB() {
	const ids = await populateUsers();

	if (ids.length > 0) {
		console.log("populating todos...");
		await populateTodos(ids);
	}

	console.log("Database populated/updated with plaintext entries.");
}
