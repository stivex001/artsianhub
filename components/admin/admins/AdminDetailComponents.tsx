"use client";

import React from "react";
import { format } from "date-fns";
import { Clock, Globe, Monitor, StickyNote, Activity } from "lucide-react";
import { ActivityLog } from "@/apis/crud/admin";
import { actionColor, actionLabel } from "@/components/admin/admins/detail-helpers";

// ─────────────────────────────────────────────────────────────────────────────
// InfoRow — labelled detail row with icon
// ─────────────────────────────────────────────────────────────────────────────
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

export const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{label}</p>
      <div className="mt-0.5">{value}</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// PageSkeleton — loading placeholder
// ─────────────────────────────────────────────────────────────────────────────
export const PageSkeleton = () => (
  <div className="flex flex-col gap-6 animate-pulse">
    <div className="h-5 w-32 rounded-md bg-gray-200" />
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-200" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-5 w-40 rounded-md bg-gray-200" />
        <div className="h-4 w-56 rounded-md bg-gray-100" />
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm h-64" />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-64" />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ActivityItem — single timeline entry
// ─────────────────────────────────────────────────────────────────────────────
export const ActivityItem = ({ log }: { log: ActivityLog }) => (
  <div className="flex gap-3 group">
    <div className="flex flex-col items-center">
      <div className="w-2 h-2 rounded-full bg-gray-300 group-first:bg-[#02198B] mt-1.5 shrink-0" />
      <div className="w-px flex-1 bg-gray-100 mt-1" />
    </div>
    <div className="pb-5 min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${actionColor(log.action)}`}
        >
          {actionLabel(log.action)}
        </span>
        <span className="text-[11px] text-gray-400 flex items-center gap-1">
          <Clock className="w-3 h-3 shrink-0" />
          {format(new Date(log.timestamp), "MMM d, yyyy · h:mm a")}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
        {log.ipAddress && (
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Globe className="w-3 h-3 shrink-0" />
            {log.ipAddress}
          </span>
        )}
        {log.userAgent && (
          <span
            className="flex items-center gap-1 text-[11px] text-gray-400 truncate max-w-[260px]"
            title={log.userAgent}
          >
            <Monitor className="w-3 h-3 shrink-0" />
            {log.userAgent.length > 60 ? log.userAgent.slice(0, 60) + "…" : log.userAgent}
          </span>
        )}
      </div>
      {log.note && (
        <p className="mt-1 text-xs text-gray-500 flex items-start gap-1">
          <StickyNote className="w-3 h-3 mt-0.5 shrink-0 text-gray-400" />
          {log.note}
        </p>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ActivityLogSkeleton — loading placeholder for the activity list
// ─────────────────────────────────────────────────────────────────────────────
export const ActivityLogSkeleton = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex gap-3">
        <div className="w-2 h-2 rounded-full bg-gray-200 mt-1.5 shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1 pb-4">
          <div className="h-5 w-24 rounded-md bg-gray-100" />
          <div className="h-3 w-40 rounded-md bg-gray-100" />
        </div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ActivityEmptyState
// ─────────────────────────────────────────────────────────────────────────────
export const ActivityEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 gap-2">
    <Activity className="w-8 h-8 text-gray-200" />
    <p className="text-sm text-gray-400">No activity recorded yet</p>
  </div>
);
