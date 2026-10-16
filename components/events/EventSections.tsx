import {
  SPONSOR_TIER_LABEL,
  getPeopleByRole,
  getVisibleSponsors,
  groupSponsorsByTier,
} from "@/lib/events/helpers";
import type { EventDetail } from "@/types/events";

/* eslint-disable @next/next/no-img-element */

export const Agenda = ({ agenda }: { agenda: EventDetail["agenda"] }) => {
  if (!agenda.length) return null;
  return (
    <section aria-labelledby="agenda">
      <h2 id="agenda" className="mb-4 text-2xl font-bold">Programme</h2>
      <ol className="divide-y rounded-2xl border bg-white">
        {[...agenda]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((item) => (
            <li key={item.id} className="flex gap-4 p-4">
              <span className="w-16 shrink-0 font-semibold text-primary">{item.time}</span>
              <div>
                <p className="font-medium">{item.title}</p>
                {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
              </div>
            </li>
          ))}
      </ol>
    </section>
  );
};

const PEOPLE_GROUPS = [
  { role: "speaker", title: "Speakers" },
  { role: "exhibitor", title: "Exhibitors" },
] as const;

export const People = ({ people }: { people: EventDetail["people"] }) => {
  const groups = PEOPLE_GROUPS.map((g) => ({ ...g, items: getPeopleByRole(people, g.role) })).filter(
    (g) => g.items.length,
  );
  if (!groups.length) return null;
  return (
    <>
      {groups.map((g) => (
        <section key={g.role} aria-label={g.title}>
          <h2 className="mb-4 text-2xl font-bold">{g.title}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {g.items.map((p) => (
              <li key={p.id} className="flex gap-3 rounded-2xl border bg-white p-4">
                {p.logoUrl && <img src={p.logoUrl} alt="" className="h-12 w-12 rounded-lg object-contain" />}
                <div>
                  <p className="font-semibold">{p.name}</p>
                  {p.orgName && <p className="text-sm text-gray-500">{p.orgName}</p>}
                  {p.bio && <p className="mt-1 text-sm text-gray-600">{p.bio}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

export const Sponsors = ({ sponsors }: { sponsors: EventDetail["sponsors"] }) => {
  const groups = groupSponsorsByTier(getVisibleSponsors(sponsors));
  if (!groups.length) return null;
  return (
    <section aria-labelledby="sponsors">
      <h2 id="sponsors" className="mb-4 text-2xl font-bold">Sponsors</h2>
      <div className="space-y-6">
        {groups.map(({ tier, sponsors: list }) => (
          <div key={tier}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
              {SPONSOR_TIER_LABEL[tier]}
            </h3>
            <ul className="flex flex-wrap items-center gap-4">
              {list.map((s) => (
                <li
                  key={s.id}
                  className={`flex items-center justify-center rounded-xl border bg-white p-4 text-center font-medium ${
                    tier === "headline" ? "h-32 w-full sm:w-72" : "h-20 w-40 text-sm"
                  }`}
                >
                  {s.logoUrl ? (
                    <img src={s.logoUrl} alt={s.sponsorName} className="max-h-full max-w-full object-contain" />
                  ) : (
                    s.sponsorName
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export const VenueMap = ({ event }: { event: Pick<EventDetail, "venueMapEmbedUrl" | "venueName"> }) =>
  event.venueMapEmbedUrl ? (
    <section aria-labelledby="venue">
      <h2 id="venue" className="mb-4 text-2xl font-bold">Venue</h2>
      <iframe
        src={event.venueMapEmbedUrl}
        title={`Map of ${event.venueName}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full rounded-2xl border-0"
      />
    </section>
  ) : null;
