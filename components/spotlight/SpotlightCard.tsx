import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import type { FeaturedArtisan } from "@/lib/artisans/featured";

/* eslint-disable @next/next/no-img-element */

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/** Card for a real artisan; links to their public profile. */
export const SpotlightCard = ({ artisan }: { artisan: FeaturedArtisan }) => (
  <Link
    href={`/artisan-details/${artisan.id}`}
    className="group block overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md"
  >
    <div className="relative aspect-[4/3] bg-primary/10">
      {artisan.imageUrl ? (
        <img src={artisan.imageUrl} alt={artisan.name} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden className="flex h-full w-full items-center justify-center text-4xl font-bold text-primary/40">
          {initials(artisan.name)}
        </span>
      )}
    </div>
    <div className="p-4">
      <p className="flex items-center gap-1.5 font-semibold group-hover:underline">
        {artisan.name}
        {artisan.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-label="Verified" />}
      </p>
      {artisan.title && <p className="text-sm text-gray-600">{artisan.title}</p>}
      {artisan.location && <p className="text-xs text-gray-500">{artisan.location}</p>}
    </div>
  </Link>
);
