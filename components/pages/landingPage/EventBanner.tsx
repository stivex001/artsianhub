import Link from "next/link";
import { BOOKING_CTA, eventPath } from "@/lib/events/helpers";
import type { Event } from "@/types/events";

/** Promotes the next flagship event; hidden when there isn't one. */
export const EventBanner = ({ event }: { event: Event | null }) => {
  if (!event) return null;
  const d = new Date(event.date);
  const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", timeZone: "UTC" }).format(d);
  const month = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" }).format(d).toUpperCase();

  return (
    <section aria-label="Next event" className="mx-auto max-w-7xl px-4 pb-14">
      <div className="flex flex-col gap-4 rounded-2xl border border-l-4 border-l-[#F0C422] bg-primary/5 p-6 sm:flex-row sm:items-center">
        <p className="min-w-[90px] text-lg font-bold leading-tight text-primary">
          {day}
          <br />
          {month}
        </p>
        <div className="flex-1">
          <h3 className="text-lg font-bold">{event.title}</h3>
          <p className="text-sm text-gray-600">
            {event.venueName} · {event.themeHeadline}
          </p>
        </div>
        <Link
          href={eventPath(event.slug)}
          className="inline-flex justify-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5"
        >
          {event.bookingOpen ? BOOKING_CTA[event.bookingType] : "Register interest"}
        </Link>
      </div>
    </section>
  );
};
