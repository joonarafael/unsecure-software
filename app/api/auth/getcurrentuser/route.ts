"use server";

import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const { verify } = jsonwebtoken;

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { headers } = body;

		const bearer = headers.Authorization.split(" ")[1];

		const jwtToken = await verify(
			bearer,
			process.env.JWT_SECRET ?? "typescript-wonders"
		);

		if (typeof jwtToken === "object" && jwtToken.id && jwtToken.username) {
			if (jwtToken.accessToken === "null") {
				return NextResponse.json(
					{
						user: "Invalid token.",
					},
					{
						status: 401,
					}
				);
			}

			const verifiedUser = await db.user.findFirst({
				where: {
					id: jwtToken.id,
					username: jwtToken.username,
					accessToken: jwtToken.accessToken,
				},
				select: {
					username: true,
					id: true,
					createdAt: true,
				},
			});

			if (verifiedUser) {
				return NextResponse.json(
					{
						user: verifiedUser,
					},
					{
						status: 200,
					}
				);
			}

			return NextResponse.json(
				{
					user: "Invalid token.",
				},
				{
					status: 401,
				}
			);
		}

		return NextResponse.json(
			{
				message: "User fetching unsuccessful.",
			},
			{
				status: 400,
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
