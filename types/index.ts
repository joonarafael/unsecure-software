export type User = {
	id: string;
	username: string;
	password?: string | null;
	createdAt: Date;
	updatedAt?: Date | null;
	role: string;
};

export type Todo = {
	title: string;
	description?: string;
};
