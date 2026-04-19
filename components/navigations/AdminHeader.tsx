"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { NotificationIcon } from "../assets/icons/NavIcons";
import { MobileNav } from "./MobileNav";
import { NotificationModal, type BaseNotification } from "../shared/NotificationModal";
import { useNotification } from "@/apis/crud/notification";
import { useAdminNotifications } from "@/apis/crud/admin";
import { useAuthStore } from "@/store/authStore";
import { useArtisans } from "@/apis/crud/artisans";
import { AuthSpinner } from "../auth/AuthLoader";
import ava from "@/components/assets/images/ava.svg";
import Image from "next/image";

// ─── Page title map ────────────────────────────────────────────���──────────────
const resolveTitle = (pathname: string, firstName?: string, lastName?: string) => {
  const name = firstName && lastName ? `${firstName} ${lastName}` : null;

  if (pathname === "/artisan/dashboard")
    return { title: name ? `Welcome ${name}` : "Welcome Back!", subtitle: "Track appointments, update your portfolio, and stay connected with new clients." };
  if (pathname === "/artisan/dashboard/calender")         return { title: "Calendar" };
  if (pathname === "/artisan/dashboard/portfolio")        return { title: "Portfolio" };
  if (pathname.startsWith("/artisan/dashboard/subscription")) return { title: "Subscription" };
  if (pathname === "/artisan/dashboard/settings")         return { title: "Settings" };
  if (pathname.startsWith("/artisan/dashboard/support-ticket")) return { title: "Support Ticket" };
  if (pathname.startsWith("/artisan/dashboard/manage-appointment")) return { title: "Manage Appointment" };

  if (pathname === "/admin/dashboard")
    return { title: name ? `Welcome ${name}` : "Welcome Back!", subtitle: "Manage your platform, artisans, and categories from one place." };
  if (pathname.startsWith("/admin/dashboard/manage-artisans"))      return { title: "Manage Artisans" };
  if (pathname.startsWith("/admin/dashboard/manage-contacts"))      return { title: "Manage Contacts" };
  if (pathname.startsWith("/admin/dashboard/manage-categories"))    return { title: "Manage Categories" };
  if (pathname === "/admin/dashboard/portfolio")                     return { title: "Portfolio" };
  if (pathname === "/admin/dashboard/settings")                      return { title: "Settings" };
  if (pathname.startsWith("/admin/dashboard/subscription"))          return { title: "Subscription" };
  if (pathname.startsWith("/admin/dashboard/manage-clients"))        return { title: "Manage Clients" };
  if (pathname.startsWith("/admin/dashboard/bookings"))              return { title: "Bookings" };
  if (pathname.startsWith("/admin/dashboard/support-tickets"))       return { title: "Support Tickets" };
  if (pathname.startsWith("/admin/dashboard/reviews"))               return { title: "Reviews" };
  if (pathname.startsWith("/admin/dashboard/notifications"))         return { title: "Notifications" };
  if (pathname.startsWith("/admin/dashboard/manage-subscriptions"))  return { title: "Subscriptions" };
  if (pathname.startsWith("/admin/dashboard/change-password"))       return { title: "Change Password" };
  if (pathname.startsWith("/admin/dashboard/setup-2fa"))             return { title: "Two-Factor Authentication" };
  if (pathname.startsWith("/admin/dashboard/broadcast-message"))     return { title: "Broadcast Message" };
  if (pathname.match(/^\/admin\/dashboard\/manage-admins\/[^/]+/))  return { title: "Admin Details" };
  if (pathname.startsWith("/admin/dashboard/manage-admins"))         return { title: "Manage Admins" };

  return { title: "Welcome Back!", subtitle: "Let's get things done today." };
};

