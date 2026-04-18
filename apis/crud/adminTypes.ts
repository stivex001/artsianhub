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

export interface AnalyticsOverview {
  platformOverview: {
    totalRevenue: number;
    totalBookings: number;
    totalClients: number;
    activeSubscriptions: number;
  };
  artisanOverview: {
    totalArtisans: number;
    activeArtisans: number;
    suspendedArtisans: number;
    bannedArtisans: number;
  };
  clientOverview: {
    totalClients: number;
    activeClients: number;
    suspendedClients: number;
    bannedClients: number;
  };
  appointmentActivity: {
    totalAppointments: number;
    accepted: number;
    declined: number;
    completed: number;
  };
  analytics: {
    revenueBreakdown: {
      totalRevenue: number;
      totalSubscriptions: number;
    };
    artisanDistribution: {
      active: number;
      suspended: number;
      banned: number;
    };
  };
  reviewSummary: {
    totalReviews: number;
    pending: number;
    approved: number;
    flagged: number;
    removed: number;
  };
  openTickets: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPPORT TICKETS
// ─────────────────────────────────────────────────────────────────────────────

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
  recipientIds: string[];
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

// ─────────────────────────────────────────────────────────────────────────────
// CLIENTS
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

// ─────────────────────────────────────────────────────────────────────────────
// ARTISANS (admin-specific)
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

// ─────────────────────────────────────────────────────────────────────────────
// REVIEWS
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

// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────────────────────────────────────

export type SubscriptionStatus = "active" | "expired" | "cancelled" | "past_due";
export type SubscriptionPlanType = "monthly" | "annual" | "first_3_months_annual" | string;

export interface Subscription {
  _id: string;
  artisanId: string;
  userId: { _id: string; email: string };
  planType: SubscriptionPlanType;
  status: SubscriptionStatus;
  autoRenew: boolean;
  cancelAtPeriodEnd: boolean;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  gracePeriodEnd?: string | null;
  isActive: boolean;
  stripeCustomerId?: string;
  stripePriceId?: string;
  stripeSubscriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionsResponse {
  success: boolean;
  data: Subscription[];
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface AdminNotification {
  _id: string;
  adminId: string | null;
  targetRole: string;
  eventType: string;
  priority: "low" | "medium" | "high";
  entityType: string;
  entityId: string;
  title: string;
  message: string;
  read: boolean;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminNotificationsResponse {
  data: AdminNotification[];
  unreadCount?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN MANAGEMENT
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
