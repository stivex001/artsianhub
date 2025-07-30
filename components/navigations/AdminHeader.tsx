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
import { useAuthStore } from "@/store/authStore";

type Props = {};

export const AdminHeader = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const showBackArrow = /\/manage-appointment\/[^/]+$/.test(pathname);

  const [openNotification, setOpenNotification] = useState(false);

  const { currentUser } = useAuthStore();

  // const { getAllNotifications } = useNotification();

  // const { data } = getAllNotifications();
  // const notificationData = data?.notifications || [];
  // const pagination = data?.pagination || { totalPages: 0, totalCount: 0 };

  let title = "";
  let subtitle = "";

  if (pathname === "/artisan/dashboard") {
    title = `Welcome ${currentUser?.firstName} ${currentUser?.lastName}`;
    subtitle =
      "Track appointments, update your portfolio, and stay connected with new clients.";
  } else if (pathname === "/artisan/dashboard/calender") {
    title = "Calender";
  } else if (pathname === "/artisan/dashboard/portfolio") {
    title = "Portfolio";
  } else if (pathname === "/artisan/dashboard/subscription") {
    title = "Subscription";
  } else if (pathname === "/artisan/dashboard/settings") {
    title = "Settings";
  } else if (pathname.startsWith("/artisan/dashboard/manage-appointment")) {
    title = "Manage Appointment";
  } else {
    title = "Welcome Back!";
    subtitle = "Let's get things done today.";
  }

  return (
    <header
      className={`bg-[#f9f9fb] w-full sticky top-0 left-0 z-50 flex items-center py-5 px-4 lg:px-8 justify-between`}
    >
      <MobileNav />
      <div>
        <p className="font-[900] text-paragrah text-2xl">{title}</p>
        <span className="text-sm text-body">{subtitle}</span>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setOpenNotification((prev) => !prev)}
          className="relative"
        >
          <NotificationIcon />
          {/* <span className="absolute -top-3 rigth-1 text-[#AE2525] font-semibold text-base">
            {notificationData?.length}
          </span> */}
          {/* {openNotification && (
            <NotificationModal
              onClose={() => setOpenNotification(false)}
              notifications={notificationData}
              total={pagination?.totalCount}
              unread={pagination?.totalCount}
            />
          )} */}
        </button>

        <UserProfile />
      </div>
    </header>
  );
};
