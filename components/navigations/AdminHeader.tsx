"use client";

import React, { useState } from "react";
import { NotificationIcon } from "../assets/icons/NavIcons";
import UserDesc from "../UserDesc";
import { MobileNav } from "./MobileNav";
import { BackArrowIcon } from "../assets/icons/NavigationIcons";
import { usePathname, useRouter } from "next/navigation";
import { useNotification } from "@/api/crud/notification";
import { NotificationModal } from "../shared/NotificationModal";
import ava from "@/components/assets/images/ava.svg";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { useArtisans } from "@/api/crud/artisans";

type Props = {};

export const AdminHeader = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [openNotification, setOpenNotification] = useState(false);

  const { currentUser } = useAuthStore();
  const { getMyProfile } = useArtisans();
  const { data: profile } = getMyProfile();

  const personalInfo = profile?.data;
  const profilePhoto = personalInfo?.profilePicture;

  const { getAllNotifications } = useNotification();

  const { data:notify, isPending } = getAllNotifications();
 
  
  const notificationData = notify?.data?.notifications || [];
  const total = notify?.data?.totalNotification ;
  const unreadNotifications = notificationData?.filter((n) => !n?.read);
  const unreadCount = unreadNotifications?.length;

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
        <div
          onClick={() => setOpenNotification((prev) => !prev)}
          className="relative cursor-pointer"
        >
          <NotificationIcon />
          <span className="absolute -top-2 right-1 text-[#AE2525] font-semibold text-base">
            {unreadCount}
          </span>
          {openNotification && (
            <NotificationModal
              onClose={() => setOpenNotification(false)}
              notifications={notificationData}
              total={total}

            />
          )}
        </div>

        <div className="w-10 h-10">
          <Image
            src={profilePhoto || ava}
            alt={`avatar`}
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </header>
  );
};
