import Link from "next/link";
import { FOUNDING_OFFER_MONTHS, MEMBERSHIP_FEE } from "@/lib/membership/constants";
import { formatFoundingEnd, isFoundingOfferActive } from "@/lib/membership/founding";
import type { PlatformSettings } from "@/types/membership";

const BENEFITS = [
  "Business profile",
  "Search visibility",
  "Location listing",
  "Customer enquiries",
  "Reviews",
  "Direct messaging",
  "Access to events",
  "Eligibility for promotions",
];

const STEPS = [
  "Create your business profile",
  "Add your craft, location and photos",
  "Get discovered in search and at events",
  `Renew at £${MEMBERSHIP_FEE}/year after your free period`,
];

export const MembershipPlan = ({ settings }: { settings: PlatformSettings }) => {
  const active = isFoundingOfferActive(settings.foundingOfferEndsAt);
  const end = settings.foundingOfferEndsAt;

  return (
    <section aria-labelledby="plan" className="grid gap-9 rounded-2xl border bg-white p-6 md:grid-cols-[1fr_1px_1fr] md:p-9">
      <div>
        {active && (
          <p className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {end
              ? `Founding offer: free until ${formatFoundingEnd(end)}`
              : `Founding offer: free for our first ${FOUNDING_OFFER_MONTHS} months`}
          </p>
        )}
        <h2 id="plan" className="text-xl font-bold">ArtisansHub Membership</h2>
        <p className="mt-2 text-4xl font-bold">
          £{MEMBERSHIP_FEE}
          <span className="text-base font-normal text-gray-500">
            /year{active ? " after your free period" : ""}
          </span>
        </p>
        <p className="mt-1 text-sm text-gray-600">
          About £{MEMBERSHIP_FEE / 12} a month. Billed annually, with no monthly plan.
        </p>
        <ul className="my-5 grid gap-x-5 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <li key={b} className="relative py-1.5 pl-5 text-sm before:absolute before:left-0 before:top-3 before:h-2 before:w-2 before:rounded-full before:bg-green-700">
              {b}
            </li>
          ))}
        </ul>
        <Link href="/auth/signup" className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">
          Join ArtisansHub
        </Link>
      </div>

      <div className="hidden bg-gray-200 md:block" aria-hidden />

      <div>
        <h3 className="mb-3 font-bold">How joining works</h3>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-600">
          {STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </section>
  );
};
