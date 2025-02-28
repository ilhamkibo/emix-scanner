import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
  try {
    const response = await fetch(`${process.env.API_URL}/bom`);
    const data = await response.json();

    return NextResponse.json({ status: 200, message: "Pack API", data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
