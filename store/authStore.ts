"use client";

import { AuthUser } from "@/components/api/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  currentUser: AuthUser | null;
  setAccessToken: (token: string | null) => void;
  setCurrentUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      currentUser: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => {
        localStorage.clear();
        set({ accessToken: null, currentUser: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
