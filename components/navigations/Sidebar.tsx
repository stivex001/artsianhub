"use client";

import Image from "next/image";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import { usePathname } from "next/navigation";
import { adminLinks, artisanLinks } from "./data";
import settings from "@/components/assets/images/Settings.png";
import Link from "next/link";
import { BrandIcon } from "../assets/icons/Logo";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { LogoutIcon } from "../assets/icons/NavigationIcons";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
   const { logout, currentUser } = useAuthStore();

  const isArtisanPage = pathname.startsWith("/artisan");
  const isAdminPage = pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <aside className="hidden lg:flex flex-col lg:w-[20%] bg-white h-screen rounded-[10px] overflow-y-scroll scrollbar-hidden py-6 px-4 sticky top-0">
      <Link href="#" className="mb-5 px-4">
        <BrandIcon />
      </Link>
      <div className="flex-grow overflow-y-auto no-scrollbar">
        <div>
          {isArtisanPage && (
            <SidebarMenu links={artisanLinks} pathname={pathname} />
          )}
          {isAdminPage && (
            <SidebarMenu links={adminLinks} pathname={pathname} />
          )}
        </div>
      </div>
      <div className="cursor-pointer  w-full h-14 rounded-2xl px-5 flex items-center gap-3" onClick={handleLogout}>
        <LogoutIcon />
         <span className="text-sm text-body">Log Out</span>
      </div>
    </aside>
  );
};

export default Sidebar;
