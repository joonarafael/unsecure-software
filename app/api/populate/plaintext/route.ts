"use server";

import { NextResponse } from "next/server";

import { populateDB } from "@/setup/plaintext/populatedb";

export async function POST(request: Request) {
	try {
		await populateDB();

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
