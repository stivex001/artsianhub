import { cache } from "react";
import { BASE_URL } from "@/constants";
import { USE_MOCK_DATA } from "@/lib/mockMode";
import { MOCK_EVENTS } from "@/lib/events/mockEvents";
import type { Event, EventDetail } from "@/types/events";

const USE_MOCK = USE_MOCK_DATA;

/** Server-side event lookup, deduped across generateMetadata and the page. */
export const getEventBySlug = cache(
  async (slug: string): Promise<EventDetail | null> => {
    if (USE_MOCK) return MOCK_EVENTS.find((e) => e.slug === slug) ?? null;
    try {
      const res = await fetch(`${BASE_URL}/events/${slug}`, {
        next: { revalidate: 300 },
      });
      if (!res.ok) return null;
      return (await res.json()) as EventDetail;
    } catch {
      return null;
    }
  },
);

/** Server-side list of all published and past events (for sitemap). */
export const getAllEventsServer = cache(async (): Promise<Event[]> => {
  if (USE_MOCK) return MOCK_EVENTS;
  try {
    const res = await fetch(`${BASE_URL}/events`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return (await res.json()) as Event[];
  } catch {
    return [];
  }
});
