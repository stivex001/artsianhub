import type { Addon } from "@/types/membership";

/** Prices from the UI design. Move to the API when the backend defines products. */
export const ADDONS: Addon[] = [
  {
    id: "spotlight",
    tag: "SPOTLIGHT",
    name: "Artisan Spotlight",
    prices: [{ amount: 49, unit: "standard" }],
    description: "A filmed interview, edited video, and multi-channel social promotion.",
    cta: "Book a Spotlight",
  },
  {
    id: "featured_listing",
    tag: "VISIBILITY",
    name: "Featured listing",
    prices: [
      { amount: 10, unit: "/week" },
      { amount: 30, unit: "/month" },
    ],
    description: "Priority placement on the homepage and in search results. Choose weekly or monthly.",
    cta: "Add featured listing",
  },
  {
    id: "verified_badge",
    tag: "TRUST",
    name: "Verified badge",
    prices: [{ amount: 15, unit: "one-off" }],
    description: "ID and address verification, plus a badge on your profile.",
    cta: "Get verified",
  },
  {
    id: "ai_assistant",
    tag: "COMING LATER",
    name: "AI Business Assistant",
    prices: [{ amount: 5, unit: "/month" }],
    description: "Draft social posts, quotes and customer replies. Launching Phase 4.",
    cta: "Coming soon",
    comingLater: true,
  },
];
