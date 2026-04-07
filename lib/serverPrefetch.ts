/**
 * Server-side prefetch utilities for Next.js App Router pages.
 * All functions are safe to import in server components.
 */
import { QueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import { normalizeCountry } from "@/utils/normalizeCountry";

// ---------------------------------------------------------------------------
// QueryClient factory
// ---------------------------------------------------------------------------

/** Create a fresh per-request QueryClient for server-side prefetching. */
export function createServerQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 min — prevents immediate refetch on hydration
        retry: false,          // fail fast on server; client will retry
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Location detection
// ---------------------------------------------------------------------------

export interface LocationResult {
  city: string;
  country: string;
}

/**
 * Resolves the user's city + country from their IP address.
 * Returns null on any failure — callers must handle the no-location case.
 */
export async function detectLocationFromIp(
  ip: string | null
): Promise<LocationResult | null> {
  try {
    const url = ip
      ? `http://ip-api.com/json/${ip}?fields=status,city,country`
      : `http://ip-api.com/json?fields=status,city,country`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const data = await res.json();
    if (data.status === "success" && data.city && data.country) {
      return { city: data.city, country: normalizeCountry(data.country) };
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Individual data fetchers (raw fetch — no auth needed for public endpoints)
// ---------------------------------------------------------------------------

async function fetchCategories(): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    next: { revalidate: 300 }, // cache 5 min across requests
  });
  if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
  return res.json();
}

async function fetchSubCategories(categoryId: string): Promise<any> {
  const res = await fetch(
    `${BASE_URL}/sub-categories/by-category?categoryId=${encodeURIComponent(categoryId)}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error(`SubCategories fetch failed: ${res.status}`);
  return res.json();
}

async function fetchAllSubCategories(): Promise<any> {
  const res = await fetch(`${BASE_URL}/sub-categories`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`AllSubCategories fetch failed: ${res.status}`);
  return res.json();
}

async function fetchArtisans(country: string, q?: string): Promise<any> {
  const params = new URLSearchParams({ country });
  if (q) params.set("q", q);
  const res = await fetch(`${BASE_URL}/artisans/search?${params.toString()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Artisans fetch failed: ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Prefetch helpers (each swallows its own error → graceful degradation)
// ---------------------------------------------------------------------------

/**
 * Prefetch categories and return the result so callers can derive categoryId
 * by name without an extra network round-trip.
 */
export async function prefetchCategories(
  queryClient: QueryClient
): Promise<any[]> {
  try {
    return await queryClient.fetchQuery({
      queryKey: ["categories"],
      queryFn: fetchCategories,
    });
  } catch {
    return [];
  }
}

export async function prefetchAllSubCategories(
  queryClient: QueryClient
): Promise<void> {
  try {
    await queryClient.prefetchQuery({
      queryKey: ["sub-categories"],
      queryFn: fetchAllSubCategories,
    });
  } catch {
    // client will re-fetch
  }
}

export async function prefetchSubCategories(
  queryClient: QueryClient,
  categoryId: string
): Promise<void> {
  try {
    await queryClient.prefetchQuery({
      queryKey: ["sub-categories", categoryId],
      queryFn: () => fetchSubCategories(categoryId),
    });
  } catch {
    // client will re-fetch
  }
}

/**
 * Prefetch artisans for a given country (and optional search query).
 *
 * Query key format mirrors useArtisansNearMe exactly:
 *   ["filtered_artisans", { country, q? }]
 * undefined properties are dropped by JSON.stringify so keys align
 * with the client-side hook regardless of extra undefined fields.
 */
export async function prefetchArtisans(
  queryClient: QueryClient,
  country: string,
  q?: string
): Promise<void> {
  const key: any[] = q
    ? ["filtered_artisans", { country, q }]
    : ["filtered_artisans", { country }];
  try {
    await queryClient.prefetchQuery({
      queryKey: key,
      queryFn: () => fetchArtisans(country, q),
    });
  } catch {
    // client will re-fetch
  }
}

/**
 * Full prefetch bundle for a category page (creative / skilled / digital).
 *
 * 1. Fetches + caches categories (needed to resolve categoryId by name).
 * 2. Prefetches subcategories for the resolved category.
 * 3. Prefetches artisans for the detected location.
 *
 * All three steps run concurrently after step 1 resolves categoryId.
 */
export async function prefetchCategoryPageData(
  queryClient: QueryClient,
  categoryPageName: string, // e.g. "Creative Artisans"
  location: LocationResult | null,
  categoryIdFromUrl?: string
): Promise<void> {
  const categories = await prefetchCategories(queryClient);

  const categoryId =
    categoryIdFromUrl ||
    (categories as any[]).find((c: any) => c.name === categoryPageName)?._id;

  await Promise.all([
    categoryId ? prefetchSubCategories(queryClient, categoryId) : Promise.resolve(),
    location ? prefetchArtisans(queryClient, location.country) : Promise.resolve(),
  ]);
}
