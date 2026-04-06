"use client";
import { useArtisans } from "@/api/crud/artisans";
import { useLocationStore } from "@/store/locationStore";

interface UseArtisansNearMeOptions {
  q?: string; // search term from URL or caller
}

// Country-wide by default.
// City-level filtering only when the user explicitly enables it via the LocationBanner.
export const useArtisansNearMe = ({ q }: UseArtisansNearMeOptions = {}) => {
  const { city, country, isDetected, useCityFilter } = useLocationStore();
  const { getArtisanAroundMe } = useArtisans();

  const params = {
    country: country || undefined,
    city: useCityFilter && city ? city : undefined,
    q: q || undefined,
  };

  const { data, isPending, isFetching } = getArtisanAroundMe(params, {
    enabled: isDetected, // wait until location is resolved before fetching
  });

  return {
    artisans: data?.data ?? [],
    isPending: isPending || isFetching,
    city,
    country,
    useCityFilter,
  };
};
