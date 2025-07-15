import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input") || "";

  if (!input) return NextResponse.json([]);

  try {
    const res = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      },
    });

    return NextResponse.json(res.data.predictions);
  } catch (e) {
    console.error(e);
    return NextResponse.json([]);
  }
}
