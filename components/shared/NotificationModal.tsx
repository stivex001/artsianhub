"use client";

import { useNotification } from "@/api/crud/notification";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./Spinner";

interface NotificationModalProps {
  onClose: () => void;
  notifications: any[];
  total: any;
}

export const NotificationModal = ({
  onClose,
  notifications,
  total,
}: NotificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const [selectedId, setSelectedId] = useState("");

  const {
    getAllNotifications,
    markAllNotification,
    markAllSingleNotification,
  } = useNotification();

  const { refetch } = getAllNotifications();
  const { mutate, isPending: markAllPending } = markAllNotification;
  const { mutate: markSingle, isPending } = markAllSingleNotification(
    `${selectedId}`
  );

  const unreadNotifications = notifications.filter((n) => !n?.read);
  const readNotifications = notifications?.filter((n) => n?.read);
  const unreadCount = unreadNotifications?.length;

  const getVisibleNotifications = () => {
    if (activeTab === "unread") return unreadNotifications;
    if (activeTab === "read") return readNotifications;
    return notifications;
  };

  // Close modal only when clicking outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const visibleNotifications = getVisibleNotifications();

  const handleReadMessage = (id: string) => {
    setSelectedId(id);
    try {
      markSingle(
        {},
        {
          onSuccess: (response: any) => {
            console.log(response);
            refetch();
            setSelectedId("");
          },
          onError: (error: any) => {
            console.log(error);
            toast.error(error?.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAllMessage = () => {
    try {
      mutate(
        {},
        {
          onSuccess: (response: any) => {
            console.log(response, "resududu");
            refetch();
          },
          onError: (error: any) => {
            console.log(error);
            toast.error(error?.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className="
    absolute top-12 -right-20 lg:right-4 
    bg-white rounded-[10px] shadow-lg 
    w-[90vw] max-w-sm sm:max-w-md 
    border border-blue-300 
    z-50 animate-fade-in
  "
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-blue-300">
        <h3 className="font-bold text-lg text-blue-900">Notifications</h3>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">
          ×
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between px-4 py-2 text-blue-900 font-semibold text-sm">
        <div className="flex gap-4">
          <button
            className={activeTab === "all" ? "underline" : ""}
            onClick={() => setActiveTab("all")}
          >
            All ({total})
          </button>
          <button
            className={activeTab === "read" ? "underline" : ""}
            onClick={() => setActiveTab("read")}
          >
            Read ({readNotifications.length})
          </button>
          <button
            className={activeTab === "unread" ? "underline" : ""}
            onClick={() => setActiveTab("unread")}
          >
            Unread ({unreadCount})
          </button>
        </div>
        <button onClick={handleMarkAllMessage} className="underline text-xs">
          {markAllPending ? <Spinner /> : "Mark all as read"}
        </button>
      </div>

      {/* Notifications list */}
      <div className="border-t border-blue-300 overflow-y-auto max-h-80">
        {visibleNotifications?.length > 0 ? (
          visibleNotifications?.map((notification) => {
            const createdAt = notification?.createdAt
              ? new Date(notification?.createdAt)
              : null;
            const timeAgo = createdAt
              ? formatDistanceToNow(createdAt, { addSuffix: true })
              : "";

            return (
              <div
                key={notification?._id}
                onClick={() => handleReadMessage(notification?._id)}
                className={`px-4 py-3 text-left border-b border-gray-100 my-2 cursor-pointer ${
                  !notification?.read ? "bg-blue-50 font-semibold" : "bg-white"
                }`}
              >
                <h4 className="font-bold text-blue-900 text-sm">
                  {notification?.title}
                </h4>
                <p
                  className="text-blue-900 text-xs"
                  dangerouslySetInnerHTML={{
                    __html: `${notification?.message} • ${timeAgo}`,
                  }}
                />
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
