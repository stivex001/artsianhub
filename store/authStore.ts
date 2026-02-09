"use client";

import { AuthUser } from "@/components/api/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  currentUser: AuthUser | null;
  isHydrated: boolean;
  setAccessToken: (token: string | null) => void;
  setCurrentUser: (user: AuthUser | null) => void;
  setHydrated: (hydrated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      currentUser: null,
      isHydrated: false,
      setAccessToken: (token) => set({ accessToken: token }),
      setCurrentUser: (user) => set({ currentUser: user }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      logout: () => {
        set({ accessToken: null, currentUser: null });
        sessionStorage.clear();
        localStorage.clear();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) =>
        ({
          accessToken: state.accessToken,
          currentUser: state.currentUser,
        }) as AuthState, // Cast to AuthState to satisfy strict persistence types while ignoring functions
    },
  ),
);
