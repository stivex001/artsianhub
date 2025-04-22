import { create } from "zustand";

interface FilterState {
  search: string;
  startDate: Date | null;
  endDate: Date | null;
  filterTab: string; // NEW: this holds the active tab value

  setSearch: (value: string) => void;
  setStartDate: (value: Date | null) => void;
  setEndDate: (value: Date | null) => void;
  setFilterTab: (value: string) => void;

  reset: () => void;
}

const initialState = {
  search: "",
  startDate: null,
  endDate: null,
  filterTab: "all", // Default to "all"
};

export const useFilterState = create<FilterState>((set) => ({
  ...initialState,

  setSearch: (value) => set({ search: value }),
  setStartDate: (value) => set({ startDate: value }),
  setEndDate: (value) => set({ endDate: value }),
  setFilterTab: (value) => set({ filterTab: value }),

  reset: () => set({ ...initialState }),
}));
