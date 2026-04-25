"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import type { TermsSection, SubSection } from "./terms.types";
import { playfair, fadeUp, staggerList, listItem } from "./terms.variants";

function BulletList({ items, inView, size = "15px" }: { items: string[]; inView: boolean; size?: string }) {
  return (
    <motion.ul variants={staggerList} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-2 mb-3">
      {items.map((b, i) => (
        <motion.li key={i} variants={listItem} className="flex gap-3 text-gray-700 leading-relaxed" style={{ fontSize: size }}>
          <span className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F0C422" }} />
          <span>{b}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function SubSectionItem({ sub, inView }: { sub: SubSection; inView: boolean }) {
  return (
    <div className="pl-4 border-l-2" style={{ borderColor: "rgba(2,25,139,0.12)" }}>
      {sub.title
        ? <h3 className="font-semibold text-[15px] mb-2" style={{ color: "#02198B" }}>
            <span className="text-gray-400 font-normal mr-1">{sub.id.replace("-", ".")} </span>
            {sub.title}
          </h3>
        : <p className="text-xs text-gray-400 font-medium mb-1">{sub.id.replace("-", ".")}</p>
      }
      {sub.content && <p className="text-gray-700 leading-relaxed text-[15px] mb-3">{sub.content}</p>}
      {sub.bullets && <BulletList items={sub.bullets} inView={inView} size="14px" />}
      {sub.footer && <p className="text-gray-500 text-sm italic leading-relaxed">{sub.footer}</p>}
    </div>
  );
}

function ContactCard() {
  return (
    <div className="mt-6 rounded-2xl p-6 border" style={{ background: "rgba(2,25,139,0.03)", borderColor: "rgba(2,25,139,0.12)" }}>
      <p className="font-semibold text-gray-900 mb-4">MensayHub Ltd (Trading as ArtisansHub.org)</p>
      <div className="space-y-2 text-[15px] text-gray-700">
        {[
          { label: "General",    href: "mailto:support@artisanshub.org",  text: "support@artisanshub.org" },
          { label: "Privacy",    href: "mailto:privacy@artisanshub.org",  text: "privacy@artisanshub.org" },
        ].map(({ label, href, text }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 w-28">{label}</span>
            <a href={href} className="hover:underline" style={{ color: "#02198B" }}>{text}</a>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 w-28">Website</span>
          <Link href="/contact-us" className="hover:underline" style={{ color: "#02198B" }}>artisanshub.org/contact-us</Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 w-28">Registered</span>
          <span>England and Wales</span>
        </div>
      </div>
      <div className="mt-5 pt-5 border-t text-sm text-gray-600 space-y-1" style={{ borderColor: "rgba(2,25,139,0.1)" }}>
        <p className="font-medium text-gray-700">ICO Registration</p>
        <p>MensayHub Ltd is registered with the Information Commissioner's Office as a Data Controller.</p>
        <p className="text-gray-500">Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
        <p>
          <a href="tel:03031231113" className="hover:underline" style={{ color: "#02198B" }}>Tel: 0303 123 1113</a>
          {" · "}
          <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#02198B" }}>www.ico.org.uk</a>
        </p>
      </div>
    </div>
  );
}

export function TermsSectionBlock({ section }: { section: TermsSection }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.section ref={ref} id={section.id} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="scroll-mt-8 relative">
      <div aria-hidden className={`${playfair.className} absolute -top-4 -left-2 text-[7rem] md:text-[9rem] font-black leading-none select-none pointer-events-none`} style={{ color: "rgba(2,25,139,0.05)" }}>
        {String(section.num).padStart(2, "0")}
      </div>

      <div className="relative mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "#F0C422" }}>§{section.num}</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #F0C422, transparent)" }} />
        </div>
        <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold leading-tight`} style={{ color: "#02198B" }}>
          {section.title}
        </h2>
      </div>

      {section.intro    && <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">{section.intro}</p>}
      {section.bullets  && <BulletList items={section.bullets} inView={inView} />}
      {section.content  && <p className="text-gray-700 leading-relaxed text-[15px] mb-4">{section.content}</p>}
      {section.footer   && <p className="text-gray-500 text-sm italic leading-relaxed mt-3">{section.footer}</p>}

      {section.subsections && (
        <div className="space-y-5 mt-2">
          {section.subsections.map((sub) => <SubSectionItem key={sub.id} sub={sub} inView={inView} />)}
        </div>
      )}

      {section.id === "contact" && <ContactCard />}

      <div className="mt-10 h-px" style={{ background: "linear-gradient(to right, rgba(2,25,139,0.08), transparent)" }} />
    </motion.section>
  );
}
