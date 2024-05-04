"use server";

import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { userSchema } from "@/schemas";

const { sign, decode, verify } = jsonwebtoken;

export async function POST(request: Request) {
	const body = await request.json();
	const { username, password } = userSchema.parse(body);

	if (!username || !password) {
		return NextResponse.json(
			{
				message: "Invalid arguments.",
			},
			{
				status: 400,
			}
		);
	}

	const existingUser = await db.user.findFirst({
		where: {
			username,
		},
	});

	if (!existingUser) {
		return NextResponse.json(
			{
				message: `No user found with username ${username}.`,
			},
			{
				status: 400,
			}
		);
	}

	const validPassword = existingUser.password === password;

	if (!validPassword) {
		return NextResponse.json(
			{
				message: `Invalid username or password.`,
			},
			{
				status: 400,
			}
		);
	}

	const jwtToken = sign(
		{
			id: existingUser.id,
			username: existingUser.username,
		},
		process.env.JWT_SECRET ?? "typescript-wonders"
	);

	return NextResponse.json(
		{
			message: "Login successful.",
			token: jwtToken,
		},
		{
			status: 200,
		}
	);
}
