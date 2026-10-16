"use client";
import { MapPin, Navigation, X } from "lucide-react";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useLocationStore } from "@/store/locationStore";

export const LocationBanner = () => {
  const { city, country, isDetected, refineWithGPS, clearLocation } =
    useUserLocation();
  const { useCityFilter, setCityFilter } = useLocationStore();

  if (!isDetected || !country) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-[#02198B]/5 border-b border-[#02198B]/10 text-sm text-gray-700">
      <MapPin className="w-4 h-4 text-[#02198B] shrink-0" />

      {useCityFilter && city ? (
        <>
          <span>
            Showing artisans in{" "}
            <span className="font-semibold text-[#02198B]">{city}</span>
          </span>
          <button
            onClick={() => setCityFilter(false)}
            className="text-xs text-gray-500 hover:text-gray-800 underline"
          >
            Show all in {country}
          </button>
        </>
      ) : (
        <>
          <span>
            Showing artisans across{" "}
            <span className="font-semibold text-[#02198B]">{country}</span>
          </span>
          {city && (
            <button
              onClick={() => setCityFilter(true)}
              className="text-xs text-[#02198B] hover:underline"
            >
              Filter by {city} only
            </button>
          )}
        </>
      )}

      <button
        onClick={refineWithGPS}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#02198B] hover:underline"
        title="Use GPS for your exact location"
      >
        <Navigation className="w-3 h-3" />
        Use exact location
      </button>

      <button
        onClick={clearLocation}
        className="ml-auto text-gray-400 hover:text-gray-600"
        title="Clear location"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
