// HOME PAGE SERVER SIDE

import ClientOnly from "@/components/clientonly";
import { db } from "@/lib/db";

import HomeClient from "./homeclient";

const HomePage = async () => {
	// let's query the current time from the database as a demonstration of server-side logic
	let safeTime = "N/A";

	try {
		safeTime = await db.$queryRaw`SELECT NOW()`;
	} catch (error) {
		console.log(error);
	}

	return (
		<ClientOnly>
			<HomeClient currentTime={JSON.stringify(safeTime)} />
		</ClientOnly>
	);
};

export default HomePage;
