"use client";
import { useArtisans } from "@/api/crud/artisans";
import { useLocationStore } from "@/store/locationStore";
import { normalizeCountry } from "@/utils/normalizeCountry";

interface UseArtisansNearMeOptions {
  q?: string; // search term from URL or caller
}

// Country-wide by default.
// City-level filtering only when the user explicitly enables it via the LocationBanner.
export const useArtisansNearMe = ({ q }: UseArtisansNearMeOptions = {}) => {
  const { city, country, isDetected, useCityFilter } = useLocationStore();
  const { getArtisanAroundMe } = useArtisans();

  const params = {
    country: country ? normalizeCountry(country) : undefined,
    city: useCityFilter && city ? city : undefined,
    q: q || undefined,
  };

  const { data, isPending, isFetching, isError } = getArtisanAroundMe(params, {
    enabled: isDetected, // wait until location is resolved before fetching
  });

  const normalizedUserCountry = country ? normalizeCountry(country) : null;

  // Client-side country guard: the backend's country filter is unreliable
  // (e.g. it returns country="GB" artisans when querying country="Nigeria").
  // Keep artisans that match the user's country (normalized) or have no country set.
  const rawArtisans = data?.data ?? [];

  const artisans = normalizedUserCountry
    ? rawArtisans.filter((a: any) => {
        if (!a.country) return true; // no country stored → include
        return normalizeCountry(a.country) === normalizedUserCountry;
      })
    : rawArtisans;

  return {
    artisans,
    isPending: isPending || isFetching,
    isError,
    city,
    country,
    useCityFilter,
  };
};
