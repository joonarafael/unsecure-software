import ClientOnly from "@/components/clientonly";

import PopulateClient from "./populateclient";

const PopulatePage = async () => {
	return (
		<ClientOnly>
			<PopulateClient />
		</ClientOnly>
	);
};

export default PopulatePage;
