import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
  try {
    const response = await fetch(`${process.env.API_URL}/pack`);
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

export async function POST(req) {
  try {
    const dataBody = await req.json();

    const response = await fetch(`${process.env.API_URL}/pack`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    });

    // Forward the response if it's not successful
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { status: response.status, error: errorData.error || "Unknown error" },
        { status: response.status }
      );
    }

    const dataRes = await response.json();
    return NextResponse.json({
      status: 200,
      message: dataRes.message,
      data: dataRes.data,
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
