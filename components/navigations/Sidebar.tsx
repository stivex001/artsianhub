"use client";

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

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const { logout, currentUser } = useAuthStore();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const isArtisanPage = pathname.startsWith("/artisan");
  const isAdminPage = pathname.startsWith("/admin");

  const handleLogout = () => {
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
      <div
        className="cursor-pointer  w-full h-14 rounded-2xl px-5 flex items-center gap-3"
        onClick={handleLogout}
      >
        <LogoutIcon />
        <span className="text-sm text-body">Log Out</span>
      </div>
    </aside>
  );
};

export default Sidebar;
