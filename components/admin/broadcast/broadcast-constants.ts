import type { Role } from "./broadcast-types";

// ─── Message Types ──────────────────────────────────────────────────────────
export const MESSAGE_TYPE_META: Record<
  string,
  { label: string; color: string; badge: string; icon: string }
> = {
  welcome:            { label: "Welcome",           color: "text-green-600",   badge: "bg-green-50 text-green-600 ring-1 ring-green-200",     icon: "👋" },
  booking_followup:   { label: "Booking Follow-up", color: "text-cyan-600",    badge: "bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200",         icon: "📅" },
  completion_checkin: { label: "Completion Check-in", color: "text-teal-600",  badge: "bg-teal-50 text-teal-600 ring-1 ring-teal-200",         icon: "✅" },
  retention:          { label: "Retention",         color: "text-indigo-600",  badge: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200",   icon: "🔁" },
  warning:            { label: "Warning",           color: "text-orange-600",  badge: "bg-orange-50 text-orange-600 ring-1 ring-orange-200",   icon: "⚠" },
  account_notice:     { label: "Account Notice",    color: "text-red-600",     badge: "bg-red-50 text-red-600 ring-1 ring-red-200",            icon: "🔒" },
  info:               { label: "Info",              color: "text-blue-600",    badge: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",         icon: "ℹ" },
  reminder:           { label: "Reminder",          color: "text-amber-600",   badge: "bg-amber-50 text-amber-600 ring-1 ring-amber-200",      icon: "🔔" },
  general:            { label: "General",           color: "text-gray-600",    badge: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",        icon: "💬" },
  promotional:        { label: "Promotional",       color: "text-purple-600",  badge: "bg-purple-50 text-purple-600 ring-1 ring-purple-200",   icon: "🎉" },
};

// ─── Role Options ────────────────────────────────────────────────────────────
export const ROLE_OPTIONS: { value: Role; label: string; desc: string }[] = [
  { value: "artisan", label: "Artisans", desc: "Registered service providers" },
  { value: "client",  label: "Clients",  desc: "Platform users & buyers"       },
];

// ─── Broadcast Tips ──────────────────────────────────────────────────────────
export const BROADCAST_TIPS = [
  "Keep messages concise and action-oriented.",
  "Use 'Warning' type for policy or account alerts.",
  "Use 'Info' for platform updates or announcements.",
  "Double-check recipients before sending — this cannot be undone.",
] as const;

// ─── Subject max length ──────────────────────────────────────────────────────
export const SUBJECT_MAX_LENGTH = 120;

// ─── Preview max visible recipients ─────────────────────────────────────────
export const PREVIEW_MAX_RECIPIENTS = 5;
