// components/auth/ProtectedRoute.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { accessToken, currentUser } = useAuthStore();

  const role = currentUser?.role;

  useEffect(() => {
    if (!accessToken) {
      const fullPath = `${pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`;
      router.replace(`/auth/login?redirect=${encodeURIComponent(fullPath)}`);
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      router.replace("/403");
    }
  }, [accessToken, role, pathname, searchParams, router, allowedRoles]);

 
  if (!accessToken || (role && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
}
