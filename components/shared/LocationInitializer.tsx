"use client";

import { useEffect } from "react";
import { useLocationStore } from "@/store/locationStore";

interface Props {
  initialLocation: { city: string; country: string } | null;
}

/**
 * Seeds the Zustand location store from the server-detected location.
 * Only runs when the client hasn't already detected location (first-time visitor).
 * Returning visitors already have location in sessionStorage → no-op.
 */
export const LocationInitializer = ({ initialLocation }: Props) => {
  const { isDetected, setLocation, markDetectionComplete } = useLocationStore();

  useEffect(() => {
    if (isDetected) return;
    if (initialLocation) {
      setLocation(initialLocation.city, initialLocation.country);
    } else {
      // Server couldn't detect location — unblock artisan fetching anyway
      markDetectionComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
