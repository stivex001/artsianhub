"use client";

import Link from "next/link";
import { Link2 } from "lucide-react";
import { toast } from "sonner";
import { SITE_URL, eventPath } from "@/lib/events/helpers";

export const ShareButtons = ({ slug, title }: { slug: string; title: string }) => {
  const url = encodeURIComponent(`${SITE_URL}${eventPath(slug)}`);
  const text = encodeURIComponent(title);
  const btn = "rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50";
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this event">
      <span className="mr-1 text-sm font-semibold">Share:</span>
      <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
        Facebook
      </a>
      <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${text}%20${url}`}>
        WhatsApp
      </a>
      {/* Instagram has no web share URL: copy the link to paste into a post or story. */}
      <button
        type="button"
        className={`${btn} inline-flex items-center gap-1`}
        onClick={() => {
          navigator.clipboard?.writeText(decodeURIComponent(url));
          toast.success("Link copied. Paste it into Instagram.");
        }}
      >
        <Link2 className="h-4 w-4" /> Instagram
      </button>
    </div>
  );
};

export const SponsorshipCta = ({ title }: { title: string }) => (
  <section className="rounded-2xl bg-[#F0C422]/20 p-6">
    <h2 className="text-xl font-bold">Interested in sponsoring this event?</h2>
    <p className="mt-1 text-sm text-gray-700">Get your brand in front of artisans and their customers at {title}.</p>
    <Link href="/contact-us" className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white">
      Contact us
    </Link>
  </section>
);
