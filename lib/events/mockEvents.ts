import type {
  CommunityEventSubmission,
  CommunityEventSubmissionInput,
  EventDetail,
  EventBooking,
} from "@/types/events";

/**
 * Placeholder fixtures used while the backend events API doesn't exist.
 * Mirrors the Business Growth Series in the UI design. Venues (other than the
 * first), descriptions, speakers and sponsors are NOT real: replace via the API.
 */
const TBC = "Venue to be confirmed";
const TBC_ADDRESS = "Address to be confirmed";

const series = (
  e: Omit<
    EventDetail,
    "entity" | "venueName" | "venueAddress" | "status" | "agenda" | "people" | "sponsors"
  > &
    Partial<Pick<EventDetail, "venueName" | "venueAddress" | "agenda" | "people" | "sponsors">>,
): EventDetail => ({
  entity: "artisanshub_cic",
  venueName: TBC,
  venueAddress: TBC_ADDRESS,
  status: "published",
  agenda: [],
  people: [],
  sponsors: [],
  ...e,
});

export const MOCK_EVENTS: EventDetail[] = [
  series({
    id: "evt-expo-launch-2026",
    slug: "artisans-biz-expo-launch-2026",
    title: "Artisans & Biz Expo — Launch Edition",
    themeHeadline: "Connecting local talent with local opportunities",
    eventType: "flagship",
    date: "2026-11-28",
    startTime: "10:00",
    endTime: "16:00",
    venueName: "Chesterfield Artisan Market",
    venueAddress: "Chesterfield, Derbyshire",
    descriptionShort:
      "Our flagship launch day: stands, talks and networking for local artisans and the people who buy from them.",
    memberPrice: 45,
    nonMemberPrice: null,
    priceLabel: "stand",
    bookingType: "exhibitor_stand",
    bookingOpen: true,
    metaTitle: "Artisans & Biz Expo — Launch Edition | 28 November",
    metaDescription:
      "Reserve a stand at the ArtisansHub Artisans & Biz Expo Launch Edition on 28 November 2026 in Chesterfield. Members pay £45.",
    agenda: [
      { id: "a1", time: "10:00", title: "Doors open", sortOrder: 1 },
      { id: "a2", time: "11:00", title: "Opening welcome", sortOrder: 2 },
    ],
    people: [
      { id: "p1", name: "Sample Speaker", role: "speaker", orgName: "Sample Org", sortOrder: 1 },
    ],
    sponsors: [{ id: "s1", sponsorName: "Sample Headline Sponsor", tier: "headline" }],
  }),
  series({
    id: "evt-christmas-market-2026",
    slug: "christmas-market-2026",
    title: "ArtisansHub Christmas Market",
    themeHeadline: "Handmade gifts from local makers",
    eventType: "flagship",
    date: "2026-11-28",
    startTime: "10:00",
    endTime: "16:00",
    descriptionShort: "A festive market of handmade goods from our artisans.",
    memberPrice: 25,
    nonMemberPrice: 35,
    priceLabel: "stand",
    bookingType: "exhibitor_stand",
    bookingOpen: true,
    pricingOverride: {
      note: "One-off introductory offer: join as a member and get a stand in one go.",
      joinWithStandPrice: 25,
      standOnlyPrice: 35,
      standCap: 25,
      standsRemaining: 25,
    },
    metaTitle: "ArtisansHub Christmas Market | 28 November",
    metaDescription:
      "Book a stand at the ArtisansHub Christmas Market on 28 November 2026. Join as a member from £25 and your stand is included.",
  }),
  series({
    id: "evt-summit-2027",
    slug: "business-growth-summit-2027",
    title: "Business Growth Summit",
    themeHeadline: "From skilled artisan to successful business owner",
    eventType: "workshop",
    date: "2027-02-21",
    startTime: "10:00",
    endTime: "16:00",
    descriptionShort: "A day of practical sessions on growing an artisan business.",
    memberPrice: null,
    nonMemberPrice: null,
    priceLabel: "ticket",
    bookingType: "visitor_ticket",
    bookingOpen: false,
    metaTitle: "Business Growth Summit | 21 February 2027",
    metaDescription:
      "Business Growth Summit on 21 February 2027: from skilled artisan to successful business owner. Free for members.",
  }),
  series({
    id: "evt-funding-bootcamp-2027",
    slug: "funding-grants-bootcamp-2027",
    title: "Funding & Grants Bootcamp",
    themeHeadline: "Finding money to grow your business",
    eventType: "workshop",
    date: "2027-04-17",
    startTime: "10:00",
    endTime: "15:00",
    descriptionShort: "Learn where grants and funding come from and how to apply.",
    memberPrice: 10,
    nonMemberPrice: null,
    priceLabel: "ticket",
    bookingType: "visitor_ticket",
    bookingOpen: false,
    metaTitle: "Funding & Grants Bootcamp | 17 April 2027",
    metaDescription:
      "Funding & Grants Bootcamp on 17 April 2027: finding money to grow your business. Members pay £10.",
  }),
  series({
    id: "evt-compliance-clinic-2027",
    slug: "compliance-legal-clinic-2027",
    title: "Compliance & Legal Clinic",
    themeHeadline: "Build your business the right way",
    eventType: "workshop",
    date: "2027-06-19",
    startTime: "10:00",
    endTime: "15:00",
    descriptionShort: "One-to-one and group guidance on the rules every maker should know.",
    memberPrice: null,
    nonMemberPrice: null,
    priceLabel: "ticket",
    bookingType: "visitor_ticket",
    bookingOpen: false,
    metaTitle: "Compliance & Legal Clinic | 19 June 2027",
    metaDescription:
      "Compliance & Legal Clinic on 19 June 2027: build your business the right way. Free for members.",
  }),
  series({
    id: "evt-expo-2027",
    slug: "artisans-biz-expo-2027",
    title: "Artisans & Biz Expo 2027",
    themeHeadline: "Celebrating local enterprise",
    eventType: "flagship",
    date: "2027-09-18",
    startTime: "10:00",
    endTime: "17:00",
    descriptionShort: "Our biggest day of the year, with 500+ attendees expected.",
    memberPrice: null,
    nonMemberPrice: null,
    priceLabel: "stand",
    bookingType: "exhibitor_stand",
    bookingOpen: false,
    metaTitle: "Artisans & Biz Expo 2027 | 18 September",
    metaDescription:
      "Artisans & Biz Expo 2027 on 18 September: celebrating local enterprise. Register your interest.",
  }),
];

