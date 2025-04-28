"use client";

import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useRef } from "react";

interface NotificationModalProps {
  onClose: () => void;
  notifications: any[];
  total: number;
  unread: number;
}

export const NotificationModal = ({
  onClose,
  notifications,
  total,
  unread,
}: NotificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute top-12 right-0 bg-white rounded-[10px] shadow-lg w-[300px] md:w-[400px] border border-blue-300 z-50 animate-fade-in"
    >
      <div className="flex justify-between items-center p-4 border-b border-blue-300">
        <h3 className="font-bold text-lg text-blue-900">Notifications</h3>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">
          x
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-2 text-blue-900 font-semibold text-sm">
        <div className="flex gap-4">
          <button>All ({total})</button>
          <button>Unread ({unread})</button>
        </div>
        <button className="underline text-xs">Make all as read</button>
      </div>

      <div className="border-t border-blue-300 overflow-y-auto max-h-80">
        {notifications?.length > 0 ? (
          notifications?.map((notification, index) => {
            const createdAt = notification?.createdAt
              ? new Date(notification?.createdAt)
              : null;
            const timeAgo = createdAt
              ? formatDistanceToNow(createdAt, { addSuffix: true })
              : "";

            return (
              <div
                key={index}
                className="text-left px-4 py-3 border-b border-gray-100"
              >
                <h4 className="font-bold text-blue-900 text-sm">
                  {notification?.title}
                </h4>
                <p className="text-blue-900 text-xs">
                  {notification?.message} • {timeAgo}
                </p>
              </div>
            );
          })
        ) : (
          <p className="p-4 text-center text-gray-500 text-sm">
            No notifications
          </p>
        )}
      </div>
    </div>
  );
};
