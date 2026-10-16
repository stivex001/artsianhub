import type { Event } from "@/types/events";

export interface EventViewer {
  isMember: boolean;
}

export interface EventPricing {
  /** null = not announced. */
  nonMemberPrice: number | null;
  /** 0 = free for members. */
  memberPrice: number;
  memberIsFree: boolean;
  /** Price this viewer actually pays; null if not announced for them. */
  viewerPrice: number | null;
  /** What a member saves versus the non-member price (0 if unknown). */
  memberSavings: number;
  /** False before memberBookingOpensAt for non-members, or when bookings are closed. */
  canBook: boolean;
  /** True while the early-access window is still closed to the public. */
  isMemberEarlyAccess: boolean;
  /** Present only for events with a per-event override. */
  override?: {
    joinWithStandPrice: number;
    standOnlyPrice: number;
    /** Saving of join + stand versus buying a stand only. */
    joinSavings: number;
    standsRemaining: number;
    soldOut: boolean;
  };
}

const roundPence = (n: number) => Math.round(n * 100) / 100;

/**
 * Single source of truth for member pricing and booking gates.
 * Components must not compute prices themselves.
 * Member prices are explicit per event (null = free), not a flat discount.
 */
export const getEventPricing = (
  event: Pick<
    Event,
    | "memberPrice"
    | "nonMemberPrice"
    | "bookingOpen"
    | "memberBookingOpensAt"
    | "pricingOverride"
  >,
  viewer: EventViewer,
  now: Date = new Date(),
): EventPricing => {
  const memberPrice = event.memberPrice ?? 0;
  const nonMemberPrice = event.nonMemberPrice;

  const opensAt = event.memberBookingOpensAt
    ? new Date(event.memberBookingOpensAt)
    : null;
  const isMemberEarlyAccess = !!opensAt && now < opensAt;
  const canBook =
    event.bookingOpen && (viewer.isMember || !isMemberEarlyAccess);

  const o = event.pricingOverride;

  return {
    nonMemberPrice,
    memberPrice,
    memberIsFree: memberPrice === 0,
    viewerPrice: viewer.isMember ? memberPrice : nonMemberPrice,
    memberSavings:
      nonMemberPrice === null ? 0 : Math.max(0, roundPence(nonMemberPrice - memberPrice)),
    canBook,
    isMemberEarlyAccess,
    override: o && {
      joinWithStandPrice: o.joinWithStandPrice,
      standOnlyPrice: o.standOnlyPrice,
      joinSavings: roundPence(o.standOnlyPrice - o.joinWithStandPrice),
      standsRemaining: o.standsRemaining,
      soldOut: o.standsRemaining <= 0,
    },
  };
};

export const formatGBP = (amount: number | null) =>
  amount === null
    ? "TBC"
    : amount === 0
      ? "Free"
      : new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        }).format(amount);
