"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PRIVACY_SECTIONS } from "./privacy.data";
import { TermsSectionBlock } from "./TermsSectionBlock";
import { PrivacyTOC } from "./PrivacyTOC";
import { playfair, fadeUp } from "./terms.variants";

export function PrivacyContent() {
  const [activeId, setActiveId] = useState(PRIVACY_SECTIONS[0].id);
  const [tocOpen, setTocOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setTocOpen(false);
    }
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const map = new Map<string, number>();
    PRIVACY_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          map.set(s.id, entry.intersectionRatio);
          const best = [...map.entries()].sort((a, b) => b[1] - a[1])[0];
          if (best) setActiveId(best[0]);
        },
        { threshold: [0, 0.1, 0.3, 0.5], rootMargin: "0px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #02198B 0%, #011266 60%, #000d4d 100%)" }}
      >
        <div aria-hidden className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(240,196,34,0.4) 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
        <motion.div aria-hidden className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "#F0C422" }} animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div aria-hidden className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: "#F0C422" }} animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-8" style={{ background: "#F0C422" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#F0C422" }}>Legal Document</span>
            </div>
            <h1 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4`}>
              Privacy<br /><span style={{ color: "#F0C422" }}>Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200 mb-8 font-medium">ArtisansHub.org — Operated by MensayHub Ltd</p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Version", value: "2.0" },
                { label: "Effective", value: "24 April 2026" },
                { label: "Jurisdiction", value: "England & Wales" },
                { label: "Sections", value: String(PRIVACY_SECTIONS.length) },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span className="text-blue-300">{label}: </span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Important Notice */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="max-w-7xl mx-auto px-6 lg:px-12 mt-8">
        <div className="rounded-2xl p-5 md:p-6 flex gap-4" style={{ background: "rgba(240,196,34,0.08)", border: "1.5px solid rgba(240,196,34,0.35)" }}>
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(240,196,34,0.2)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 5v3.5M8 10.5v.5" stroke="#92600A" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "#92600A" }}>Your Privacy Matters</p>
            <p className="text-sm leading-relaxed text-amber-900">
              This Privacy Policy explains how MensayHub Ltd collects, uses, and protects your personal data in connection with ArtisansHub.org.
              We are registered with the Information Commissioner's Office (ICO) as a Data Controller and comply with the UK GDPR and Data Protection Act 2018.
              This Policy should be read alongside our{" "}
              <Link href="/terms" className="underline font-medium">Terms of Service</Link> and Cookie Policy.
              If you have any questions about how we handle your data, please contact{" "}
              <a href="mailto:privacy@artisanshub.org" className="underline font-medium">privacy@artisanshub.org</a>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main layout: TOC + Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex gap-12 lg:gap-16">

          {/* Desktop TOC sidebar */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(2,25,139,0.1)", boxShadow: "0 4px 24px rgba(2,25,139,0.06)" }}>
                <PrivacyTOC activeId={activeId} onSelect={scrollTo} />
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0 space-y-12">
            {PRIVACY_SECTIONS.map((section) => (
              <TermsSectionBlock key={section.id} section={section} />
            ))}
            <motion.footer variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="pt-8 mt-8 border-t text-center space-y-3" style={{ borderColor: "rgba(2,25,139,0.1)" }}>
              <p className={`${playfair.className} italic text-gray-400 text-sm`}>Version 2.0 · Effective 24 April 2026 · MensayHub Ltd · ArtisansHub.org</p>
              <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
                This Privacy Policy is reviewed periodically to reflect changes in our practices and applicable law.
                MensayHub Ltd recommends that Users review this document regularly.
                For data protection enquiries, contact <a href="mailto:privacy@artisanshub.org" className="hover:underline" style={{ color: "#02198B" }}>privacy@artisanshub.org</a>.
              </p>
              <div className="flex items-center justify-center gap-4 pt-2">
                <Link href="/terms" className="text-xs hover:underline" style={{ color: "#02198B" }}>Terms of Service</Link>
                <span className="text-gray-300">·</span>
                <Link href="/contact-us" className="text-xs hover:underline" style={{ color: "#02198B" }}>Contact Us</Link>
                <span className="text-gray-300">·</span>
                <Link href="/" className="text-xs hover:underline" style={{ color: "#02198B" }}>ArtisansHub.org</Link>
              </div>
            </motion.footer>
          </main>
        </div>
      </div>

      {/* Mobile floating TOC button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <motion.button onClick={() => setTocOpen(true)} whileTap={{ scale: 0.92 }} className="w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center relative" style={{ background: "#02198B" }} aria-label="Open table of contents">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 5h16M3 11h10M3 17h13" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-gray-900" style={{ background: "#F0C422" }}>{PRIVACY_SECTIONS.length}</span>
        </motion.button>
      </div>

      {/* Mobile TOC drawer */}
      <AnimatePresence>
        {tocOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setTocOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="lg:hidden fixed right-0 top-0 bottom-0 z-50 w-72 shadow-2xl overflow-y-auto" style={{ background: "white" }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-gray-900">Contents</h2>
                  <button onClick={() => setTocOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="#374151" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <PrivacyTOC activeId={activeId} onSelect={scrollTo} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
