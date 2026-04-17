import React from "react";
import { MessageSquare, AlertCircle, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { TicketStatus, TicketPriority } from "@/apis/crud/admin";

export const PRIORITY_STYLES: Record<TicketPriority, string> = {
  low:    "bg-gray-100 text-gray-600",
  medium: "bg-blue-50 text-blue-600",
  high:   "bg-orange-50 text-orange-600",
  urgent: "bg-red-50 text-red-600",
};

export const STATUS_STYLES: Record<TicketStatus, { cls: string; icon: React.ReactNode }> = {
  open:            { cls: "bg-blue-50 text-blue-600",     icon: React.createElement(MessageSquare, { className: "w-3 h-3" }) },
  in_progress:     { cls: "bg-yellow-50 text-yellow-700", icon: React.createElement(Clock,         { className: "w-3 h-3" }) },
  waiting_on_user: { cls: "bg-purple-50 text-purple-600", icon: React.createElement(AlertCircle,   { className: "w-3 h-3" }) },
  resolved:        { cls: "bg-green-50 text-green-600",   icon: React.createElement(CheckCircle2,  { className: "w-3 h-3" }) },
  closed:          { cls: "bg-gray-100 text-gray-500",    icon: React.createElement(XCircle,       { className: "w-3 h-3" }) },
};

export const STATUS_COLORS: Record<TicketStatus, string> = {
  open:            "text-blue-600 bg-blue-50",
  in_progress:     "text-yellow-700 bg-yellow-50",
  waiting_on_user: "text-purple-600 bg-purple-50",
  resolved:        "text-green-600 bg-green-50",
  closed:          "text-gray-500 bg-gray-100",
};

export const STATUS_LABELS: Record<TicketStatus, string> = {
  open:            "Open",
  in_progress:     "In Progress",
  waiting_on_user: "Waiting on User",
  resolved:        "Resolved",
  closed:          "Closed",
};

export const CATEGORY_LABELS: Record<string, string> = {
  general_enquiry: "General Enquiry",
  booking_issue:   "Booking Issue",
  payment_issue:   "Payment Issue",
  account_issue:   "Account Issue",
  dispute:         "Dispute",
  other:           "Other",
};

export const ROLE_STYLES: Record<string, string> = {
  client:  "bg-indigo-50 text-indigo-600",
  artisan: "bg-teal-50 text-teal-600",
};

export const ROLE_LABEL: Record<string, string> = {
  client:      "Client",
  artisan:     "Artisan",
  admin:       "Admin",
  super_admin: "Super Admin",
};

export const PRIORITY_COLORS: Record<string, string> = {
  low:    "text-gray-500 bg-gray-100",
  medium: "text-blue-600 bg-blue-50",
  high:   "text-orange-600 bg-orange-50",
  urgent: "text-red-600 bg-red-50",
};

export const OUTREACH_MESSAGE_TYPES = ["welcome", "reminder", "warning", "general", "promotional"] as const;

export const formatTicketDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

export const formatTicketDateTime = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
