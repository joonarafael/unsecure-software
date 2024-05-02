// server side of home page

import ClientOnly from "@/components/clientonly";

import HomeClient from "./homeclient";

// no business logic, wrap everything inside ClientOnly to avoid any hydration errors
// hydration error is when the client side and server side renderings are different

const HomePage = async () => {
	return (
		<ClientOnly>
			<HomeClient />
		</ClientOnly>
	);
};

export default HomePage;
