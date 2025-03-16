"use client";

import Image from "next/image";
import React from "react";
import logo from "@/components/assets/images/logo.png";
import SidebarMenu from "./SidebarMenu";
import { usePathname } from "next/navigation";
import { artisanLinks } from "./data";
import settings from "@/components/assets/images/Settings.png";
import Link from "next/link";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col lg:w-[18%] bg-white h-screen rounded-[10px] overflow-y-scroll scrollbar-hidden py-14 sticky top-0">
      <div className="w-[106px] h-20 mx-auto">
        <Image
          src={logo}
          alt="logo"
          className="w-full h-full object-cover rounded-[5px]"
        />
      </div>
      <div className="flex-grow overflow-y-auto no-scrollbar  pt-20">
        <div>
          <SidebarMenu links={artisanLinks} pathname={pathname} />
        </div>
      </div>
      <Link
        href="/artisan/dashboard/settings"
        className="bg-secondary w-[172px] mx-auto rounded-[10px] flex items-center justify-center  py-4 gap-5 text-sm text-white"
      >
        <Image src={settings} alt="settings" className="w-5 h-5 object-cover" />
        Settings
      </Link>
    </aside>
  );
};

export default Sidebar;
