"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminBookings, useAdminSubscriptions, FOLLOW_UP_TYPES, FollowUpType } from "@/api/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  User,
  Calendar,
  DollarSign,
  AlertTriangle,
  StickyNote,
  Plus,
  Send,
  ChevronDown,
  RefreshCw,
  Clock,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Accepted: "bg-blue-50 text-blue-600",
  "In Progress": "bg-purple-50 text-purple-600",
  Completed: "bg-green-50 text-green-600",
  Declined: "bg-red-50 text-red-600",
  Rescheduled: "bg-cyan-50 text-cyan-600",
  "Cancelled (Client)": "bg-gray-100 text-gray-500",
  "Cancelled (Artisan)": "bg-gray-100 text-gray-500",
  "No Show (Artisan)": "bg-orange-50 text-orange-600",
  "No Show (Client)": "bg-orange-50 text-orange-600",
};

const FOLLOW_UP_LABELS: Record<FollowUpType, string> = {
  review_request: "Review Request",
  completion_check: "Completion Check",
  retention: "Retention",
  satisfaction_check: "Satisfaction Check",
};

const BookingDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.id as string;
  const queryClient = useQueryClient();

  const { getBookingById, addBookingNote, addFollowUp } = useAdminBookings();
  const { extendSubscription, flagRefund } = useAdminSubscriptions();

  const { data, isPending, refetch } = getBookingById(bookingId);
  const booking = data?.data;

  const noteMutation = addBookingNote(bookingId);
  const followUpMutation = addFollowUp(bookingId);

  const [noteText, setNoteText] = useState("");
  const [followUpType, setFollowUpType] = useState<FollowUpType>("completion_check");
  const [followUpNote, setFollowUpNote] = useState("");
  const [activeTab, setActiveTab] = useState<"notes" | "followups">("notes");

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    try {
      await noteMutation.mutateAsync({ note: noteText.trim() });
      setNoteText("");
      toast.success("Note added");
      refetch();
    } catch {
      toast.error("Failed to add note");
    }
  };

  const handleAddFollowUp = async () => {
    if (!followUpNote.trim()) return;
    try {
      await followUpMutation.mutateAsync({ type: followUpType, note: followUpNote.trim() });
      setFollowUpNote("");
      toast.success("Follow-up added");
      refetch();
    } catch {
      toast.error("Failed to add follow-up");
    }
  };

  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-xl w-48" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertTriangle className="w-8 h-8" />
        <p className="text-sm">Booking not found</p>
        <button onClick={() => router.back()} className="text-primary text-sm font-medium hover:underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5 max-w-4xl">
      {/* ── Back ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bookings
        </button>
      </div>

      {/* ── Booking Overview ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">
              {booking.serviceType ?? "Booking Details"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">ID: {booking._id}</p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium shrink-0 ${STATUS_COLORS[booking.status] ?? "bg-gray-100 text-gray-500"}`}>
            {booking.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Client */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</span>
            </div>
            {booking.clientId ? (
              <>
                <p className="font-medium text-gray-900 text-sm">{booking.clientId.firstName} {booking.clientId.lastName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{booking.clientId.email}</p>
              </>
            ) : <p className="text-sm text-gray-500">—</p>}
          </div>

          {/* Artisan */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Artisan</span>
            </div>
            {booking.artisanId ? (
              <>
                <p className="font-medium text-gray-900 text-sm">{booking.artisanId.firstName} {booking.artisanId.lastName}</p>
                {booking.artisanId.professionalTitle && (
                  <p className="text-xs text-gray-500 mt-0.5">{booking.artisanId.professionalTitle}</p>
                )}
              </>
            ) : <p className="text-sm text-gray-500">—</p>}
          </div>

          {/* Date */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled</span>
            </div>
            <p className="text-sm text-gray-900">{formatDate(booking.scheduledDate)}</p>
          </div>

          {/* Amount */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</span>
            </div>
            <p className="font-semibold text-gray-900 text-lg">
              {booking.totalAmount ? `$${booking.totalAmount.toLocaleString()}` : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Notes & Follow-ups ───────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {[
            { key: "notes" as const, label: "Internal Notes", icon: StickyNote },
            { key: "followups" as const, label: "Follow-ups", icon: Clock },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors ${
                activeTab === key
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {key === "notes" && booking.notes && booking.notes.length > 0 && (
                <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                  {booking.notes.length}
                </span>
              )}
              {key === "followups" && booking.followUps && booking.followUps.length > 0 && (
                <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                  {booking.followUps.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === "notes" && (
            <div className="space-y-4">
              {/* Existing notes */}
              {booking.notes && booking.notes.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {booking.notes.map((note, i) => (
                    <div key={i} className="bg-amber-50 rounded-xl p-4 flex gap-3">
                      <StickyNote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-800">{note.note}</p>
                        {note.createdAt && (
                          <p className="text-xs text-gray-400 mt-1.5">{formatDate(note.createdAt)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No notes yet</p>
              )}

              {/* Add note */}
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add an internal staff note…"
                  rows={2}
                  className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!noteText.trim() || noteMutation.isPending}
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-white disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0 self-end"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === "followups" && (
            <div className="space-y-4">
              {/* Existing follow-ups */}
              {booking.followUps && booking.followUps.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {booking.followUps.map((fu, i) => (
                    <div key={i} className="bg-blue-50 rounded-xl p-4 flex gap-3">
                      <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                          {FOLLOW_UP_LABELS[fu.type] ?? fu.type}
                        </span>
                        <p className="text-sm text-gray-800 mt-1.5">{fu.note}</p>
                        {fu.createdAt && (
                          <p className="text-xs text-gray-400 mt-1">{formatDate(fu.createdAt)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No follow-ups yet</p>
              )}

              {/* Add follow-up */}
              <div className="pt-2 border-t border-gray-100 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Type</label>
                  <select
                    value={followUpType}
                    onChange={(e) => setFollowUpType(e.target.value as FollowUpType)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  >
                    {FOLLOW_UP_TYPES.map((t) => (
                      <option key={t} value={t}>{FOLLOW_UP_LABELS[t]}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <textarea
                    value={followUpNote}
                    onChange={(e) => setFollowUpNote(e.target.value)}
                    placeholder="Follow-up note…"
                    rows={2}
                    className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    onClick={handleAddFollowUp}
                    disabled={!followUpNote.trim() || followUpMutation.isPending}
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-white disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0 self-end"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingDetailPage;
