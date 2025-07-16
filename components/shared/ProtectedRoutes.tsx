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
  const { accessToken, currentUser } = useAuthStore();

  const userRole = useMemo(() => {
    if (currentUser?.role === "admin") return "admin";
    if (currentUser?.role === "artisan") return "artisan";
    if (currentUser?.role === "client") return "client";
    return null;
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !accessToken) {
      // toast.error("You are not Authenticated, kindly login");
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
      router.replace("/client");
    }
  }, [userRole, currentUser, accessToken, allowedRoles, router]);

  // Optional: Show nothing or loading state while verifying
  if (!currentUser || !userRole || !allowedRoles.includes(userRole))
    return null;

  return <>{children}</>;
};

export default ProtectedRoutes;
