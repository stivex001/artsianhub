import type { Metadata } from "next";
import { EventsHub } from "@/components/events/EventsHub";

export const metadata: Metadata = {
  title: "Business Growth Series",
  description:
    "ArtisansHub's annual calendar of flagship expos and curated workshops. Members get the best prices on every event.",
  alternates: { canonical: "/events/" },
};

const EventsPage = () => (
  <main className="bg-[#F9FAFB]">
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:py-14">
      <header className="max-w-2xl space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl">Business Growth Series</h1>
        <p className="text-gray-600">Members get the best prices on every event.</p>
      </header>
      <EventsHub />
    </div>
  </main>
);

export default EventsPage;
