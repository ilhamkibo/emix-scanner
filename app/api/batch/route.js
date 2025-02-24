import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
  try {
    // Ambil data dari body request
    const body = await req.json();
    const { batchCode, packIndex } = body;

    // Validasi input
    if (!batchCode) {
      return NextResponse.json(
        { status: 400, message: "Bad Request: batchCode is required" },
        { status: 400 }
      );
    }

    console.log(`${process.env.API_URL}/pack/generate/${batchCode}`);

    // Buat permintaan ke API eksternal
    const res = await fetch(
      `${process.env.API_URL}/pack/generate/${batchCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packIndex: packIndex }),
      }
    );

    // Periksa apakah respons sukses
    if (!res.ok) {
      console.error(`Error from external API: ${res.statusText}`);
      return NextResponse.json(
        { status: res.status, message: res.statusText },
        { status: res.status }
      );
    }

    // Ambil data dari respons eksternal jika diperlukan
    const data = await res.json();

    return NextResponse.json({
      status: 200,
      message: "Batch API",
      data, // Kirim data dari API eksternal ke klien
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const batchCode = searchParams.get("batchCode");
    console.log("🚀 ~ GET ~ batchCode:", batchCode);

    const response = await fetch(`${process.env.API_URL}/pack/${batchCode}`);

    const data = await response.json();

    return NextResponse.json({ status: 200, message: "Batch API", data });
  } catch (error) {}
}
