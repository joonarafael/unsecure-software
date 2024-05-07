"use server";

import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { populateDB } from "@/populate/plaintext/populatedb";

export async function POST(request: Request) {
	try {
		await populateDB();

		const todos = await db.todo.findMany();

		console.log(todos);

		return NextResponse.json(
			{
				message: "Plaintext entries added or updated.",
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
