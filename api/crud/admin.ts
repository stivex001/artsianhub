import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

// ─────────────────────────────────────────────────────────────────────────────
// DB ENUM CONSTANTS (prevents 500 errors)
// ─────────────────────────────────────────────────────────────────────────────
export const USER_STATUSES = ["active", "suspended", "banned"] as const;
export const TICKET_CATEGORIES = [
  "general_enquiry",
  "booking_issue",
  "payment_issue",
  "account_issue",
  "dispute",
  "other",
] as const;
export const TICKET_PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export const TICKET_STATUSES = [
  "open",
  "in_progress",
  "waiting_on_user",
  "resolved",
  "closed",
] as const;
export const REVIEW_STATUSES = [
  "pending",
  "approved",
  "removed",
  "flagged",
] as const;
export const BOOKING_STATUSES = [
  "Pending",
  "Accepted",
  "Declined",
  "Rescheduled",
  "In Progress",
  "Completed",
  "Cancelled (Client)",
  "Cancelled (Artisan)",
  "No Show (Artisan)",
  "No Show (Client)",
] as const;
export const FOLLOW_UP_TYPES = [
  "review_request",
  "completion_check",
  "retention",
  "satisfaction_check",
] as const;

export type UserStatus = (typeof USER_STATUSES)[number];
export type TicketCategory = (typeof TICKET_CATEGORIES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];
export type TicketStatus = (typeof TICKET_STATUSES)[number];
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export type FollowUpType = (typeof FOLLOW_UP_TYPES)[number];

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────
export interface AnalyticsOverview {
  totalRevenue: number;
  totalBookings: number;
  totalArtisans: number;
  totalClients: number;
  totalActiveSubscriptions: number;
  revenueGrowth?: number;
  bookingsGrowth?: number;
  newUsersThisMonth?: number;
}

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
export interface TicketReply {
  _id: string;
  message: string;
  internal: boolean;
  createdAt: string;
  author?: { name: string; role: string };
}

export interface Ticket {
  _id: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  assignedTo?: { _id: string; name: string; email: string };
  replies?: TicketReply[];
}

export interface TicketsResponse {
  data: Ticket[];
  total: number;
  page: number;
  limit: number;
}

