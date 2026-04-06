import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://ip-api.com/json?fields=status,city,country", {
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
