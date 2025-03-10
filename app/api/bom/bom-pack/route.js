import { NextResponse, NextRequest } from "next/server";
export async function POST(req) {
  try {
    const dataBody = await req.json();
    console.log("🚀 ~ POST ~ dataBody:", dataBody);

    const response = await fetch(`${process.env.API_URL}/bom/bom-pack`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    });

    // Ambil data JSON dari respons API eksternal
    const dataRes = await response.json();
    console.log("🚀 ~ POST ~ dataRes:", dataRes);

    // Gunakan status HTTP dari API eksternal
    return NextResponse.json(
      {
        status: response.status, // Status HTTP dari API eksternal
        message: dataRes.message,
        success: dataRes.success,
        failed: dataRes.failed,
      },
      { status: response.status } // Tetapkan status HTTP yang benar
    );
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
