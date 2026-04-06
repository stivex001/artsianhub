import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract the real client IP — Vercel sets x-forwarded-for on prod
  const forwarded = request.headers.get("x-forwarded-for");
  const clientIp = forwarded ? forwarded.split(",")[0].trim() : null;

  // Pass the client IP to ip-api so it geolocates the user, not Vercel's server
  const url = clientIp
    ? `http://ip-api.com/json/${clientIp}?fields=status,city,country`
    : "http://ip-api.com/json?fields=status,city,country";

  try {
    const res = await fetch(url, {
      next: { revalidate: 0 }, // never cache — each visitor has a different IP
    });
    const data = await res.json();

    if (data.status === "success" && data.city && data.country) {
      return NextResponse.json({ city: data.city, country: data.country });
    }

    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Failed to detect location" }, { status: 500 });
  }
}
