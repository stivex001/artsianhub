"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { NotificationIcon } from "../assets/icons/NavIcons";
import { MobileNav } from "./MobileNav";
import { NotificationModal, type BaseNotification } from "../shared/NotificationModal";
import { useNotification } from "@/apis/crud/notification";
import { useAdminNotifications } from "@/apis/crud/admin";
import { useAuthStore } from "@/store/authStore";
import { useArtisans } from "@/apis/crud/artisans";
import { AuthSpinner } from "../auth/AuthLoader";
import { useAdminAuth } from "@/apis/crud/adminAuth";
import { LogOut, Mail, ShieldCheck, BadgeCheck, ChevronDown } from "lucide-react";
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

// ─── Role badge ───────────────────────────────────────────────────────────────
const RoleBadge = ({ role }: { role: string }) => {
  const isSuperAdmin = role === "SUPER_ADMIN";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
        isSuperAdmin
          ? "bg-[#F0C422]/15 text-[#92670a]"
          : "bg-primary/10 text-primary"
      }`}
    >
      {isSuperAdmin ? <ShieldCheck className="w-2.5 h-2.5" /> : <BadgeCheck className="w-2.5 h-2.5" />}
      {isSuperAdmin ? "Super Admin" : "Admin"}
    </span>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
export const AdminHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [openNotification, setOpenNotification] = useState(false);
  const [pendingMarkId, setPendingMarkId]       = useState<string | null>(null);
  const [openProfile, setOpenProfile]           = useState(false);
  const profileRef                              = useRef<HTMLDivElement>(null);

  const { currentUser, isHydrated, logout } = useAuthStore();
  const { logout: logoutMutation } = useAdminAuth();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(undefined);
    } catch {
      // ignore — log out client-side regardless
    }
    logout();
    queryClient.clear();
    router.replace("/admin/auth/login");
  };

  // Admin initials for avatar
  const fullName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
    : "";
  const initials = fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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

        {/* ── Avatar + Profile Dropdown ───────────────────────────────── */}
        <div className="relative" ref={profileRef}>
          {!isHydrated ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <AuthSpinner size="sm" />
            </div>
          ) : (
            <button
              onClick={() => setOpenProfile((p) => !p)}
              className="flex items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-gray-100 transition-colors group"
              aria-label="Open profile menu"
            >
              {/* Avatar circle */}
              {isAdmin ? (
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-white text-xs font-bold tracking-wide">{initials || "A"}</span>
                </div>
              ) : (
                <Image
                  src={profilePhoto || ava}
                  alt="avatar"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-cover rounded-full"
                />
              )}
              {isAdmin && (
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${openProfile ? "rotate-180" : ""}`}
                />
              )}
            </button>
          )}

          {/* ── Dropdown panel (admin only) ─────────────────────────── */}
          <AnimatePresence>
            {openProfile && isAdmin && currentUser && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/60 overflow-hidden z-50"
              >
                {/* Profile header */}
                <div className="px-4 pt-4 pb-3 bg-gradient-to-br from-primary/5 to-transparent border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* Large initials avatar */}
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                      <span className="text-white text-sm font-bold tracking-wide">{initials || "A"}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 truncate">{fullName || "Admin"}</p>
                      {currentUser.roleLabel && (
                        <p className="text-xs text-gray-500 truncate">{currentUser.roleLabel}</p>
                      )}
                      <div className="mt-1">
                        <RoleBadge role={currentUser.role} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="px-4 py-3 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-600 truncate">{currentUser.email}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Logout */}
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {logoutMutation.isPending ? (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <LogOut className="w-4 h-4" />
                    )}
                    {logoutMutation.isPending ? "Signing out…" : "Sign out"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
