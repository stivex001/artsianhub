"use client";

import React from "react";
import { CheckCircle2, BadgeCheck, CreditCard, Crown } from "lucide-react";
import { ArtisanAccountStatus, UserStatus, BookingStatus } from "@/api/crud/admin";

// ─────────────────────────────────────────────────────────────────────────────
// AccountStatusBadge — for artisan account status
// ─────────────────────────────────────────────────────────────────────────────

export const AccountStatusBadge = ({ status }: { status?: ArtisanAccountStatus }) => {
  const cfg: Record<ArtisanAccountStatus, { cls: string; label: string; dot: string }> = {
    active:    { cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", label: "Active",    dot: "bg-emerald-500" },
    suspended: { cls: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",       label: "Suspended", dot: "bg-amber-500"   },
    banned:    { cls: "bg-red-50 text-red-700 ring-1 ring-red-200",             label: "Banned",    dot: "bg-red-500"     },
  };
  const s = status ?? "active";
  const { cls, label, dot } = cfg[s];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// UserStatusBadge — for client user status
// ─────────────────────────────────────────────────────────────────────────────

export const UserStatusBadge = ({ status }: { status?: UserStatus }) => {
  const cfg: Record<UserStatus, { cls: string; dot: string }> = {
    active:    { cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dot: "bg-emerald-500" },
    suspended: { cls: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",       dot: "bg-amber-500"   },
    banned:    { cls: "bg-red-50 text-red-700 ring-1 ring-red-200",             dot: "bg-red-500"     },
  };
  const s = status ?? "active";
  const { cls, dot } = cfg[s];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {s}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// VerificationBadge — artisan verification status
// ─────────────────────────────────────────────────────────────────────────────

export const VerificationBadge = ({ verified }: { verified: boolean }) =>
  verified ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-200">
      <BadgeCheck className="w-3.5 h-3.5" />
      Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500 ring-1 ring-gray-200">
      <CheckCircle2 className="w-3 h-3 opacity-40" />
      Unverified
    </span>
  );

// ─────────────────────────────────────────────────────────────────────────────
// SubscriptionBadge — artisan subscription status
// ─────────────────────────────────────────────────────────────────────────────

export const SubscriptionBadge = ({ active }: { active?: boolean }) =>
  active ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200">
      <CreditCard className="w-3.5 h-3.5" />
      Subscribed
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-400 ring-1 ring-gray-200">
      No Subscription
    </span>
  );

// ─────────────────────────────────────────────────────────────────────────────
// FeaturedBadge — artisan featured on homepage
// ─────────────────────────────────────────────────────────────────────────────

export const FeaturedBadge = ({ featured }: { featured?: boolean }) =>
  featured ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-200">
      <Crown className="w-3.5 h-3.5" />
      Featured
    </span>
  ) : null;

// ─────────────────────────────────────────────────────────────────────────────
// BookingStatusBadge — booking status
// ─────────────────────────────────────────────────────────────────────────────

const BOOKING_STATUS_COLORS: Partial<Record<BookingStatus, string>> = {
  Pending:               "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
  Accepted:              "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
  "In Progress":         "bg-purple-50 text-purple-600 ring-1 ring-purple-200",
  Completed:             "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Declined:              "bg-red-50 text-red-600 ring-1 ring-red-200",
  Rescheduled:           "bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200",
  "Cancelled (Client)":  "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
  "Cancelled (Artisan)": "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
  "No Show (Artisan)":   "bg-orange-50 text-orange-600 ring-1 ring-orange-200",
  "No Show (Client)":    "bg-orange-50 text-orange-600 ring-1 ring-orange-200",
};

export const BookingStatusBadge = ({ status }: { status?: BookingStatus }) => {
  if (!status) return <span className="text-gray-400 text-xs">—</span>;
  const cls = BOOKING_STATUS_COLORS[status] ?? "bg-gray-100 text-gray-500";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cls}`}>
      {status}
    </span>
  );
};
