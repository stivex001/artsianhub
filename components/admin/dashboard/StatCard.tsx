"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string | undefined;
  loading: boolean;
  bg: string;
  href?: string;
}

const StatCard = ({ icon: Icon, label, value, loading, bg, href }: StatCardProps) => {
  const content = (
    <div className={`${bg} rounded-2xl p-5 flex items-start gap-4 group`}>
      <div className="bg-white/20 rounded-xl p-2.5 shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        {loading ? (
          <div className="h-7 w-12 bg-white/30 rounded-lg animate-pulse mb-1" />
        ) : (
          <p className="text-2xl font-bold text-white leading-tight tabular-nums">
            {typeof value === "number" ? value.toLocaleString() : (value ?? "—")}
          </p>
        )}
        <p className="text-xs text-white/75 mt-1 leading-snug">{label}</p>
      </div>
      {href && (
        <ArrowRight className="w-4 h-4 text-white/50 shrink-0 mt-1 group-hover:text-white/80 transition-colors" />
      )}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export default StatCard;
