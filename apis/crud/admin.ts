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
// Message returned by GET /admin/tickets/:id → data.messages[]
export interface TicketMessage {
  _id: string;
  ticketId: string;
  senderId: string;
  senderRole: string;
  message: string;
  internal: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  _id: string;
  /** Human-readable ID, e.g. "TKT-OV-FSCHV" */
  ticketId: string;
  raisedById: string;
  raisedByRole: "client" | "artisan";
  bookingId: string | null;
  category: TicketCategory;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedAdminId: { _id: string; name: string; email: string } | null;
  resolutionSummary: string;
  escalatedToSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TicketDetailResponse {
  data: {
    ticket: Ticket;
    messages: TicketMessage[];
  };
}

export interface TicketsResponse {
  data: Ticket[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface OutreachPayload {
  recipientId: string;
  recipientRole: "artisan" | "client";
  messageType: string;
  subject: string;
  message: string;
}

export interface OutreachResult {
  _id: string;
  recipientId: string;
  recipientRole: string;
  adminId: string;
  messageType: string;
  subject: string;
  message: string;
  createdAt: string;
}

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
export interface ClientNote {
  _id: string;
  entityType?: string;
  entityId?: string;
  content: string;
  adminId: string;
  adminName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClientBooking {
  _id: string;
  clientId: string;
  artisanId: string;
  location?: string;
  description?: string;
  preferredDate?: string;
  preferredTime?: string;
  preferredDateTime?: string;
  email?: string;
  images?: string[];
  status: BookingStatus;
  escalatedToSuperAdmin?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ClientProfile {
  _id: string;
  userId: {
    _id: string;
    email: string;
    isVerified?: boolean;
    createdAt: string;
  };
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  country?: string;
  gender?: string;
  dateOfBirth?: string;
  accountStatus: UserStatus;
  suspensionReason?: string;
  profilePicture?: string;
  profilePicturePublicId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClientDetailResponse {
  data: {
    client: ClientProfile;
    recentBookings: ClientBooking[];
    internalNotes: ClientNote[];
  };
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

/** Shape returned in the list endpoint (clientId/artisanId are shallow) */
export interface Booking {
  _id: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  description?: string;
  location?: string;
  preferredDate?: string;
  preferredTime?: string;
  preferredDateTime?: string;
  email?: string;
  images?: string[];
  escalatedToSuperAdmin?: boolean;
  clientId?: { _id: string; firstName: string; lastName: string };
  artisanId?: {
    _id: string;
    firstName: string;
    lastName: string;
    professionalTitle?: string;
  };
}

/** Populated client shape inside a booking detail */
export interface BookingDetailClient {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  city?: string;
  profilePicture?: string;
  accountStatus?: UserStatus;
  createdAt?: string;
}

/** Populated artisan shape inside a booking detail */
export interface BookingDetailArtisan {
  _id: string;
  firstName: string;
  lastName: string;
  professionalTitle?: string;
  primaryLocation?: string;
  profilePicture?: string;
  accountStatus?: ArtisanAccountStatus;
}

/** Full booking object returned by the detail endpoint */
export interface BookingDetail extends Omit<Booking, "clientId" | "artisanId"> {
  clientId?: BookingDetailClient;
  artisanId?: BookingDetailArtisan;
}

export interface BookingNote {
  _id: string;
  entityType: string;
  entityId: string;
  adminId: string;
  adminName: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BookingFollowUp {
  _id: string;
  bookingId: string;
  adminId: string;
  type: FollowUpType;
  status?: string;
  note: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BookingDetailResponse {
  data: {
    booking: BookingDetail;
    internalNotes: BookingNote[];
    followUps: BookingFollowUp[];
  };
}

export interface BookingsResponse {
  data: Booking[];
  total?: number;
  page?: number;
  limit?: number;
}

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
// ADMIN MANAGEMENT (Super Admin only)
// ─────────────────────────────────────────────────────────────────────────────
export type AdminRole = "ADMIN" | "SUPER_ADMIN";
export type AdminStatus = "active" | "suspended" | "removed";

export interface AdminMember {
  _id: string;
  name: string;
  email: string;
  role: AdminRole;
  roleLabel?: string;
  status: AdminStatus;
  twoFactorEnabled: boolean;
  emailNotificationPreferences: {
    high: boolean;
    medium: boolean;
    low: boolean;
  };
  lastLogin?: string;
  lastActivity?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminBody {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  roleLabel?: string;
}

export interface UpdateAdminBody {
  roleLabel?: string;
  status?: AdminStatus;
}

export interface ActivityLog {
  _id: string;
  adminId: string;
  adminName: string;
  adminEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  note: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown> | null;
  timestamp: string;
}

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
import { BASE_URL } from "@/constants";
import { useAuthStore } from "@/store/authStore";

export const downloadReport = (type: "bookings" | "artisans" | "clients" | "reviews" | "tickets") => {
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
