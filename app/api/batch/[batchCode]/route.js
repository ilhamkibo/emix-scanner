import { NextResponse, NextRequest } from "next/server";

export async function GET(req, { params }) {
  try {
    const { batchCode, packIndex } = await params; // Extract batchCode from the dynamic route
    console.log("🚀 ~ GET ~ batchCode:", batchCode, packIndex);

    const response = await fetch(`${process.env.API_URL}/batch/${batchCode}`);

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
