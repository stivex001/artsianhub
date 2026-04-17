"use client";

import React, { useState } from "react";
import { useAdminNotifications } from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Bell, CheckCheck, RefreshCw, Filter } from "lucide-react";
import NotificationList from "@/components/admin/notifications/NotificationList";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const [unreadOnly, setUnreadOnly] = useState(false);

  const { getNotifications, markAllAsRead } = useAdminNotifications();
  const { data, isPending, refetch } = getNotifications(unreadOnly);

  const notifications = data?.data ?? [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllMutation = markAllAsRead();

  const handleMarkAll = async () => {
    try {
      await markAllMutation.mutateAsync(undefined);
      toast.success("All notifications marked as read");
      queryClient.invalidateQueries({ queryKey: ["admin_notifications"] });
    } catch {
      toast.error("Failed to mark all as read");
    }
  };

  const handleMarked = () => {
    queryClient.invalidateQueries({ queryKey: ["admin_notifications"] });
  };

  return (
    <section className="flex flex-col gap-6 max-w-3xl">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
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
          <button
            onClick={handleMarkAll}
            disabled={markAllMutation.isPending || unreadCount === 0}
            className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark All Read
          </button>
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
                !unreadOnly
                  ? "bg-primary text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setUnreadOnly(true)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                unreadOnly
                  ? "bg-primary text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Unread only
            </button>
          </div>
        </div>
      </div>

      {/* ── Notification List ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <NotificationList
          notifications={notifications}
          isPending={isPending}
          onMarked={handleMarked}
        />
      </div>
    </section>
  );
};

export default NotificationsPage;
