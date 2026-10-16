"use client";

import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { useCommunityEvents } from "@/apis/crud/events";
import { formatEventDate } from "@/lib/events/helpers";

export const CommunityEventsList = () => {
  const { data, isLoading, isError, refetch } = useCommunityEvents();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F0C422]/20 p-5">
        <p className="text-sm text-gray-800">Running a workshop or event? Share it with the community.</p>
        <Link
          href="/events/community/submit"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white"
        >
          Submit your event
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2" aria-busy="true">
          {[0, 1].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      ) : isError ? (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
          We couldn&apos;t load community events.{" "}
          <button type="button" className="font-semibold underline" onClick={() => refetch()}>
            Try again
          </button>
        </p>
      ) : !data?.length ? (
        <p className="rounded-xl bg-white p-8 text-center text-gray-600">No community events yet. Be the first to submit one.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {[...data]
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((e) => (
              <article key={e.id} className="rounded-2xl border bg-white p-5">
                <h2 className="text-lg font-bold">{e.title}</h2>
                <p className="mt-1 text-sm text-gray-600">{e.description}</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    {formatEventDate(e.date)}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {e.venue}
                  </li>
                </ul>
              </article>
            ))}
        </div>
      )}
    </div>
  );
};
