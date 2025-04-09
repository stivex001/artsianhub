"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo } from "react";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
  allowedRoles: Array<"admin" | "artisan" | "client">;
};

const ProtectedRoutes = ({ children, allowedRoles }: Props) => {
  const router = useRouter();
  const { currentUser, accessToken } = useAuthStore();

  const userRole = useMemo(() => {
    if (currentUser?.isAdmin) return "admin";
    if (currentUser?.isArtisan) return "artisan";
    if (currentUser?.isClient) return "client";
    return null;
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !accessToken) {
      router.replace("/auth/login");
      return;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
      toast.error("You are not authorized to access this page.");
      router.replace("/auth/login");
      return;
    }

    // Optional: redirect to specific dashboard if needed
    if (userRole === "artisan") {
      router.replace("/artisan/dashboard");
    } else if (userRole === "admin") {
      router.replace("/admin/dashboard");
    } else if (userRole === "client") {
      router.replace("/client/dashboard");
    }
  }, [userRole, currentUser, accessToken, allowedRoles, router]);

  // Optional: Show nothing or loading state while verifying
  if (!currentUser || !userRole || !allowedRoles.includes(userRole)) return null;

  return <>{children}</>;
};

export default ProtectedRoutes;
