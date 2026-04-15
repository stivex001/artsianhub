"use client";

import React, { useState } from "react";
import { NotificationIcon } from "../assets/icons/NavIcons";
import { MobileNav } from "./MobileNav";
import { usePathname } from "next/navigation";
import { useNotification } from "@/api/crud/notification";
import { NotificationModal } from "../shared/NotificationModal";
import ava from "@/components/assets/images/ava.svg";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { useArtisans } from "@/api/crud/artisans";
import { AuthSpinner } from "../auth/AuthLoader";

type Props = {};

export const AdminHeader = (props: Props) => {
  const pathname = usePathname();

  const [openNotification, setOpenNotification] = useState(false);

  const { currentUser, isHydrated } = useAuthStore();

  // Admins don't have an artisan profile — skip the /artisans/me call to avoid a
  // 401 that would clear the token and redirect back to the login page.
  const isAdmin =
    isHydrated &&
    (currentUser?.isAdmin === true || currentUser?.role === "SUPER_ADMIN");

  const { getMyProfile } = useArtisans();
  const { data: profile } = getMyProfile({ enabled: !isAdmin });

  const personalInfo = profile?.data;
  const profilePhoto = personalInfo?.profilePicture;

  // Also gate notifications so admin-only 401s don't blow up the session.
  const { getAllNotifications } = useNotification({ notificationsEnabled: !isAdmin });

  const { data: notify, isPending } = getAllNotifications();

  const notificationData = notify?.data?.notifications || [];
  const total = notify?.data?.totalNotification;
  const unreadNotifications = notificationData?.filter((n) => !n?.read);
  const unreadCount = unreadNotifications?.length;

  let title = "";
  let subtitle = "";

  if (pathname === "/artisan/dashboard") {
    title =
      isHydrated && currentUser
        ? `Welcome ${currentUser?.firstName} ${currentUser?.lastName}`
        : "Welcome Back!";
    subtitle =
      "Track appointments, update your portfolio, and stay connected with new clients.";
  } else if (pathname === "/artisan/dashboard/calender") {
    title = "Calender";
  } else if (pathname === "/artisan/dashboard/portfolio") {
    title = "Portfolio";
  } else if (pathname.startsWith("/artisan/dashboard/subscription")) {
    title = "Subscription";
  } else if (pathname === "/artisan/dashboard/settings") {
    title = "Settings";
  } else if (pathname.startsWith("/artisan/dashboard/manage-appointment")) {
    title = "Manage Appointment";
  } else if (pathname === "/admin/dashboard") {
    title =
      isHydrated && currentUser
        ? `Welcome ${currentUser?.firstName} ${currentUser?.lastName}`
        : "Welcome Back!";
    subtitle = "Manage your platform, artisans, and categories from one place.";
  } else if (pathname.startsWith("/admin/dashboard/manage-artisans")) {
    title = "Manage Artisans";
  } else if (pathname.startsWith("/admin/dashboard/manage-contacts")) {
    title = "Manage Contacts";
  } else if (pathname.startsWith("/admin/dashboard/manage-categories")) {
    title = "Manage Categories";
  } else if (pathname === "/admin/dashboard/portfolio") {
    title = "Portfolio";
  } else if (pathname === "/admin/dashboard/settings") {
    title = "Settings";
  } else if (pathname.startsWith("/admin/dashboard/subscription")) {
    title = "Subscription";
  } else if (pathname.startsWith("/admin/dashboard/manage-clients")) {
    title = "Manage Clients";
  } else if (pathname.startsWith("/admin/dashboard/bookings")) {
    title = "Bookings";
  } else if (pathname.startsWith("/admin/dashboard/support-tickets")) {
    title = "Support Tickets";
  } else if (pathname.startsWith("/admin/dashboard/reviews")) {
    title = "Reviews";
  } else if (pathname.startsWith("/admin/dashboard/notifications")) {
    title = "Notifications";
  } else if (pathname.match(/^\/admin\/dashboard\/manage-admins\/[^/]+/)) {
    title = "Admin Details";
  } else if (pathname.startsWith("/admin/dashboard/manage-admins")) {
    title = "Manage Admins";
  } else {
    title = "Welcome Back!";
    subtitle = "Let's get things done today.";
  }

  return (
    <header
      className={`bg-[#f9f9fb] w-full sticky top-0 left-0 z-50 flex items-center py-5 px-4 lg:px-8 justify-between`}
    >
      <MobileNav />
      <div className="hidden lg:block">
        <p className="font-[900] text-paragrah text-2xl">{title}</p>
        <span className="text-sm text-body">{subtitle}</span>
      </div>

      <div className="flex items-center gap-2.5">
        <div
          onClick={() => setOpenNotification((prev) => !prev)}
          className="relative cursor-pointer"
        >
          <NotificationIcon />
          {unreadCount > 0 && (
            <span className="absolute -top-2 right-1 text-[#AE2525] font-semibold text-base">
              {unreadCount}
            </span>
          )}

          {openNotification && (
            <NotificationModal
              onClose={() => setOpenNotification(false)}
              notifications={notificationData}
              total={total}
            />
          )}
        </div>

        <div className="w-10 h-10">
          {!isHydrated ? (
            <div className="w-full h-full flex items-center justify-center">
              <AuthSpinner size="sm" />
            </div>
          ) : (
            <Image
              src={profilePhoto || ava}
              alt={`avatar`}
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
      </div>
    </header>
  );
};
