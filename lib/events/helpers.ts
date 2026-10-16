import type {
  BookingType,
  EventDetail,
  EventType,
  EventPerson,
  EventSponsor,
  SponsorTier,
} from "@/types/events";

export const SPONSOR_TIER_ORDER: SponsorTier[] = [
  "headline",
  "gold",
  "silver",
  "community_partner",
];

export const SPONSOR_TIER_LABEL: Record<SponsorTier, string> = {
  headline: "Headline Sponsor",
  gold: "Gold Sponsors",
  silver: "Silver Sponsors",
  community_partner: "Community Partners",
};

/** Drops sponsors whose display window has ended (end of the displayUntil day). */
export const getVisibleSponsors = (
  sponsors: EventSponsor[],
  now: Date = new Date(),
) =>
  sponsors.filter((s) => {
    if (!s.displayUntil) return true;
    const end = new Date(s.displayUntil);
    end.setUTCHours(23, 59, 59, 999);
    return now <= end;
  });

export const groupSponsorsByTier = (sponsors: EventSponsor[]) =>
  SPONSOR_TIER_ORDER.map((tier) => ({
    tier,
    sponsors: sponsors.filter((s) => s.tier === tier),
  })).filter((g) => g.sponsors.length > 0);

export const getPeopleByRole = (people: EventPerson[], role: EventPerson["role"]) =>
  people.filter((p) => p.role === role).sort((a, b) => a.sortOrder - b.sortOrder);

/** Post-event state: explicitly marked past, or post-event content exists. */
export const isEventPast = (event: Pick<EventDetail, "status" | "postContent">) =>
  event.status === "past" || !!event.postContent;

export const formatEventDate = (isoDate: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));

export const SITE_URL = "https://artisanshub.org";

export const eventPath = (slug: string) => `/events/${slug}/`;

export const buildEventJsonLd = (event: EventDetail) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.title,
  description: event.metaDescription,
  startDate: `${event.date}T${event.startTime}`,
  endDate: `${event.date}T${event.endTime}`,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: event.venueName,
    address: event.venueAddress,
  },
  url: `${SITE_URL}${eventPath(event.slug)}`,
  ...(event.nonMemberPrice !== null && {
    offers: {
      "@type": "Offer",
      price: event.nonMemberPrice,
      priceCurrency: "GBP",
      availability: event.bookingOpen
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  }),
});

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  flagship: "Flagship expo",
  workshop: "Workshop",
};

/** Upcoming first, soonest date first. Past events are excluded from the hub. */
export const sortUpcoming = <T extends { date: string; status: string }>(events: T[]) =>
  events
    .filter((e) => e.status !== "past" && e.status !== "draft")
    .sort((a, b) => a.date.localeCompare(b.date));

/**
 * Event to promote on the home page: the soonest upcoming flagship,
 * preferring ones that are open for booking.
 */
export const pickFeaturedEvent = <
  T extends { date: string; status: string; eventType: string; bookingOpen: boolean },
>(
  events: T[],
): T | null => {
  const flagships = sortUpcoming(events).filter((e) => e.eventType === "flagship");
  return flagships.find((e) => e.bookingOpen) ?? flagships[0] ?? null;
};

/** Call-to-action copy per booking type. Kept here (not in a client module) so server components can use it. */
export const BOOKING_CTA: Record<BookingType, string> = {
  visitor_ticket: "Get ticket",
  exhibitor_stand: "Reserve stand",
  sponsorship: "Sponsor",
};
