import { create } from "zustand";

type ModalStore = {
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isSettingsOpen: false,
  openSettings: () => set({ isSettingsOpen: true }),
  closeSettings: () => set({ isSettingsOpen: false }),
}));
