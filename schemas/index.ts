import { z } from "zod";

export const userSchema = z.object({
	username: z
		.string()
		.min(3, {
			message: "Username must be at least 3 characters long",
		})
		.max(50, {
			message: "Username must be at most 50 characters long",
		}),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters long",
		})
		.max(50, {
			message: "Password must be at most 50 characters long",
		}),
});

export const todoSchema = z.object({
	title: z
		.string()
		.min(3, {
			message: "Title must be at least 3 characters long",
		})
		.max(50, {
			message: "Title must be at most 50 characters long",
		}),
	description: z.optional(
		z
			.string()
			.min(1, {
				message: "Description must be at least 1 character long",
			})
			.max(500, {
				message: "Description must be at most 500 characters long",
			})
	),
});
