export type User = {
	id: string;
	username: string;
	password?: string | null;
	createdAt: Date;
	updatedAt?: Date | null;
};

export type Todo = {
	id: string;
	title: string;
	description?: string;
	done?: boolean | null;
};
