"use client";

import React from "react";
import { NotificationIcon } from "../assets/icons/NavIcons";
import UserDesc from "../UserDesc";
import { MobileNav } from "./MobileNav";

type Props = {};

export const AdminHeader = (props: Props) => {
  return (
    <header className="bg-white rounded-t-[10px] w-full sticky top-0 left-0 z-50 flex items-center justify-between lg:justify-end pt-14 pb-5 px-5">
      <MobileNav />
      <div className="flex items-center gap-5">
        <button>
          <NotificationIcon />
        </button>
        <UserDesc />
      </div>
    </header>
  );
};
