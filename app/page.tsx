// HOME PAGE SERVER SIDE

import ClientOnly from "@/components/clientonly";
import { db } from "@/lib/db";

import HomeClient from "./homeclient";

const HomePage = async () => {
	// let's query the current time from the database as a demonstration of server-side logic
	const currentTime = await db.$queryRaw`SELECT NOW()`;

	return (
		<ClientOnly>
			<HomeClient currentTime={JSON.stringify(currentTime)} />
		</ClientOnly>
	);
};

export default HomePage;
