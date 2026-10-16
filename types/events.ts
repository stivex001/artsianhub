/**
 * Events contract (frontend-defined; backend to adapt).
 * Source: Events System Build Directive. Prices are GBP in pounds.
 *
 * Expected endpoints:
 *   GET  /events?type=&status=            -> Event[]
 *   GET  /events/:slug                    -> EventDetail
 *   POST /events/:id/interest             -> { email, name, phone? }
 *   POST /events/:id/bookings             -> CreateBookingInput -> BookingCheckout (native Stripe)
 *   GET  /me/events                       -> EventBooking[]
 *   GET  /events/community                -> CommunityEventSubmission[] (approved only)
 *   POST /events/community                -> CommunityEventSubmissionInput
 */

export type EventEntity = "mensayhub_ltd" | "artisanshub_cic";
/** Flagship expos vs curated workshops (Business Growth Series). */
export type EventType = "flagship" | "workshop";
export type EventStatus = "draft" | "published" | "past";
export type BookingType = "visitor_ticket" | "exhibitor_stand" | "sponsorship";
export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type EventPersonRole = "speaker" | "exhibitor" | "sponsor";
export type SponsorTier = "headline" | "gold" | "silver" | "community_partner";

/**
 * Per-event override of the global 50% member rule (e.g. Christmas Market).
 * Phase 3 should replace this and the member/non-member fields with a
 * proper `ticket_types` table.
 */
export interface PricingOverride {
  note: string;
  /** Price to join as a member AND get a stand in one transaction. */
  joinWithStandPrice: number;
  /** Stand-only price for non-members. */
  standOnlyPrice: number;
  standCap: number;
  standsRemaining: number;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  themeHeadline: string;
  entity: EventEntity;
  eventType: EventType;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  startTime: string;
  endTime: string;
  venueName: string;
  venueAddress: string;
  venueMapEmbedUrl?: string;
  descriptionShort: string;
  descriptionLong?: string;
  status: EventStatus;
  /** Price for members in GBP. null = free for members. */
  memberPrice: number | null;
  /** Price for non-members in GBP. null = not announced yet. */
  nonMemberPrice: number | null;
  /** What the price buys, e.g. "stand" or "ticket". */
  priceLabel?: string;
  /** What a standard booking is for; drives the CTA copy. */
  bookingType: BookingType;
  /** False = bookings not open yet; the page shows "Register your interest". */
  bookingOpen: boolean;
  /** ISO datetime. Before this, only members may book. */
  memberBookingOpensAt?: string;
  pricingOverride?: PricingOverride;
  metaTitle: string;
  metaDescription: string;
}

export interface EventAgendaItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  sortOrder: number;
}

export interface EventPerson {
  id: string;
  name: string;
  role: EventPersonRole;
  orgName?: string;
  logoUrl?: string;
  bio?: string;
  sortOrder: number;
}

export interface EventSponsor {
  id: string;
  sponsorName: string;
  tier: SponsorTier;
  logoUrl?: string;
  /** ISO date. Logo is hidden after this date; absent = until event archived. */
  displayUntil?: string;
}

export interface EventPostContent {
  galleryUrls: string[];
  spotlightVideoUrls: string[];
  resourcePackUrls: string[];
  /** 300–500 words; required for SEO. */
  writtenReport: string;
  exhibitorQuote?: string;
  quoteAttribution?: string;
}

export interface EventDetail extends Event {
  agenda: EventAgendaItem[];
  people: EventPerson[];
  sponsors: EventSponsor[];
  postContent?: EventPostContent;
}

/** A paid or free booking made through native Stripe checkout. */
export interface EventBooking {
  id: string;
  eventId: string;
  event?: Pick<Event, "slug" | "title" | "date" | "venueName">;
  /** null for non-member bookings. */
  memberId?: string | null;
  bookingType: BookingType;
  amountPaid: number;
  status: BookingStatus;
  createdAt: string;
  /** Stand details once an exhibitor_stand booking is confirmed. */
  standNumber?: string;
  /** Slides/recordings, populated once post-event content is published. */
  resourcePackUrls?: string[];
}

export type CommunitySubmissionStatus = "pending_review" | "approved" | "rejected";

export interface CommunityEventSubmissionInput {
  title: string;
  description: string;
  date: string;
  venue: string;
}

export interface CommunityEventSubmission extends CommunityEventSubmissionInput {
  id: string;
  submittedByUserId: string;
  status: CommunitySubmissionStatus;
  createdAt: string;
}

export interface EventInterestInput {
  name: string;
  email: string;
  phone?: string;
}

export interface CreateBookingInput {
  bookingType: BookingType;
  /** Christmas-Market style offer: activate membership and book in one go. */
  joinAsMember?: boolean;
}

/** Free bookings confirm immediately; paid ones return a Stripe Checkout URL. */
export interface BookingCheckout {
  bookingId: string;
  status: BookingStatus;
  checkoutUrl?: string;
}
