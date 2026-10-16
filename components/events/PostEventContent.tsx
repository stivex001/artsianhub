"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { EventPostContent } from "@/types/events";

/* eslint-disable @next/next/no-img-element */

export const PostEventContent = ({ content }: { content: EventPostContent }) => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-10">
      {content.writtenReport && (
        <section aria-labelledby="report">
          <h2 id="report" className="mb-4 text-2xl font-bold">Event report</h2>
          <div className="space-y-3 text-gray-700">
            {content.writtenReport.split(/\n{2,}/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {content.exhibitorQuote && (
        <blockquote className="rounded-2xl border-l-4 border-primary bg-primary/5 p-6 text-lg italic">
          “{content.exhibitorQuote}”
          {content.quoteAttribution && (
            <footer className="mt-2 text-sm not-italic text-gray-600">{content.quoteAttribution}</footer>
          )}
        </blockquote>
      )}

      {content.spotlightVideoUrls.length > 0 && (
        <section aria-labelledby="videos">
          <h2 id="videos" className="mb-4 text-2xl font-bold">Spotlight interviews</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.spotlightVideoUrls.map((url) => (
              <iframe
                key={url}
                src={url}
                title="Spotlight interview"
                loading="lazy"
                allowFullScreen
                className="aspect-video w-full rounded-2xl border-0"
              />
            ))}
          </div>
        </section>
      )}

      {content.galleryUrls.length > 0 && (
        <section aria-labelledby="gallery">
          <h2 id="gallery" className="mb-4 text-2xl font-bold">Photo gallery</h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {content.galleryUrls.map((url, i) => (
              <li key={url}>
                <button type="button" className="block w-full" onClick={() => setOpen(url)} aria-label={`Open photo ${i + 1}`}>
                  <img src={url} alt={`Event photo ${i + 1}`} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
                </button>
              </li>
            ))}
          </ul>
          <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
            <DialogContent className="max-w-4xl p-2">
              <DialogTitle className="sr-only">Event photo</DialogTitle>
              {open && <img src={open} alt="Event photo enlarged" className="max-h-[80vh] w-full rounded-lg object-contain" />}
            </DialogContent>
          </Dialog>
        </section>
      )}

      {content.resourcePackUrls.length > 0 && (
        <section aria-labelledby="resources">
          <h2 id="resources" className="mb-4 text-2xl font-bold">Slides &amp; resources</h2>
          <ul className="space-y-2">
            {content.resourcePackUrls.map((url, i) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
                  Resource {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
