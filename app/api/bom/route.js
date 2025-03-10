import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
  try {
    const response = await fetch(`${process.env.API_URL}/bom`);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        status: response.status,
        error: "Bom not found",
      });
    }

    return NextResponse.json({ status: 200, message: "Bom List", data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
