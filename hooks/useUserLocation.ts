"use client";
import { useLocationStore } from "@/store/locationStore";

export const useUserLocation = () => {
  const { city, country, isDetected, setLocation, clearLocation, setCityFilter } =
    useLocationStore();

  // Upgrade to GPS accuracy — also enables city-level filtering
  const refineWithGPS = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `/api/geocode?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data.city && data.country) {
            setLocation(data.city, data.country);
            setCityFilter(true); // switching to GPS also activates city-level filtering
          }
        } catch {
          // silently fail — keep existing location
        }
      },
      () => {
        // permission denied — keep existing location
      }
    );
  };

  return { city, country, isDetected, refineWithGPS, clearLocation, setLocation };
};
