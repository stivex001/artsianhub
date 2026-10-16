"use client";

import Link from "next/link";
import { useEventViewer } from "@/apis/crud/events";
import { formatGBP, getEventPricing } from "@/lib/events/pricing";
import { BOOKING_CTA } from "@/lib/events/helpers";
import { MEMBERSHIP_FEE } from "@/lib/membership/constants";
import type { EventDetail } from "@/types/events";
import { BookButton } from "./BookButton";
import { InterestForm } from "./InterestForm";

const PriceCard = ({
  label,
  price,
  highlight,
  note,
}: {
  label: string;
  price: number | null;
  highlight?: boolean;
  note?: string;
}) => (
  <div
    className={`rounded-2xl border p-5 ${
      highlight ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-gray-200 bg-white"
    }`}
  >
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{label}</p>
    <p className="mt-1 text-3xl font-bold text-gray-900">{formatGBP(price)}</p>
    {note && <p className="mt-1 text-sm font-medium text-primary">{note}</p>}
  </div>
);

export const PricingPanel = ({ event }: { event: EventDetail }) => {
  const { isMember } = useEventViewer();
  const pricing = getEventPricing(event, { isMember });
  const o = pricing.override;
  const priced = pricing.viewerPrice !== null;

  return (
    <section aria-labelledby="tickets" className="space-y-5">
      <h2 id="tickets" className="text-2xl font-bold">
        {event.bookingType === "exhibitor_stand" ? "Stands" : "Tickets"}
      </h2>

      {o ? (
        <div className="grid gap-4 md:grid-cols-5">
          <div className="relative rounded-2xl border-2 border-primary bg-primary/5 p-6 md:col-span-3">
            <span className="absolute -top-3 left-5 rounded-full bg-[#F0C422] px-3 py-1 text-xs font-bold">
              Best Value
            </span>
            <p className="text-sm font-semibold text-primary">Join as a member + stand included</p>
            <p className="mt-1 text-4xl font-bold">{formatGBP(o.joinWithStandPrice)}</p>
            <p className="mt-1 text-sm text-gray-600">
              Save {formatGBP(o.joinSavings)} instantly. {event.pricingOverride?.note}
            </p>
            {pricing.canBook && !o.soldOut && !isMember && (
              <BookButton
                eventId={event.id}
                input={{ bookingType: "exhibitor_stand", joinAsMember: true }}
                label={`Join + reserve stand · ${formatGBP(o.joinWithStandPrice)}`}
                className="mt-4"
              />
            )}
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:col-span-2">
            <p className="text-sm font-semibold text-gray-600">Stand only, no membership</p>
            <p className="mt-1 text-2xl font-bold">{formatGBP(o.standOnlyPrice)}</p>
            {pricing.canBook && !o.soldOut && (
              <BookButton
                eventId={event.id}
                input={{ bookingType: "exhibitor_stand" }}
                label="Reserve stand only"
                variant="secondary"
                className="mt-4"
              />
            )}
          </div>
          <p className="text-sm font-medium text-gray-700 md:col-span-5">
            {o.soldOut
              ? "All stands are taken."
              : `Only ${event.pricingOverride?.standCap} stands available · ${o.standsRemaining} left`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <PriceCard label="Non-member" price={pricing.nonMemberPrice} />
          <PriceCard
            label="Member"
            price={pricing.memberPrice}
            highlight
            note={
              pricing.memberIsFree
                ? "Free for members"
                : pricing.memberSavings > 0
                  ? `Members save ${formatGBP(pricing.memberSavings)}`
                  : undefined
            }
          />
        </div>
      )}

      {!isMember && (
        <p className="text-sm text-gray-700">
          Members get the best prices on every event.{" "}
          <Link href="/membership" className="font-semibold text-primary underline">
            Not a member yet? Join for £{MEMBERSHIP_FEE}/year
          </Link>
        </p>
      )}

      {!o && pricing.canBook && (
        <BookButton
          eventId={event.id}
          input={{ bookingType: event.bookingType }}
          disabled={!priced}
          label={
            priced
              ? `${BOOKING_CTA[event.bookingType]} · ${formatGBP(pricing.viewerPrice)}`
              : "Price to be announced"
          }
        />
      )}

      {!pricing.canBook && pricing.isMemberEarlyAccess && (
        <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          Member early access is open now. Booking opens to everyone on{" "}
          {new Date(event.memberBookingOpensAt!).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
          })}
          .
        </p>
      )}

      {!pricing.canBook && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className="mb-1 font-semibold">Register your interest</h3>
          {!event.bookingOpen && (
            <p className="mb-3 text-sm text-gray-600">Bookings aren&apos;t open yet. Leave your details and we&apos;ll let you know.</p>
          )}
          <InterestForm eventId={event.id} title={event.title} />
        </div>
      )}
    </section>
  );
};
