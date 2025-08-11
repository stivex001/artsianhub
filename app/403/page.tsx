"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/clickable/CustomButton";

export default function ForbiddenPage() {
  const { currentUser, accessToken } = useAuthStore();
  const router = useRouter();

  const isLoggedIn = !!accessToken && !!currentUser;

  const handleGoHome = () => {
    if (isLoggedIn) {
      // send them to their dashboard based on role
      if (currentUser?.role === "admin") router.push("/admin/dashboard");
      else if (currentUser?.role === "artisan") router.push("/artisan/dashboard");
      else if (currentUser?.role === "client") router.push("/client");
      else router.push("/");
    } else {
      router.push("/");
    }
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {isLoggedIn
          ? "You don't have permission to view this page."
          : "Please login to access this page."}
      </p>

      <div className="flex gap-4">
        <CustomButton
          label="Go Home"
          onClick={handleGoHome}
          className="rounded-lg"
        />
        {!isLoggedIn && (
          <CustomButton
            label="Login"
            onClick={handleLogin}
            variant="secondary"
            className="rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
