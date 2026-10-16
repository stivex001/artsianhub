"use client";

import { AuthUser } from "@/components/api/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  currentUser: AuthUser | null;
  isHydrated: boolean;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setCurrentUser: (user: AuthUser | null) => void;
  setHydrated: (hydrated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      currentUser: null,
      isHydrated: false,
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setCurrentUser: (user) => set({ currentUser: user }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      logout: () => {
        set({ accessToken: null, refreshToken: null, currentUser: null });
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
          refreshToken: state.refreshToken,
          currentUser: state.currentUser,
        }) as AuthState,
    },
  ),
);
