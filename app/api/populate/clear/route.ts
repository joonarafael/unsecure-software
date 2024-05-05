"use server";

import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(request: Request) {
	try {
		await db.user.deleteMany({});
		await db.todo.deleteMany({});

		return NextResponse.json(
			{
				message: "Database cleared of all entries.",
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
