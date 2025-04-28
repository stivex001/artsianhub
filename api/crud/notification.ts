import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface NotificationData {
  email: string;
  name: string;
  message: string;
  mode: string;
  phone: string;
  _id: string;
  createdAt: Date;
}

export interface NotificationResponse {
  notifications:NotificationData[]
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
  }
}

export const useNotification = () => {
  const getAllNotifications = () =>
    useApiQuery<NotificationResponse>(["notification"], {
      url: `/notification`,
      method: "GET",
    });

  const archiveNotification = useApiMutation<AuthResponse, FormData>({
    url: "/notification/archive",
    method: "POST",
  });

  return {
    getAllNotifications,
    archiveNotification,
  };
};
