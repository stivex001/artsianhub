"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { AuthLoadingScreen } from "../auth/AuthLoader";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
  loginPath?: string;
};

const ProtectedRouteContent = ({ allowedRoles, children, loginPath }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { accessToken, currentUser, isHydrated } = useAuthStore();

  const role = currentUser?.role;

  // Case-insensitive role check so the API casing (e.g. "ADMIN" vs "admin") never matters
  const roleAllowed = (r: string | undefined) =>
    !r || allowedRoles.some((a) => a.toLowerCase() === r.toLowerCase());

  useEffect(() => {
    // Don't redirect until hydration is complete
    if (!isHydrated) return;

    if (!accessToken) {
      const fullPath = `${pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`;
      const redirectTo = loginPath ?? "/auth/login";
      router.replace(`${redirectTo}?redirect=${encodeURIComponent(fullPath)}`);
      return;
    }

    if (!roleAllowed(role)) {
      router.replace("/403");
    }
  }, [
    accessToken,
    role,
    pathname,
    searchParams,
    router,
    allowedRoles,
    isHydrated,
  ]);

  // Show loading screen while hydrating
  if (!isHydrated) {
    return <AuthLoadingScreen message="Loading..." />;
  }

  if (!accessToken || !roleAllowed(role)) {
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRouteContent;
