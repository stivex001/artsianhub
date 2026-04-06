"use client";
import { useEffect } from "react";
import { useLocationStore } from "@/store/locationStore";

// Mounts silently in the layout — detects location via IP on first visit.
// No UI, no user interaction needed.
export const LocationDetector = () => {
  const { isDetected, setLocation } = useLocationStore();

  useEffect(() => {
    if (isDetected) return; // already have location from sessionStorage

    const detectByIP = async () => {
      try {
        const res = await fetch("/api/ip-location");
        const data = await res.json();
        if (data.city && data.country) {
          setLocation(data.city, data.country);
        }
      } catch {
        // silently fail — location just won't be set
      }
    };

    detectByIP();
  }, [isDetected, setLocation]);

  return null;
};