export const useAdminTickets = () => {
  const getAllTickets = (params?: { status?: TicketStatus; page?: number; limit?: number }) =>
    useApiQuery<TicketsResponse>(
      ["admin_tickets", params],
      { url: `/admin/tickets`, method: "GET", params },
      { enabled: true }
    );

  const getTicketById = (id: string) =>
    useApiQuery<{ data: Ticket }>(
      ["admin_ticket", id],
      { url: `/admin/tickets/${id}`, method: "GET" },
      { enabled: !!id }
    );

  const assignTicket = (id: string) =>
    useApiMutation<{ success: boolean }, { adminId: string }>({
      url: `/admin/tickets/${id}/assign`,
      method: "PATCH",
    });

  const replyToTicket = (id: string) =>
    useApiMutation<{ success: boolean }, { message: string; internal: boolean }>({
      url: `/admin/tickets/${id}/reply`,
      method: "POST",
    });

  const updateTicketStatus = (id: string) =>
    useApiMutation<{ success: boolean }, { status: TicketStatus }>({
      url: `/admin/tickets/${id}/status`,
      method: "PATCH",
    });

  return {
    getAllTickets,
    getTicketById,
    assignTicket,
    replyToTicket,
    updateTicketStatus,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// USER MODERATION — CLIENTS
// ─────────────────────────────────────────────────────────────────────────────
export interface ClientProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender?: string;
  dateOfBirth?: string;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
  profilePicture?: string;
  bookings?: any[];
}

export interface ClientsResponse {
  data: ClientProfile[];
  total: number;
  page: number;
  limit: number;
}

export const useAdminClients = () => {
  const getAllClients = (params?: { page?: number; limit?: number; search?: string }) =>
    useApiQuery<ClientsResponse>(
      ["admin_clients", params],
      { url: `/admin/clients`, method: "GET", params },
      { enabled: true }
    );

  const getClientById = (id: string) =>
    useApiQuery<{ data: ClientProfile }>(
      ["admin_client", id],
      { url: `/admin/clients/${id}`, method: "GET" },
      { enabled: !!id }
    );

  const updateClientStatus = (id: string) =>
    useApiMutation<{ success: boolean }, { status: UserStatus; reason?: string }>({
      url: `/admin/clients/${id}/status`,
      method: "PATCH",
    });

  return { getAllClients, getClientById, updateClientStatus };
};

// ─────────────────────────────────────────────────────────────────────────────
// USER MODERATION — ARTISANS (admin-specific actions)
// ─────────────────────────────────────────────────────────────────────────────
export type ArtisanAccountStatus = "active" | "suspended" | "banned";
export type ArtisanVerificationStatus = "verified" | "unverified";

export interface AdminArtisan {
  _id: string;
  userId: { _id: string; email: string; role?: string; createdAt: string };
  firstName: string;
  lastName: string;
  gender?: string;
  dateOfBirth?: string;
  professionalTitle: string;
  skillDescription?: string;
  primaryLocation: string;
  state?: string;
  country?: string;
  serviceCategories: { _id: string; name: string }[];
  subCategories?: string[];
  profilePicture: string;
  accountStatus: ArtisanAccountStatus;
  verificationStatus: ArtisanVerificationStatus;
  isSubscribed: boolean;
  isVerified: boolean;
  featuredOnHomepage: boolean;
  refundFlag: boolean;
  refundFlagNote?: string;
  suspensionReason?: string;
  pricePerHour: number;
  workDistanceKm?: number;
  serviceRadius?: string;
  workingDaysAndHours?: { day: string; startTime: string; endTime: string; _id: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface InternalNote {
  _id: string;
  entityType: string;
  entityId: string;
  adminId: string;
  adminName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminArtisanDetailResponse {
  data: {
    artisan: AdminArtisan;
    recentBookings: any[];
    internalNotes: InternalNote[];
  };
}

export interface AdminArtisansResponse {
  data: AdminArtisan[];
  page: number;
  limit: number;
  total: number;
}

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
export interface Review {
  _id: string;
  status: ReviewStatus;
  rating: number;
  comment: string;
  createdAt: string;
  clientId?: { _id: string; firstName: string; lastName: string; email: string };
  artisanId?: {
    _id: string;
    firstName: string;
    lastName: string;
    professionalTitle?: string;
  };
  officialResponse?: string;
  note?: string;
}

export interface ReviewsResponse {
  data: Review[];
  total: number;
  page: number;
  limit: number;
}

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
export interface Booking {
  _id: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  clientId?: { _id: string; firstName: string; lastName: string; email: string };
  artisanId?: {
    _id: string;
    firstName: string;
    lastName: string;
    professionalTitle?: string;
  };
  serviceType?: string;
  totalAmount?: number;
  notes?: Array<{ note: string; createdAt: string; createdBy?: string }>;
  followUps?: Array<{
    type: FollowUpType;
    note: string;
    createdAt: string;
  }>;
}

export interface BookingsResponse {
  data: Booking[];
  total: number;
  page: number;
  limit: number;
}

export const useAdminBookings = () => {
  const getAllBookings = (params?: { status?: BookingStatus; page?: number; limit?: number }) =>
    useApiQuery<BookingsResponse>(
      ["admin_bookings", params],
      { url: `/admin/bookings`, method: "GET", params },
      { enabled: true }
    );

  const getBookingById = (id: string) =>
    useApiQuery<{ data: Booking }>(
      ["admin_booking", id],
      { url: `/admin/bookings/${id}`, method: "GET" },
      { enabled: !!id }
    );

  const addBookingNote = (id: string) =>
    useApiMutation<{ success: boolean }, { note: string }>({
      url: `/admin/bookings/${id}/notes`,
      method: "POST",
    });

  const addFollowUp = (id: string) =>
    useApiMutation<{ success: boolean }, { type: FollowUpType; note: string }>({
      url: `/admin/bookings/${id}/follow-up`,
      method: "POST",
    });

  return { getAllBookings, getBookingById, addBookingNote, addFollowUp };
};

// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────────────────────────────────────
export const useAdminSubscriptions = () => {
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

  return { extendSubscription, flagRefund };
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────
export interface AdminNotification {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type?: string;
  relatedId?: string;
}

export interface AdminNotificationsResponse {
  data: AdminNotification[];
  total: number;
  unreadCount: number;
}

export const useAdminNotifications = () => {
  const getNotifications = (unreadOnly = false) =>
    useApiQuery<AdminNotificationsResponse>(
      ["admin_notifications", unreadOnly],
      {
        url: `/admin/notifications`,
        method: "GET",
        params: unreadOnly ? { unreadOnly: true } : undefined,
      },
      { enabled: true }
    );

  const markAsRead = (id: string) =>
    useApiMutation<{ success: boolean }, void>({
      url: `/admin/notifications/${id}/read`,
      method: "PATCH",
    });

  const markAllAsRead = () =>
    useApiMutation<{ success: boolean }, void>({
      url: `/admin/notifications/read-all`,
      method: "PATCH",
    });

  return { getNotifications, markAsRead, markAllAsRead };
};

// ─────────────────────────────────────────────────────────────────────────────
// CSV EXPORT
// ─────────────────────────────────────────────────────────────────────────────
import { BASE_URL } from "@/constants";
import { useAuthStore } from "@/store/authStore";

export const downloadReport = (type: "bookings" | "artisans" | "clients" | "reviews") => {
  const token = useAuthStore.getState().accessToken;
  const url = `${BASE_URL}/admin/reports/export?type=${type}`;
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", `${type}_report.csv`);
  // Add auth header via fetch if needed, or direct anchor works for simple CSV streams
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