// ─── Component ────────────────────────────────────────────────────────────────
export const AdminHeader = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [openNotification, setOpenNotification] = useState(false);
  const [pendingMarkId, setPendingMarkId]       = useState<string | null>(null);

  const { currentUser, isHydrated } = useAuthStore();
  const isAdmin =
    isHydrated &&
    (currentUser?.isAdmin === true || currentUser?.role === "SUPER_ADMIN");

  // ── Profile (artisan only) ──────────────────────────���────────────────────
  const { getMyProfile } = useArtisans();
  const { data: profile } = getMyProfile({ enabled: !isAdmin });
  const profilePhoto = profile?.data?.profilePicture;

  // ── User notifications (artisan) ─────────────────────────────────────────
  const { getAllNotifications, markAllNotification, markAllSingleNotification } =
    useNotification({ notificationsEnabled: !isAdmin && isHydrated });
  const { data: userNotifData, refetch: refetchUser } = getAllNotifications();

  const { mutate: markAllUser, isPending: isMarkingAllUser } = markAllNotification;
  const { mutate: markSingleUser } = markAllSingleNotification(pendingMarkId ?? "");

  // ── Admin notifications ──────────────────────────────────────────────────
  const { getNotifications, markAsRead, markAllAsRead } = useAdminNotifications();
  const { data: adminNotifData, refetch: refetchAdmin } =
    getNotifications(false, isAdmin && isHydrated);

  const { mutate: markAllAdminMutation, isPending: isMarkingAllAdmin } = markAllAsRead();
  const { mutate: markSingleAdmin } = markAsRead(pendingMarkId ?? "");

  // ── Normalise to BaseNotification ────────────────────────────────────────
  const notifications: BaseNotification[] = isAdmin
    ? (adminNotifData?.data ?? []).map((n) => ({
        _id:       n._id,
        title:     n.title,
        message:   n.message,
        read:      n.read,
        createdAt: n.createdAt,
        eventType: n.eventType,
        priority:  n.priority,
      }))
    : (userNotifData?.data?.notifications ?? []).map((n) => ({
        _id:       n._id,
        title:     n.title,
        message:   n.message,
        read:      n.read,
        createdAt: String(n.createdAt),
      }));

  const total = isAdmin
    ? notifications.length
    : (userNotifData?.data?.totalNotification ?? 0);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // ── Mark single — useEffect fires after re-render with new pendingMarkId ─
  useEffect(() => {
    if (!pendingMarkId) return;

    if (isAdmin) {
      markSingleAdmin(undefined, {
        onSuccess: () => { refetchAdmin(); setPendingMarkId(null); },
        onError: (e: any) => { toast.error(e?.message ?? "Failed to mark as read"); setPendingMarkId(null); },
      });
    } else {
      markSingleUser({}, {
        onSuccess: () => { refetchUser(); setPendingMarkId(null); },
        onError: (e: any) => { toast.error(e?.message ?? "Failed to mark as read"); setPendingMarkId(null); },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMarkId]);

  // ── Mark all ─────────────────────────────────────────────────────────────
  const handleMarkAll = () => {
    if (isAdmin) {
      markAllAdminMutation(undefined, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin_notifications"] }),
        onError: (e: any) => toast.error(e?.message ?? "Failed to mark all as read"),
      });
    } else {
      markAllUser({}, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notification"] }),
        onError: (e: any) => toast.error(e?.message ?? "Failed to mark all as read"),
      });
    }
  };

  const { title, subtitle } = resolveTitle(
    pathname,
    currentUser?.firstName,
    currentUser?.lastName
  );

  return (
    <header className="bg-[#f9f9fb] w-full sticky top-0 left-0 z-50 flex items-center py-5 px-4 lg:px-8 justify-between">
      <MobileNav />

      <div className="hidden lg:block">
        <p className="font-[900] text-paragrah text-2xl">{title}</p>
        {subtitle && <span className="text-sm text-body">{subtitle}</span>}
      </div>

      <div className="flex items-center gap-2.5">
        {/* ── Bell ────────────────────────────────────────────────────── */}
        <div className="relative">
          <button
            onClick={() => setOpenNotification((prev) => !prev)}
            className="relative cursor-pointer"
          >
            <NotificationIcon />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center
                justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {openNotification && (
              <NotificationModal
                onClose={() => setOpenNotification(false)}
                notifications={notifications}
                total={total}
                onMarkSingle={(id) => setPendingMarkId(id)}
                onMarkAll={handleMarkAll}
                isMarkingAll={isAdmin ? isMarkingAllAdmin : isMarkingAllUser}
                pendingId={pendingMarkId}
                viewAllHref={isAdmin ? "/admin/dashboard/notifications" : undefined}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── Avatar ──────────────────────────────────────────────────── */}
        <div className="w-10 h-10">
          {!isHydrated ? (
            <div className="w-full h-full flex items-center justify-center">
              <AuthSpinner size="sm" />
            </div>
          ) : (
            <Image
              src={profilePhoto || ava}
              alt="avatar"
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
