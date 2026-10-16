import { getVisibleSponsors, groupSponsorsByTier, isEventPast, pickFeaturedEvent, sortUpcoming } from "./helpers";
import type { EventSponsor } from "@/types/events";

const s = (id: string, tier: EventSponsor["tier"], displayUntil?: string): EventSponsor => ({
  id,
  sponsorName: id,
  tier,
  displayUntil,
});

describe("sponsor display windows", () => {
  const now = new Date("2026-10-05T12:00:00Z");
  it("hides sponsors past displayUntil, keeps the rest", () => {
    const out = getVisibleSponsors(
      [s("old", "gold", "2026-10-04"), s("today", "gold", "2026-10-05"), s("open", "silver")],
      now,
    );
    expect(out.map((x) => x.id)).toEqual(["today", "open"]);
  });
  it("groups by tier in priority order and omits empty tiers", () => {
    const g = groupSponsorsByTier([s("a", "silver"), s("b", "headline")]);
    expect(g.map((x) => x.tier)).toEqual(["headline", "silver"]);
  });
});

describe("isEventPast", () => {
  it("is past when status is past or post content exists", () => {
    expect(isEventPast({ status: "past" })).toBe(true);
    expect(isEventPast({ status: "published" })).toBe(false);
  });
});

describe("sortUpcoming", () => {
  it("drops past and draft events and sorts by date", () => {
    const out = sortUpcoming([
      { id: "b", date: "2026-11-28", status: "published" },
      { id: "old", date: "2026-01-01", status: "past" },
      { id: "d", date: "2026-12-01", status: "draft" },
      { id: "a", date: "2026-11-14", status: "published" },
    ]);
    expect(out.map((e) => e.id)).toEqual(["a", "b"]);
  });
});

describe("pickFeaturedEvent", () => {
  const e = (id: string, date: string, eventType: string, bookingOpen: boolean, status = "published") => ({
    id, date, eventType, bookingOpen, status,
  });
  it("prefers the soonest flagship that is open for booking", () => {
    const out = pickFeaturedEvent([
      e("workshop", "2026-11-01", "workshop", true),
      e("later-open", "2027-09-18", "flagship", true),
      e("sooner-closed", "2026-11-28", "flagship", false),
    ]);
    expect(out?.id).toBe("later-open");
  });
  it("falls back to the soonest flagship when none are open", () => {
    expect(pickFeaturedEvent([e("a", "2027-09-18", "flagship", false), e("b", "2026-11-28", "flagship", false)])?.id).toBe("b");
  });
  it("returns null when there is no upcoming flagship", () => {
    expect(pickFeaturedEvent([e("w", "2026-11-01", "workshop", true), e("p", "2025-01-01", "flagship", true, "past")])).toBeNull();
  });
});
