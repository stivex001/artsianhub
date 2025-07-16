"use client";

import React, { useState } from "react";
import { NotificationIcon } from "../assets/icons/NavIcons";
import UserDesc from "../UserDesc";
import { MobileNav } from "./MobileNav";
import { BackArrowIcon } from "../assets/icons/NavigationIcons";
import { usePathname, useRouter } from "next/navigation";
import { useNotification } from "@/api/crud/notification";
import { NotificationModal } from "../shared/NotificationModal";
import { UserProfile } from "../auth/UserProfile";

type Props = {};

export const AdminHeader = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const showBackArrow = /\/manage-appointment\/[^/]+$/.test(pathname);

  const [openNotification, setOpenNotification] = useState(false);

  const { getAllNotifications } = useNotification();

  const { data } = getAllNotifications();
  const notificationData = data?.notifications || [];
  const pagination = data?.pagination || { totalPages: 0, totalCount: 0 };

  return (
    <header
      className={`bg-[#f9f9fb] w-full sticky top-0 left-0 z-50 flex items-center  px-5 justify-between lg:justify-end ${
        showBackArrow ? "justify-between " : "justify-end"
      }`}
    >
      <MobileNav />

      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setOpenNotification((prev) => !prev)}
          className="relative"
        >
          <NotificationIcon />
          <span className="absolute -top-3 rigth-1 text-[#AE2525] font-semibold text-base">
            {notificationData?.length}
          </span>
          {openNotification && (
            <NotificationModal
              onClose={() => setOpenNotification(false)}
              notifications={notificationData}
              total={pagination?.totalCount}
              unread={pagination?.totalCount}
            />
          )}
        </button>

        <UserProfile />
      </div>
    </header>
  );
};
