"use client";

import React from "react";
import { Bell } from "lucide-react";
import { AdminNotification } from "@/apis/crud/admin";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: AdminNotification[];
  isPending: boolean;
  onMarked: () => void;
}

const SkeletonRow = () => (
  <div className="flex gap-3 px-5 py-4 animate-pulse">
    <div className="w-9 h-9 bg-gray-100 rounded-full shrink-0" />
    <div className="flex-1 space-y-2 pt-1">
      <div className="h-3.5 bg-gray-100 rounded w-2/3" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-2.5 bg-gray-100 rounded w-1/4" />
    </div>
  </div>
);

const NotificationList = ({ notifications, isPending, onMarked }: Props) => {
  if (isPending) {
    return (
      <div className="divide-y divide-gray-50">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
          <Bell className="w-7 h-7" />
        </div>
        <p className="text-sm font-medium">No notifications</p>
        <p className="text-xs text-center max-w-xs">
          New users, bookings, and reviews will appear here as they happen.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-50">
      {notifications.map((notif) => (
        <NotificationItem
          key={notif._id}
          notification={notif}
          onMarked={onMarked}
        />
      ))}
    </div>
  );
};

export default NotificationList;
