"use server";

import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { userId, headers } = body;

		console.log(userId);

		const user = await db.user.findFirst({
			where: {
				id: userId,
			},
		});

		console.log(user);

		if (user) {
			return NextResponse.json(
				{
					user: user,
				},
				{
					status: 200,
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
