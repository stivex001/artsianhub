"use client";

import Link from "next/link";
import { useMyEvents } from "@/apis/crud/events";
import { eventPath, formatEventDate } from "@/lib/events/helpers";
import { formatGBP } from "@/lib/events/pricing";
import type { BookingType } from "@/types/events";

const BOOKING_LABEL: Record<BookingType, string> = {
  visitor_ticket: "Visitor ticket",
  exhibitor_stand: "Exhibitor stand",
  sponsorship: "Sponsorship",
};

export const MyEventsList = () => {
  const { data, isLoading, isError, refetch } = useMyEvents();

  if (isLoading) {
    return (
      <div className="space-y-3" aria-busy="true">
        {[0, 1].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-200" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
        We couldn&apos;t load your events.{" "}
        <button type="button" className="font-semibold underline" onClick={() => refetch()}>
          Try again
        </button>
      </p>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <p className="text-gray-600">You haven&apos;t registered for any events yet.</p>
        <Link href="/events" className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white">
          Browse events
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {data.map((r) => (
        <li key={r.id} className="rounded-2xl border bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">{r.event?.title ?? "Event"}</h2>
              {r.event && (
                <p className="text-sm text-gray-600">
                  {formatEventDate(r.event.date)} · {r.event.venueName}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-700">
                {BOOKING_LABEL[r.bookingType]} · {formatGBP(r.amountPaid)} ·{" "}
                <span className="capitalize">{r.status}</span>
              </p>
            </div>
            {r.event && (
              <Link href={eventPath(r.event.slug)} className="text-sm font-semibold text-primary underline">
                View event
              </Link>
            )}
          </div>

          {r.bookingType === "exhibitor_stand" && r.status === "confirmed" && (
            <p className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-900">
              Stand confirmed{r.standNumber && <> · Stand {r.standNumber}</>}
            </p>
          )}

          {!!r.resourcePackUrls?.length && (
            <div className="mt-3">
              <p className="text-sm font-semibold">Resources</p>
              <ul className="mt-1 space-y-1 text-sm">
                {r.resourcePackUrls.map((url, i) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      Resource {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
