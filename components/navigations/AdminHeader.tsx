"use client";

import React from "react";
import { NotificationIcon } from "../assets/icons/NavIcons";
import { useUser } from "@/api/crud/user";
import { useAuthStore } from "@/store/authStore";
import { getUserInitials } from "@/utils/getUserInitials";

type Props = {};

export const AdminHeader = (props: Props) => {
  const { getCurrentArtisanUser } = useUser();
  const { data, isLoading } = getCurrentArtisanUser();

  const { currentUser } = useAuthStore();

  const initials = getUserInitials(
    currentUser?.firstName,
    currentUser?.lastName
  );

  return (
    <header className="bg-white rounded-t-[10px] w-full sticky top-0 left-0 z-50 flex items-center justify-end pt-14 pb-5 px-5">
      <div className="flex items-center gap-5">
        <button>
          <NotificationIcon />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-full">
            <h1 className="text-base text-white"> {initials}</h1>
          </div>
          <div className="flex flex-col">
            <p className="text-base ">
              {" "}
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <span className="text-xs text-grayish">
              Artisan ID:{data?.artisanId}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
