import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { normalizeCountry } from "@/utils/normalizeCountry";

interface LocationState {
  city: string | null;
  country: string | null;
  isDetected: boolean;
  // When true, queries filter by city. When false, country-wide results.
  useCityFilter: boolean;
  setLocation: (city: string, country: string) => void;
  // Call when detection completes but fails — unblocks artisan fetching with no country filter.
  markDetectionComplete: () => void;
  clearLocation: () => void;
  setCityFilter: (value: boolean) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      city: null,
      country: null,
      isDetected: false,
      useCityFilter: false,
      setLocation: (city, country) => set({ city, country: normalizeCountry(country), isDetected: true }),
      markDetectionComplete: () => set((state) => ({ isDetected: state.isDetected ? state.isDetected : true })),
      clearLocation: () =>
        set({ city: null, country: null, isDetected: false, useCityFilter: false }),
      setCityFilter: (value) => set({ useCityFilter: value }),
    }),
    {
      name: "location-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        city: state.city,
        country: state.country,
        isDetected: state.isDetected,
        useCityFilter: state.useCityFilter,
      }) as LocationState,
    }
  )
);
