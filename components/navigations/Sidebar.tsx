"use client";

import React from "react";
import SidebarMenu from "./SidebarMenu";
import { usePathname } from "next/navigation";
import { adminLinks, artisanLinks, superAdminLinks } from "./data";
import Link from "next/link";
import logo from "@/components/assets/images/n.png";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { LogoutIcon } from "../assets/icons/NavigationIcons";
import Image from "next/image";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useAdminAuth } from "@/apis/crud/adminAuth";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const { logout, currentUser } = useAuthStore();
  const { logout: logoutApi } = useAdminAuth();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const isArtisanPage = pathname.startsWith("/artisan");
  const isAdminPage = pathname.startsWith("/admin");

  const handleLogout = async () => {
    if (isAdminPage) {
      try {
        await logoutApi.mutateAsync(undefined);
      } catch {
        // best effort — clear local state regardless
      }
    }
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <aside className="hidden lg:flex flex-col lg:w-[20%] bg-white h-screen rounded-[10px] overflow-y-scroll scrollbar-hidden py-6 px-4 sticky top-0">
      <Link href="#" className="mb-5 px-4 w-40 h-16">
        <Image src={logo} alt="logo" className="w-full h-full object-cover " />
      </Link>
      <div className="flex-grow overflow-y-auto no-scrollbar">
        <div>
          {isArtisanPage && (
            <SidebarMenu links={artisanLinks} pathname={pathname} />
          )}
          {isAdminPage && (
            <>
              <SidebarMenu links={adminLinks} pathname={pathname} />
              {isSuperAdmin && (
                <div className="mt-2">
                  <p className="px-4 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    Super Admin
                  </p>
                  <SidebarMenu links={superAdminLinks} pathname={pathname} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Account (admin only) ──────────────────────────────────────── */}
      {isAdminPage && (
        <div className="border-t border-gray-100 pt-3 mt-3 flex flex-col gap-1">
          <p className="px-4 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Account
          </p>
          <Link
            href="/admin/dashboard/change-password"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
              pathname.startsWith("/admin/dashboard/change-password")
                ? "bg-primary/5 text-primary font-medium"
                : "text-body hover:bg-gray-50"
            }`}
          >
            <KeyRound className="w-4 h-4 shrink-0" />
            Change Password
          </Link>
          <Link
            href="/admin/dashboard/setup-2fa"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
              pathname.startsWith("/admin/dashboard/setup-2fa")
                ? "bg-primary/5 text-primary font-medium"
                : "text-body hover:bg-gray-50"
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            Setup 2FA
          </Link>
        </div>
      )}

      <div
        className="cursor-pointer w-full h-14 rounded-2xl px-5 flex items-center gap-3 mt-2"
        onClick={handleLogout}
      >
        <LogoutIcon />
        <span className="text-sm text-body">Log Out</span>
      </div>
    </aside>
  );
};

export default Sidebar;
