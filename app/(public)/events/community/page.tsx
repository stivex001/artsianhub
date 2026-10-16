import type { Metadata } from "next";
import { CommunityEventsList } from "@/components/events/CommunityEventsList";

export const metadata: Metadata = {
  title: "Community Events",
  description: "Workshops and events run by artisans in the ArtisansHub community.",
  alternates: { canonical: "/events/community/" },
};

const CommunityEventsPage = () => (
  <main className="bg-[#F9FAFB]">
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:py-14">
      <header className="max-w-2xl space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl">Community events</h1>
        <p className="text-gray-600">Workshops and meetups submitted by artisans like you.</p>
      </header>
      <CommunityEventsList />
    </div>
  </main>
);

export default CommunityEventsPage;
