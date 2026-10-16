import { cache } from "react";
import { BASE_URL } from "@/constants";
import { USE_MOCK_DATA } from "@/lib/mockMode";
import type { PlatformSettings } from "@/types/membership";
import { computeFoundingEnd } from "./founding";

const USE_MOCK = USE_MOCK_DATA;

/** Launch date isn't confirmed yet, so the mock leaves both dates unset. */
const MOCK_SETTINGS: PlatformSettings = { launchDate: null, foundingOfferEndsAt: null };

/** Server-side platform settings. Never throws; falls back to "dates unknown". */
export const getPlatformSettings = cache(async (): Promise<PlatformSettings> => {
  if (USE_MOCK) return MOCK_SETTINGS;
  try {
    const res = await fetch(`${BASE_URL}/settings/platform`, { next: { revalidate: 300 } });
    if (!res.ok) return MOCK_SETTINGS;
    const data = (await res.json()) as Partial<PlatformSettings>;
    const launchDate = data.launchDate ?? null;
    return {
      launchDate,
      foundingOfferEndsAt: data.foundingOfferEndsAt ?? computeFoundingEnd(launchDate),
    };
  } catch {
    return MOCK_SETTINGS;
  }
});
