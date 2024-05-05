// DASHBOARD PAGE SERVER SIDE

import ClientOnly from "@/components/clientonly";

import DashboardClient from "./dashboardclient";

const DashboardPage = () => {
	return (
		<ClientOnly>
			<DashboardClient />
		</ClientOnly>
	);
};

export default DashboardPage;
