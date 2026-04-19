import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { BASE_URL } from "@/constants";
import { useAuthStore } from "@/store/authStore";

export * from "./adminConstants";
export * from "./adminTypes";

import type {
  AnalyticsOverview,
  TicketDetailResponse,
  TicketsResponse,
  OutreachPayload,
  OutreachResult,
  ClientDetailResponse,
  ClientsResponse,
  ArtisanAccountStatus,
  ArtisanVerificationStatus,
  AdminArtisanDetailResponse,
  AdminArtisansResponse,
  ReviewsResponse,
  BookingNote,
  BookingFollowUp,
  BookingDetailResponse,
  BookingsResponse,
  SubscriptionsResponse,
  AdminNotificationsResponse,
  AdminMember,
  CreateAdminBody,
  UpdateAdminBody,
  ActivityLog,
} from "./adminTypes";

import type {
  UserStatus,
  TicketCategory,
  TicketPriority,
  TicketStatus,
  ReviewStatus,
  BookingStatus,
  FollowUpType,
} from "./adminConstants";

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminAnalytics = () => {
  const getOverview = () =>
    useApiQuery<{ data: AnalyticsOverview }>(["admin_analytics_overview"], {
      url: `/admin/analytics/overview`,
      method: "GET",
    });

  return { getOverview };
};

