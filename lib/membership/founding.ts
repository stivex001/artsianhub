import { FOUNDING_OFFER_MONTHS } from "./constants";

/** launchDate + n months (UTC), clamping to the last day of shorter months. */
export const addMonths = (isoDate: string, months: number): string => {
  const d = new Date(isoDate);
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, lastDay));
  return d.toISOString().slice(0, 10);
};

export const computeFoundingEnd = (launchDate: string | null): string | null =>
  launchDate ? addMonths(launchDate, FOUNDING_OFFER_MONTHS) : null;

/** The offer is live until its end date; unknown dates are treated as live. */
export const isFoundingOfferActive = (
  foundingOfferEndsAt: string | null,
  now: Date = new Date(),
): boolean => {
  if (!foundingOfferEndsAt) return true;
  const end = new Date(foundingOfferEndsAt);
  end.setUTCHours(23, 59, 59, 999);
  return now <= end;
};

export const formatFoundingEnd = (isoDate: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
