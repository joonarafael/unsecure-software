// USER PAGE SERVER SIDE

import ClientOnly from "@/components/clientonly";
import { db } from "@/lib/db";

import UserClient from "./userclient";

interface IParams {
	userId?: string;
}

const UserPage = async ({ params }: { params: IParams }) => {
	const { userId } = params;

	const user = await db.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return (
			<ClientOnly>
				<div className="flex flex-col gap-4 p-4 justify-center text-center items-center">
					<h1 className="font-bold text-xl">No user found</h1>
					<p>Is the provided URL correct?</p>
				</div>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<UserClient user={user} />
		</ClientOnly>
	);
};

export default UserPage;
