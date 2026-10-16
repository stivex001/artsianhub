"use client";

import React from "react";

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: React.ReactNode;
}

/**
 * A labelled info row with an icon, used inside detail page sections.
 * Renders a branded icon container + stacked label/value pair.
 */
const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-[#02198B]/[0.08] flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-[#02198B]" />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm text-gray-800 font-medium mt-0.5 leading-snug">
        {value != null && value !== "" && value !== false
          ? value
          : <span className="text-gray-400 font-normal">—</span>}
      </p>
    </div>
  </div>
);

export default InfoRow;
