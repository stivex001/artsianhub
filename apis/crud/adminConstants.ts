// ─────────────────────────────────────────────────────────────────────────────
// DB ENUM CONSTANTS (prevents 500 errors by matching backend enum values)
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

// ─────────────────────────────────────────────────────────────────────────────
// DERIVED TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type UserStatus = (typeof USER_STATUSES)[number];
export type TicketCategory = (typeof TICKET_CATEGORIES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];
export type TicketStatus = (typeof TICKET_STATUSES)[number];
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export type FollowUpType = (typeof FOLLOW_UP_TYPES)[number];
