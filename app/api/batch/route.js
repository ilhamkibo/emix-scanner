import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const batchCode = searchParams.get("batchCode");

    // const searchParamss = req.nextUrl.searchParams;
    // const query = searchParamss.get("batchCode");
    // console.log("🚀 ~ GET ~ query:", query);

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
