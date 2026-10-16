"use client";

import { useState } from "react";
import { useEvents } from "@/apis/crud/events";
import { sortUpcoming } from "@/lib/events/helpers";
import { EventRow } from "./EventRow";

type Filter = "all" | "flagship" | "workshop" | "free";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All events" },
  { id: "flagship", label: "Flagship expos" },
  { id: "workshop", label: "Workshops" },
  { id: "free", label: "Free for members" },
];

export const EventsHub = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const { data, isLoading, isError, refetch } = useEvents();

  const events = sortUpcoming(data ?? []).filter((e) =>
    filter === "all"
      ? true
      : filter === "free"
        ? e.memberPrice === null || e.memberPrice === 0
        : e.eventType === filter,
  );

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium ${
      active ? "border-primary bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <div className="space-y-6">
      <div role="group" aria-label="Filter events" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" className={chip(filter === f.id)} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      ) : isError ? (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
          We couldn&apos;t load events.{" "}
          <button type="button" className="font-semibold underline" onClick={() => refetch()}>
            Try again
          </button>
        </p>
      ) : events.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-gray-600">No events match this filter right now.</p>
      ) : (
        <div className="border-t">
          {events.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
};
