// LOGIN PAGE SERVER SIDE

import ClientOnly from "@/components/clientonly";

import LogInClient from "./loginclient";

const LoginPage = async () => {
	return (
		<ClientOnly>
			<LogInClient />
		</ClientOnly>
	);
};

export default LoginPage;
