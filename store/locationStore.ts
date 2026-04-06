import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocationState {
  city: string | null;
  country: string | null;
  isDetected: boolean;
  // When true, queries filter by city. When false, country-wide results.
  useCityFilter: boolean;
  setLocation: (city: string, country: string) => void;
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
      setLocation: (city, country) => set({ city, country, isDetected: true }),
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
