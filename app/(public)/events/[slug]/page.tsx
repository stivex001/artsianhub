import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailView } from "@/components/events/EventDetailView";
import { buildEventJsonLd, eventPath } from "@/lib/events/helpers";
import { getEventBySlug } from "@/lib/events/serverEvents";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found", robots: { index: false } };

  // Unique per-event copy. Past events stay indexed permanently.
  return {
    title: event.metaTitle,
    description: event.metaDescription,
    alternates: { canonical: eventPath(event.slug) },
    openGraph: { title: event.metaTitle, description: event.metaDescription, type: "website" },
    twitter: { card: "summary_large_image", title: event.metaTitle, description: event.metaDescription },
  };
}

const EventPage = async ({ params }: Props) => {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event || event.status === "draft") notFound();

  return (
    <main className="bg-[#F9FAFB]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildEventJsonLd(event)) }}
      />
      <EventDetailView event={event} />
    </main>
  );
};

export default EventPage;
