"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { userSchema } from "@/schemas";

const { sign } = jsonwebtoken;

export async function POST(request: Request) {
	try {
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
					message: `No user named ${username} found.`,
				},
				{
					status: 400,
				}
			);
		}

		// comment / uncomment code below to switch between hashed and plaintext password comparison
		const validPassword = existingUser.password === password;
		// const validPassword = await bcrypt.compare(password, existingUser.password);

		if (!validPassword) {
			return NextResponse.json(
				{
					message: `Password was not correct for user ${username}.`,
				},
				{
					status: 400,
				}
			);
		}

		const accessToken = crypto.randomBytes(64).toString("hex");

		await db.user.update({
			where: {
				id: existingUser.id,
			},
			data: {
				accessToken: accessToken,
			},
		});

		const jwtToken = sign(
			{
				id: existingUser.id,
				username: existingUser.username,
				accessToken: accessToken,
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
	} catch (error) {
		return NextResponse.json(
			{
				message: error,
			},
			{
				status: 400,
			}
		);
	}
}
