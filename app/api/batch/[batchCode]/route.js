import { NextResponse, NextRequest } from "next/server";

export async function GET(req, { params }) {
  try {
    const { batchCode, packIndex } = await params; // Extract batchCode from the dynamic route

    const response = await fetch(`${process.env.API_URL}/batch/${batchCode}`);

    if (!response.ok) {
      return NextResponse.json({
        status: response.status,
        error: "Batch not found",
      });
    }
    const data = await response.json();

    return NextResponse.json({ status: 200, message: "Batch API", data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
