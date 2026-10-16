import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface NotificationData {
  title: string;
  user: string;
  message: string;
  read: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationResponse {
  data: {
    notifications: NotificationData[];
    totalNotification: number;
  };
}

type UseNotificationOptions = {
  /** When false, notification fetch is skipped (e.g. when user is not logged in). Default true. */
  notificationsEnabled?: boolean;
};

export const useNotification = (options?: UseNotificationOptions) => {
  const enabled = options?.notificationsEnabled ?? true;

  const getAllNotifications = () =>
    useApiQuery<NotificationResponse>(
      ["notification"],
      {
        url: `/notifications`,
        method: "GET",
      },
      { enabled }
    );

  const markAllNotification = useApiMutation<AuthResponse, any>({
    url: "/notifications/mark-all-read-notification",
    method: "PUT",
  });

  const markAllSingleNotification = (id: string) =>
    useApiMutation<AuthResponse, any>({
      url: `/notifications/mark-read-notification/${id}`,
      method: "PUT",
    });

  return {
    getAllNotifications,
    markAllNotification,
    markAllSingleNotification,
  };
};