// ─────────────────────────────────────────────────────────────────────────────
// SUPPORT TICKETS
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminTickets = () => {
  const getAllTickets = (params?: { status?: TicketStatus; page?: number; limit?: number }) =>
    useApiQuery<TicketsResponse>(
      ["admin_tickets", params],
      { url: `/admin/tickets`, method: "GET", params },
      { enabled: true }
    );

  const getTicketById = (id: string) =>
    useApiQuery<TicketDetailResponse>(
      ["admin_ticket", id],
      { url: `/admin/tickets/${id}`, method: "GET" },
      { enabled: !!id }
    );

  const assignTicket = (id: string) =>
    useApiMutation<{ success: boolean }, { assignedAdminId: string }>({
      url: `/admin/tickets/${id}/assign`,
      method: "PATCH",
    });

  const replyToTicket = (id: string) =>
    useApiMutation<{ success: boolean }, { message: string; internal: boolean }>({
      url: `/admin/tickets/${id}/reply`,
      method: "POST",
    });

  const updateTicketStatus = (id: string) =>
    useApiMutation<{ success: boolean }, { status: TicketStatus; resolutionSummary?: string }>({
      url: `/admin/tickets/${id}/status`,
      method: "PATCH",
    });

  const createOutreach = () =>
    useApiMutation<{ success: boolean; data: OutreachResult }, OutreachPayload>({
      url: `/admin/tickets/outreach`,
      method: "POST",
    });

  const createTicket = () =>
    useApiMutation<{ success: boolean }, {
      subject: string;
      category: TicketCategory;
      message: string;
      priority: TicketPriority;
    }>({
      url: `/tickets`,
      method: "POST",
    });

  return {
    getAllTickets,
    getTicketById,
    assignTicket,
    replyToTicket,
    updateTicketStatus,
    createOutreach,
    createTicket,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// USER MODERATION — CLIENTS
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminClients = () => {
  const getAllClients = (params?: { page?: number; limit?: number; search?: string }) =>
    useApiQuery<ClientsResponse>(
      ["admin_clients", params],
      { url: `/admin/clients`, method: "GET", params },
      { enabled: true }
    );

  const getClientById = (id: string) =>
    useApiQuery<ClientDetailResponse>(
      ["admin_client", id],
      { url: `/admin/clients/${id}`, method: "GET" },
      { enabled: !!id }
    );

  const updateClientStatus = (id: string) =>
    useApiMutation<{ success: boolean }, { accountStatus: UserStatus; reason?: string }>({
      url: `/admin/clients/${id}/status`,
      method: "PATCH",
    });

  const addClientNote = (id: string) =>
    useApiMutation<{ success: boolean }, { content: string }>({
      url: `/admin/clients/${id}/notes`,
      method: "POST",
    });

  return { getAllClients, getClientById, updateClientStatus, addClientNote };
};

// ─────────────────────────────────────────────────────────────────────────────
// USER MODERATION — ARTISANS
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminArtisans = () => {
  const getAdminArtisans = (params?: {
    page?: number;
    limit?: number;
    status?: ArtisanAccountStatus;
    search?: string;
    verificationStatus?: ArtisanVerificationStatus;
  }) =>
    useApiQuery<AdminArtisansResponse>(
      ["admin_artisans", params],
      { url: `/admin/artisans`, method: "GET", params },
      { enabled: true }
    );

  const getAdminArtisanById = (id: string) =>
    useApiQuery<AdminArtisanDetailResponse>(
      ["admin_artisan", id],
      { url: `/admin/artisans/${id}`, method: "GET" },
      { enabled: !!id }
    );

  const updateArtisanStatus = (id: string) =>
    useApiMutation<{ success: boolean }, { accountStatus: ArtisanAccountStatus; reason?: string }>({
      url: `/admin/artisans/${id}/status`,
      method: "PATCH",
    });

  const verifyArtisan = (id: string) =>
    useApiMutation<{ success: boolean }, { status: ArtisanVerificationStatus; note?: string }>({
      url: `/admin/artisans/${id}/verify`,
      method: "PATCH",
    });

  const addArtisanNote = (id: string) =>
    useApiMutation<{ success: boolean }, { content: string }>({
      url: `/admin/artisans/${id}/notes`,
      method: "POST",
    });

  const toggleFeatured = (id: string) =>
    useApiMutation<{ success: boolean }, { featured: boolean }>({
      url: `/admin/artisans/${id}/feature`,
      method: "PATCH",
    });

  return {
    getAdminArtisans,
    getAdminArtisanById,
    updateArtisanStatus,
    verifyArtisan,
    addArtisanNote,
    toggleFeatured,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW MODERATION
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminReviews = () => {
  const getAllReviews = (params?: { status?: ReviewStatus; page?: number; limit?: number }) =>
    useApiQuery<ReviewsResponse>(
      ["admin_reviews", params],
      { url: `/admin/reviews`, method: "GET", params },
      { enabled: true }
    );

  const updateReviewStatus = (id: string) =>
    useApiMutation<{ success: boolean }, { status: ReviewStatus; note?: string }>({
      url: `/admin/reviews/${id}/status`,
      method: "PATCH",
    });

  const respondToReview = (id: string) =>
    useApiMutation<{ success: boolean }, { response: string }>({
      url: `/admin/reviews/${id}/respond`,
      method: "POST",
    });

  return { getAllReviews, updateReviewStatus, respondToReview };
};

// ─────────────────────────────────────────────────────────────────────────────
// BOOKINGS & ENGAGEMENTS
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminBookings = () => {
  const getAllBookings = (params?: { status?: BookingStatus; page?: number; limit?: number }) =>
    useApiQuery<BookingsResponse>(
      ["admin_bookings", params],
      { url: `/admin/bookings`, method: "GET", params },
      { enabled: true }
    );

  const getBookingById = (id: string) =>
    useApiQuery<BookingDetailResponse>(
      ["admin_booking", id],
      { url: `/admin/bookings/${id}`, method: "GET" },
      { enabled: !!id }
    );

  const updateBookingStatus = (id: string) =>
    useApiMutation<{ success: boolean }, { status: BookingStatus; note?: string }>({
      url: `/admin/bookings/${id}/status`,
      method: "PATCH",
    });

  const addBookingNote = (id: string) =>
    useApiMutation<{ data: BookingNote }, { content: string }>({
      url: `/admin/bookings/${id}/notes`,
      method: "POST",
    });

  const addFollowUp = (id: string) =>
    useApiMutation<{ data: BookingFollowUp }, { type: FollowUpType; note: string }>({
      url: `/admin/bookings/${id}/follow-up`,
      method: "POST",
    });

  return { getAllBookings, getBookingById, updateBookingStatus, addBookingNote, addFollowUp };
};

// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminSubscriptions = () => {
  const getAllSubscriptions = () =>
    useApiQuery<SubscriptionsResponse>(
      ["admin_subscriptions"],
      { url: `/admin/subscriptions`, method: "GET" },
      { enabled: true }
    );

  const extendSubscription = (artisanId: string) =>
    useApiMutation<{ success: boolean }, { days: number; note?: string }>({
      url: `/admin/subscriptions/${artisanId}/extend`,
      method: "PATCH",
    });

  const flagRefund = (artisanId: string) =>
    useApiMutation<{ success: boolean }, { refundFlag: boolean; note?: string }>({
      url: `/admin/subscriptions/${artisanId}/refund-flag`,
      method: "PATCH",
    });

  return { getAllSubscriptions, extendSubscription, flagRefund };
};

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminNotifications = () => {
  const getNotifications = (unreadOnly = false, enabled = true) =>
    useApiQuery<AdminNotificationsResponse>(
      ["admin_notifications", unreadOnly],
      {
        url: `/admin/notifications`,
        method: "GET",
        params: unreadOnly ? { unreadOnly: true } : undefined,
      },
      { enabled }
    );

  const markAsRead = (id: string) =>
    useApiMutation<{ success: boolean }, undefined>({
      url: `/admin/notifications/${id}/read`,
      method: "PATCH",
    });

  const markAllAsRead = () =>
    useApiMutation<{ success: boolean }, undefined>({
      url: `/admin/notifications/read-all`,
      method: "PATCH",
    });

  return { getNotifications, markAsRead, markAllAsRead };
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN MANAGEMENT (Super Admin only)
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminManagement = () => {
  const getAllAdmins = () =>
    useApiQuery<{ success: boolean; data: AdminMember[] }>(
      ["admin_members"],
      { url: "/admin/admins", method: "GET" },
      { enabled: true }
    );

  const createAdmin = () =>
    useApiMutation<{ success: boolean; data: AdminMember }, CreateAdminBody>({
      url: "/admin/admins",
      method: "POST",
    });

  const updateAdmin = (id: string) =>
    useApiMutation<{ success: boolean; data: AdminMember }, UpdateAdminBody>({
      url: `/admin/admins/${id}`,
      method: "PATCH",
    });

  const getAdminActivity = (id: string) =>
    useApiQuery<{ success: boolean; data: ActivityLog[] }>(
      ["admin_activity", id],
      { url: `/admin/admins/${id}/activity`, method: "GET" },
      { enabled: !!id }
    );

  return { getAllAdmins, createAdmin, updateAdmin, getAdminActivity };
};

// ─────────────────────────────────────────────────────────────────────────────
// CSV EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export const downloadReport = (type: "bookings" | "artisans" | "clients" | "reviews" | "tickets") => {
  const token = useAuthStore.getState().accessToken;
  const url = `${BASE_URL}/admin/reports/export?type=${type}`;
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", `${type}_report.csv`);
  fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.blob())
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    });
};
