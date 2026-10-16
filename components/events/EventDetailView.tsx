import { isEventPast } from "@/lib/events/helpers";
import type { EventDetail } from "@/types/events";
import { EventHero } from "./EventHero";
import { PricingPanel } from "./PricingPanel";
import { PostEventContent } from "./PostEventContent";
import { Agenda, People, Sponsors, VenueMap } from "./EventSections";
import { ShareButtons, SponsorshipCta } from "./ShareAndSponsor";

/** Reusable template for every event; also renders the post-event state. */
export const EventDetailView = ({ event }: { event: EventDetail }) => {
  const past = isEventPast(event);
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-8 md:py-12">
      <EventHero event={event} past={past} />

      <section className="space-y-3">
        <p className="text-lg text-gray-800">{event.descriptionShort}</p>
        {event.descriptionLong && <p className="text-gray-600">{event.descriptionLong}</p>}
      </section>

      {!past && <PricingPanel event={event} />}

      <Agenda agenda={event.agenda} />
      <People people={event.people} />
      <Sponsors sponsors={event.sponsors} />
      <VenueMap event={event} />

      {event.postContent && <PostEventContent content={event.postContent} />}

      <ShareButtons slug={event.slug} title={event.title} />
      {!past && <SponsorshipCta title={event.title} />}
    </div>
  );
};
