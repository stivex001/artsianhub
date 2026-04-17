"use client";

import React from "react";
import {
  Bell,
  UserPlus,
  UserCheck,
  Calendar,
  Star,
  AlertCircle,
  Check,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { AdminNotification, useAdminNotifications } from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  notification: AdminNotification;
  onMarked: () => void;
}

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-primary",
};

function EventIcon({ eventType }: { eventType: string }) {
  const base =
    "w-9 h-9 rounded-full flex items-center justify-center shrink-0";
  const t = eventType.toLowerCase();
  if (t.includes("client_reg") || t.includes("new_client"))
    return (
      <div className={`${base} bg-emerald-100`}>
        <UserPlus className="w-4 h-4 text-emerald-600" />
      </div>
    );
  if (t.includes("artisan_reg") || t.includes("new_artisan"))
    return (
      <div className={`${base} bg-blue-100`}>
        <UserCheck className="w-4 h-4 text-blue-600" />
      </div>
    );
  if (t.includes("booking"))
    return (
      <div className={`${base} bg-indigo-100`}>
        <Calendar className="w-4 h-4 text-indigo-600" />
      </div>
    );
  if (t.includes("review"))
    return (
      <div className={`${base} bg-amber-100`}>
        <Star className="w-4 h-4 text-amber-600" />
      </div>
    );
  if (t.includes("ticket"))
    return (
      <div className={`${base} bg-orange-100`}>
        <AlertCircle className="w-4 h-4 text-orange-600" />
      </div>
    );
  return (
    <div className={`${base} bg-primary/10`}>
      <Bell className="w-4 h-4 text-primary" />
    </div>
  );
}

const NotificationItem = ({ notification, onMarked }: Props) => {
  const queryClient = useQueryClient();
  const { markAsRead } = useAdminNotifications();
  const mutation = markAsRead(notification._id);

  const handleMark = async () => {
    try {
      await mutation.mutateAsync(undefined);
      queryClient.invalidateQueries({ queryKey: ["admin_notifications"] });
      onMarked();
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(notification.createdAt), {
        addSuffix: true,
      });
    } catch {
      return notification.createdAt;
    }
  })();

  return (
    <div
      className={`flex items-start gap-4 px-5 py-4 transition-colors ${
        !notification.read ? "bg-primary/[0.025]" : ""
      }`}
    >
      <EventIcon eventType={notification.eventType} />

      <div className="flex-1 min-w-0">
        {notification.title && (
          <p
            className={`text-sm font-semibold leading-snug ${
              !notification.read ? "text-gray-900" : "text-gray-700"
            }`}
          >
            {notification.title}
          </p>
        )}
        <p
          className={`text-sm leading-snug mt-0.5 ${
            !notification.read ? "text-gray-700" : "text-gray-500"
          }`}
        >
          {notification.message}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-gray-400">{timeAgo}</span>
          {notification.priority !== "low" && (
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full ${
                notification.priority === "high"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[notification.priority]}`}
              />
              {notification.priority}
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {!notification.read && (
          <span
            className="w-2 h-2 bg-primary rounded-full shrink-0"
            aria-label="Unread"
          />
        )}
        <button
          onClick={handleMark}
          disabled={mutation.isPending || notification.read}
          className={`p-1.5 rounded-lg transition-colors ${
            notification.read
              ? "text-gray-300 cursor-default"
              : "bg-gray-50 text-gray-400 hover:bg-primary/10 hover:text-primary disabled:opacity-40"
          }`}
          title={notification.read ? "Already read" : "Mark as read"}
        >
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
