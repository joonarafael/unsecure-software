"use server";

import { NextResponse } from "next/server";

import { populateDBHashed } from "@/populate/hashed/populatedbhashed";

export async function POST(request: Request) {
	try {
		await populateDBHashed();

		return NextResponse.json(
			{
				message: "Hashed password entries added or updated.",
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
