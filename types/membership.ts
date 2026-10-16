/**
 * Membership contract (frontend-defined; backend to adapt).
 *
 * Expected endpoint:
 *   GET /settings/platform -> PlatformSettings
 */

/** Single global config object, not per member. */
export interface PlatformSettings {
  /** ISO date of actual go-live. null until confirmed. */
  launchDate: string | null;
  /** launchDate + FOUNDING_OFFER_MONTHS. null until launchDate is set. */
  foundingOfferEndsAt: string | null;
}

export type AddonId = "spotlight" | "featured_listing" | "verified_badge" | "ai_assistant";

export interface AddonPrice {
  amount: number;
  /** e.g. "standard", "/week", "/month", "one-off" */
  unit: string;
}

export interface Addon {
  id: AddonId;
  tag: string;
  name: string;
  prices: AddonPrice[];
  description: string;
  cta: string;
  /** Not purchasable yet. */
  comingLater?: boolean;
}
