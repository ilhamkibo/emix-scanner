import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
  try {
    return NextResponse.json({ status: 200, message: "Websocket API" });
  } catch (error) {}
}
