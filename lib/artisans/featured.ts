import { cache } from "react";
import { BASE_URL } from "@/constants";

export interface FeaturedArtisan {
  /** Artisan profile id, used for /artisan-details/[id]. */
  id: string;
  name: string;
  title: string;
  location: string;
  imageUrl?: string;
  verified: boolean;
}

interface RawArtisan {
  _id?: string;
  firstName?: string;
  lastName?: string;
  professionalTitle?: string;
  city?: string;
  primaryLocation?: string;
  profilePicture?: string;
  isVerified?: boolean;
  featuredOnHomepage?: boolean;
  accountStatus?: string;
}

/** Pure mapping + filtering, kept separate so it can be tested without the network. */
export const toFeaturedArtisans = (raw: RawArtisan[], limit: number): FeaturedArtisan[] =>
  raw
    .filter((a) => a._id && a.featuredOnHomepage === true && a.accountStatus === "active")
    .slice(0, limit)
    .map((a) => ({
      id: a._id as string,
      name: `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || "Artisan",
      title: (a.professionalTitle ?? "").trim(),
      location: (a.city ?? a.primaryLocation ?? "").trim(),
      imageUrl: a.profilePicture || undefined,
      verified: !!a.isVerified,
    }));

/**
 * Real artisans flagged `featuredOnHomepage` by an admin and currently active.
 * Never throws: on any failure the home page just hides the strip.
 */
export const getFeaturedArtisans = cache(async (limit = 4): Promise<FeaturedArtisan[]> => {
  try {
    const res = await fetch(`${BASE_URL}/artisans?limit=100&page=1`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const list: RawArtisan[] = json?.data ?? json?.artisans ?? [];
    return toFeaturedArtisans(list, limit);
  } catch {
    return [];
  }
});
