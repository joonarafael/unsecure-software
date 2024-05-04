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
