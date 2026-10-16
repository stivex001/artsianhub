import { CalendarDays, Clock, MapPin } from "lucide-react";
import { EVENT_TYPE_LABEL, formatEventDate } from "@/lib/events/helpers";
import type { EventDetail } from "@/types/events";

export const EventHero = ({ event, past }: { event: EventDetail; past: boolean }) => (
  <header className="rounded-3xl bg-primary px-6 py-10 text-white md:px-12 md:py-14">
    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest">
      <span className="rounded-full bg-white/15 px-3 py-1">{EVENT_TYPE_LABEL[event.eventType]}</span>
      {past && <span className="rounded-full bg-[#F0C422] px-3 py-1 text-black">Past event</span>}
    </div>
    <h1 className="text-3xl font-bold md:text-5xl">{event.title}</h1>
    <p className="mt-3 max-w-2xl text-lg text-white/85">{event.themeHeadline}</p>
    <ul className="mt-6 grid gap-3 text-sm md:grid-cols-3">
      <li className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 shrink-0" />
        {formatEventDate(event.date)}
      </li>
      <li className="flex items-center gap-2">
        <Clock className="h-4 w-4 shrink-0" />
        {event.startTime} – {event.endTime}
      </li>
      <li className="flex items-center gap-2">
        <MapPin className="h-4 w-4 shrink-0" />
        {event.venueName}, {event.venueAddress}
      </li>
    </ul>
  </header>
);
