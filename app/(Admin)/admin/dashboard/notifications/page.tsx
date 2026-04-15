"use client";

import React, { useState } from "react";
import { useAdminNotifications } from "@/api/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Bell, CheckCheck, Check, RefreshCw, Filter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const [unreadOnly, setUnreadOnly] = useState(false);

  const { getNotifications, markAsRead, markAllAsRead } = useAdminNotifications();
  const { data, isPending, refetch } = getNotifications(unreadOnly);

  const notifications = data?.data ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const markOneMutation = markAsRead("");
  const markAllMutation = markAllAsRead();

  const handleMarkOne = async (id: string) => {
    const mutation = markAsRead(id);
    try {
      await mutation.mutateAsync(undefined as any);
      refetch();
      queryClient.invalidateQueries({ queryKey: ["admin_notifications"] });
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllMutation.mutateAsync(undefined as any);
      toast.success("All notifications marked as read");
      refetch();
      queryClient.invalidateQueries({ queryKey: ["admin_notifications"] });
    } catch {
      toast.error("Failed to mark all as read");
    }
  };

  const formatTime = (d: string) => {
    try {
      return formatDistanceToNow(new Date(d), { addSuffix: true });
    } catch {
      return d;
    }
  };

  const getNotifIcon = (type?: string) => {
    const base = "w-9 h-9 rounded-full flex items-center justify-center shrink-0";
    if (type?.includes("booking")) return <div className={`${base} bg-blue-100`}><Bell className="w-4 h-4 text-blue-500" /></div>;
    if (type?.includes("review")) return <div className={`${base} bg-yellow-100`}><Bell className="w-4 h-4 text-yellow-500" /></div>;
    if (type?.includes("user") || type?.includes("register")) return <div className={`${base} bg-green-100`}><Bell className="w-4 h-4 text-green-500" /></div>;
    return <div className={`${base} bg-primary/10`}><Bell className="w-4 h-4 text-primary" /></div>;
  };

  return (
    <section className="flex flex-col gap-6 max-w-3xl">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="text-sm bg-primary text-white px-2.5 py-0.5 rounded-full font-medium">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Live platform alerts requiring admin attention
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAll}
              disabled={markAllMutation.isPending}
              className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-40 transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* ── Filter ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <div className="flex gap-2">
            <button
              onClick={() => setUnreadOnly(false)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                !unreadOnly ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setUnreadOnly(true)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                unreadOnly ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Unread only
            </button>
          </div>
        </div>
      </div>

      {/* ── Notification List ────────────────────────────────────────── */}
      {isPending ? (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-9 h-9 bg-gray-100 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 flex flex-col items-center gap-3 text-gray-400">
          <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
            <Bell className="w-7 h-7" />
          </div>
          <p className="text-sm font-medium">No notifications yet</p>
          <p className="text-xs text-center max-w-xs">
            New users, bookings, and reviews will appear here as they happen.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`flex items-start gap-4 p-4 transition-colors ${
                !notif.isRead ? "bg-primary/[0.02]" : ""
              }`}
            >
              {getNotifIcon(notif.type)}

              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${!notif.isRead ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                  {notif.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">{formatTime(notif.createdAt)}</p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {!notif.isRead && (
                  <>
                    <span className="w-2 h-2 bg-primary rounded-full" aria-label="Unread" />
                    <button
                      onClick={() => handleMarkOne(notif._id)}
                      className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NotificationsPage;
