"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useAuthStore();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (currentUser === null) return;

    if (!currentUser?.isArtisan) {
      if (pathname !== "/artisan/auth/login" && !hasRedirected) {
        toast.error("You are not authorized to access this page.");
        setHasRedirected(true);
        router.replace("/");
      }
    }
  }, [currentUser, pathname, router, hasRedirected]);

  if (!currentUser?.isArtisan) return null;

  return <>{children}</>;
};

export default ProtectedRoutes;
