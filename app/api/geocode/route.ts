import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          // Nominatim requires a descriptive User-Agent
          "User-Agent": "ArtisansHub/1.0 (https://artisanshub.org)",
        },
        next: { revalidate: 86400 }, // cache for 24h — same coords return the same city
      }
    );

    const data = await res.json();
    const address = data?.address;

    if (!address) {
      return NextResponse.json({ error: "No address found" }, { status: 404 });
    }

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.county ||
      null;
    const country = address.country || null;

    if (!city || !country) {
      return NextResponse.json({ error: "City or country not found" }, { status: 404 });
    }

    return NextResponse.json({ city, country });
  } catch {
    return NextResponse.json({ error: "Reverse geocoding failed" }, { status: 500 });
  }
}