export const MOCK_BOOKINGS: EventBooking[] = [
  {
    id: "bkg-1",
    eventId: "evt-expo-launch-2026",
    event: {
      slug: "artisans-biz-expo-launch-2026",
      title: "Artisans & Biz Expo — Launch Edition",
      date: "2026-11-28",
      venueName: "Chesterfield Artisan Market",
    },
    memberId: "mock-user",
    bookingType: "exhibitor_stand",
    amountPaid: 45,
    status: "confirmed",
    createdAt: "2026-10-01T09:00:00Z",
    standNumber: "A12",
  },
];

/** In-memory only; resets on reload. Pending items are never listed publicly. */
const mockSubmissions: CommunityEventSubmission[] = [
  {
    id: "com-1",
    submittedByUserId: "mock-user",
    title: "Beginner Woodworking Workshop",
    description: "A hands-on Saturday workshop run by a local carpenter.",
    date: "2026-11-07",
    venue: "Community Hall (sample)",
    status: "approved",
    createdAt: "2026-09-20T10:00:00Z",
  },
];

export const getApprovedMockSubmissions = () =>
  mockSubmissions.filter((s) => s.status === "approved");

export const addMockSubmission = (
  input: CommunityEventSubmissionInput,
  userId: string,
): CommunityEventSubmission => {
  const sub: CommunityEventSubmission = {
    ...input,
    id: `com-${mockSubmissions.length + 1}`,
    submittedByUserId: userId,
    status: "pending_review",
    createdAt: new Date().toISOString(),
  };
  mockSubmissions.push(sub);
  return sub;
};
