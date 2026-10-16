"use client";

import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  /** Optional extra class on the outer wrapper */
  className?: string;
}

/**
 * A white card section with a branded left-accent header strip.
 * Used across admin detail pages to group related content.
 */
const Section = ({ title, children, className }: SectionProps) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className ?? ""}`}>
    <div className="px-5 py-3.5 border-b border-gray-50 flex items-center gap-2">
      <div className="w-1 h-4 bg-[#02198B] rounded-full" />
      <h3 className="text-xs font-semibold text-[#02198B] uppercase tracking-widest">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

export default Section;
