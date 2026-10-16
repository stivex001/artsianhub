"use client";

import Link from "next/link";
import { useEventViewer } from "@/apis/crud/events";
import { BOOKING_CTA, eventPath } from "@/lib/events/helpers";
import { formatGBP, getEventPricing } from "@/lib/events/pricing";
import type { Event } from "@/types/events";

const dateParts = (iso: string) => {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "numeric", timeZone: "UTC" }).format(d),
    month: new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).format(d),
  };
};

/** One row per Business Growth Series event. */
export const EventRow = ({ event }: { event: Event }) => {
  const { isMember } = useEventViewer();
  const p = getEventPricing(event, { isMember });
  const o = p.override;
  const { day, month } = dateParts(event.date);
  const flagship = event.eventType === "flagship";

  return (
    <article className="grid grid-cols-[70px_1fr] items-center gap-x-5 gap-y-2 border-b py-6 md:grid-cols-[110px_1fr_150px_150px]">
      <div>
        <p className="text-3xl font-bold leading-none">{day}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">{month}</p>
      </div>

      <div>
        {flagship && (
          <span className="mb-1.5 inline-block rounded bg-[#F0C422] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-black">
            Flagship
          </span>
        )}
        <h2 className="text-lg font-bold">
          <Link href={eventPath(event.slug)} className="hover:underline">
            {event.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-600">{event.themeHeadline}</p>
      </div>

      <div className="col-start-2 text-sm md:col-start-auto">
        {o ? (
          <>
            <p className="font-semibold">{formatGBP(o.joinWithStandPrice)}</p>
            <p className="text-xs text-gray-500">join + stand</p>
          </>
        ) : event.memberPrice === null || event.memberPrice === 0 ? (
          <>
            <p className="font-semibold">Free</p>
            <p className="text-xs text-gray-500">members</p>
          </>
        ) : (
          <>
            <p className="font-semibold">{formatGBP(p.memberPrice)}</p>
            <p className="text-xs text-gray-500">members{event.priceLabel ? ` · ${event.priceLabel}` : ""}</p>
          </>
        )}
      </div>

      <div className="col-start-2 md:col-start-auto">
        <Link
          href={eventPath(event.slug)}
          className="inline-flex rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5"
        >
          {event.bookingOpen ? BOOKING_CTA[event.bookingType] : "Register interest"}
        </Link>
      </div>
    </article>
  );
};
