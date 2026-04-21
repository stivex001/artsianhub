"use client";
import { useEffect } from "react";
import { useLocationStore } from "@/store/locationStore";

// Mounts silently in the layout — detects location via IP on first visit.
// No UI, no user interaction needed.
export const LocationDetector = () => {
  const { isDetected, country, setLocation, markDetectionComplete } = useLocationStore();

  useEffect(() => {
    if (isDetected && country) return; // already have a real location from sessionStorage

    const detectByIP = async () => {
      try {
        const res = await fetch("/api/ip-location");
        if (!res.ok) {
          markDetectionComplete(); // unblock artisan fetching even without location
          return;
        }
        const data = await res.json();
        if (data.city && data.country) {
          setLocation(data.city, data.country);
        } else {
          markDetectionComplete();
        }
      } catch {
        markDetectionComplete(); // network error — still unblock artisan fetching
      }
    };

    detectByIP();
  }, [isDetected, setLocation, markDetectionComplete]);

  return null;
};
