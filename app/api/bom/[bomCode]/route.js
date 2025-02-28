import { NextResponse, NextRequest } from "next/server";

export async function GET(req, { params }) {
  try {
    const { bomCode } = await params; // Extract bomCode from the dynamic route

    const response = await fetch(`${process.env.API_URL}/bom/${bomCode}`);

    if (!response.ok) {
      return NextResponse.json({
        status: response.status,
        error: "Bom not found",
      });
    }
    const data = await response.json();

    return NextResponse.json({
      status: response.status,
      message: "Bom successfully fetched",
      data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
