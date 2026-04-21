"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string | undefined;
  loading: boolean;
  /** Tailwind bg class used for the icon container, e.g. "bg-primary" or "bg-emerald-500" */
  bg: string;
  href?: string;
}

const StatCard = ({ icon: Icon, label, value, loading, bg, href }: StatCardProps) => {
  const content = (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      {/* Icon + arrow row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {href && (
          <span className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary/20 transition-all shrink-0">
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transition-colors" />
          </span>
        )}
      </div>

      {/* Value */}
      {loading ? (
        <>
          <div className="h-8 w-20 bg-gray-100 rounded-lg animate-pulse mb-2" />
          <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
        </>
      ) : (
        <>
          <p className="text-2xl font-bold text-gray-900 tabular-nums leading-tight">
            {typeof value === "number" ? value.toLocaleString() : (value ?? "—")}
          </p>
          <p className="text-xs text-gray-500 mt-1.5 font-medium leading-snug">{label}</p>
        </>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
};

export default StatCard;
