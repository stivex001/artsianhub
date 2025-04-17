"use client";

import React from "react";
import { NotificationIcon } from "../assets/icons/NavIcons";
import UserDesc from "../UserDesc";
import { MobileNav } from "./MobileNav";
import { BackArrowIcon } from "../assets/icons/NavigationIcons";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

export const AdminHeader = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const showBackArrow = /\/manage-appointment\/[^/]+$/.test(pathname);

  return (
    <header
      className={`bg-white rounded-t-[10px] w-full sticky top-0 left-0 z-50 flex items-center pt-14 pb-5 px-5 justify-between lg:justify-end ${
        showBackArrow ? "justify-between " : "justify-end"
      }`}
    >
      <MobileNav />
      {showBackArrow && (
        <div onClick={() => router.back()} className="hidden lg:block cursor-pointer -mt-6">
          <BackArrowIcon />
        </div>
      )}
      <div className="flex items-center gap-5">
        <button>
          <NotificationIcon />
        </button>
        <UserDesc />
      </div>
    </header>
  );
};
