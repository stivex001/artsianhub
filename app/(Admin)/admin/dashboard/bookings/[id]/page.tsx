"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useAdminBookings,
  BOOKING_STATUSES,
  FOLLOW_UP_TYPES,
  BookingStatus,
  FollowUpType,
} from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  FileText,
  Mail,
  AlertTriangle,
  StickyNote,
  Clock,
  Send,
  Plus,
  Image as ImageIcon,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { STATUS_COLORS } from "../page";

// ── Helpers ────────────────────────────────────────────────────────────────────
const FOLLOW_UP_LABELS: Record<FollowUpType, string> = {
  review_request:    "Review Request",
  completion_check:  "Completion Check",
  retention:         "Retention",
  satisfaction_check:"Satisfaction Check",
};

const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const formatDateTime = (d?: string) =>
  d
    ? new Date(d).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

// ── Sub-components ─────────────────────────────────────────────────────────────
const InfoCard = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-50 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-gray-400" />
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
    {children}
  </div>
);

// ── Page ───────────────────────────────────────────────────────────────────────
const BookingDetailPage = () => {
  const params    = useParams();
  const router    = useRouter();
  const bookingId = params?.id as string;
  const queryClient = useQueryClient();

  const { getBookingById, updateBookingStatus, addBookingNote, addFollowUp } = useAdminBookings();
  const { data, isPending, refetch } = getBookingById(bookingId);

  const booking      = data?.data?.booking;
  const notes        = data?.data?.internalNotes ?? [];
  const followUps    = data?.data?.followUps ?? [];

  const statusMutation  = updateBookingStatus(bookingId);
  const noteMutation    = addBookingNote(bookingId);
  const followUpMutation= addFollowUp(bookingId);

  const [activeTab,      setActiveTab]      = useState<"notes" | "followups">("notes");
  const [noteText,       setNoteText]       = useState("");
  const [followUpType,   setFollowUpType]   = useState<FollowUpType>("completion_check");
  const [followUpNote,   setFollowUpNote]   = useState("");
  const [statusValue,    setStatusValue]    = useState<BookingStatus | "">("");
  const [statusNote,     setStatusNote]     = useState("");
  const [showStatusEdit, setShowStatusEdit] = useState(false);
  const [imgErrors,      setImgErrors]      = useState<Record<string, boolean>>({});

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin_booking", bookingId] });

  const handleStatusUpdate = async () => {
    if (!statusValue) return;
    try {
      await statusMutation.mutateAsync({ status: statusValue, note: statusNote || undefined });
      toast.success("Booking status updated");
      setShowStatusEdit(false);
      setStatusNote("");
      invalidate();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    try {
      await noteMutation.mutateAsync({ content: noteText.trim() });
      setNoteText("");
      toast.success("Note added");
      invalidate();
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
      invalidate();
    } catch {
      toast.error("Failed to add follow-up");
    }
  };

  // ── Loading / error states ─────────────────────────────────────────────────
  if (isPending) {
    return (
      <div className="flex flex-col gap-4 animate-pulse max-w-4xl">
        <div className="h-8 bg-gray-100 rounded-xl w-40" />
        <div className="h-10 bg-gray-100 rounded-2xl" />
        <div className="h-52 bg-gray-100 rounded-2xl" />
        <div className="h-72 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertTriangle className="w-8 h-8" />
        <p className="text-sm">Booking not found</p>
        <button
          onClick={() => router.back()}
          className="text-primary text-sm font-medium hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5 max-w-4xl">
      {/* ── Back ──────────────────────────────────────────────────── */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Bookings
      </button>

      {/* ── Header strip ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="font-bold text-gray-900 text-lg leading-snug">
              {booking.description ?? "Booking Details"}
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-mono">ID: {booking._id}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_COLORS[booking.status] ?? "bg-gray-100 text-gray-500"}`}>
              {booking.status}
            </span>
            <button
              onClick={() => { setStatusValue(booking.status); setShowStatusEdit(!showStatusEdit); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Update Status
            </button>
          </div>
        </div>

        {/* Status update panel */}
        {showStatusEdit && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <select
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value as BookingStatus)}
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              <option value="">Select new status…</option>
              {BOOKING_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              placeholder="Optional note for this change…"
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <button
              onClick={handleStatusUpdate}
              disabled={!statusValue || statusMutation.isPending}
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0"
            >
              {statusMutation.isPending ? "Saving…" : "Save"}
            </button>
          </div>
        )}

        {booking.escalatedToSuperAdmin && (
          <div className="mt-4 flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5 text-sm text-orange-700">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            This booking has been escalated to Super Admin
          </div>
        )}
      </div>

      {/* ── Details grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Client */}
        <InfoCard icon={User} label="Client">
          {booking.clientId ? (
            <div className="flex items-center gap-3">
              {booking.clientId.profilePicture && !imgErrors[booking.clientId._id] ? (
                <img
                  src={booking.clientId.profilePicture}
                  alt=""
                  onError={() => setImgErrors((p) => ({ ...p, [booking.clientId!._id]: true }))}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                  {booking.clientId.firstName?.[0]}{booking.clientId.lastName?.[0]}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {booking.clientId.firstName} {booking.clientId.lastName}
                </p>
                {booking.clientId.phoneNumber && (
                  <p className="text-xs text-gray-500 mt-0.5">{booking.clientId.phoneNumber}</p>
                )}
                {booking.clientId.city && (
                  <p className="text-xs text-gray-400">{booking.clientId.city}</p>
                )}
              </div>
            </div>
          ) : <p className="text-sm text-gray-400">—</p>}
        </InfoCard>

        {/* Artisan */}
        <InfoCard icon={User} label="Artisan">
          {booking.artisanId ? (
            <div className="flex items-center gap-3">
              {booking.artisanId.profilePicture && !imgErrors[`artisan-${booking.artisanId._id}`] ? (
                <img
                  src={booking.artisanId.profilePicture}
                  alt=""
                  onError={() => setImgErrors((p) => ({ ...p, [`artisan-${booking.artisanId!._id}`]: true }))}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                  {booking.artisanId.firstName?.[0]}{booking.artisanId.lastName?.[0]}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {booking.artisanId.firstName} {booking.artisanId.lastName}
                </p>
                {booking.artisanId.professionalTitle && (
                  <p className="text-xs text-gray-500 mt-0.5">{booking.artisanId.professionalTitle}</p>
                )}
                {booking.artisanId.primaryLocation && (
                  <p className="text-xs text-gray-400">{booking.artisanId.primaryLocation}</p>
                )}
              </div>
            </div>
          ) : <p className="text-sm text-gray-400">—</p>}
        </InfoCard>

        {/* Scheduled */}
        <InfoCard icon={Calendar} label="Scheduled">
          <p className="text-sm font-medium text-gray-900">
            {formatDate(booking.preferredDateTime ?? booking.preferredDate)}
          </p>
          {booking.preferredTime && (
            <p className="text-xs text-gray-500 mt-0.5">{booking.preferredTime}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Booked {formatDate(booking.createdAt)}
          </p>
        </InfoCard>

        {/* Location */}
        <InfoCard icon={MapPin} label="Location">
          {booking.location ? (
            <p className="text-sm text-gray-800 leading-snug">{booking.location}</p>
          ) : (
            <p className="text-sm text-gray-400">—</p>
          )}
          {booking.email && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              {booking.email}
            </div>
          )}
        </InfoCard>
      </div>

      {/* ── Description ─────────────────────────────────────────── */}
      {booking.description && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700">Service Description</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{booking.description}</p>
        </div>
      )}

      {/* ── Images ──────────────────────────────────────────────── */}
      {booking.images && booking.images.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700">Attachments</h3>
            <span className="text-xs text-gray-400">({booking.images.length})</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {booking.images.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                <img
                  src={url}
                  alt={`Attachment ${i + 1}`}
                  className="w-full aspect-square object-cover rounded-xl border border-gray-100 hover:opacity-80 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Notes & Follow-ups ───────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {[
            { key: "notes"     as const, label: "Internal Notes", icon: StickyNote, count: notes.length     },
            { key: "followups" as const, label: "Follow-ups",     icon: Clock,      count: followUps.length },
          ].map(({ key, label, icon: Icon, count }) => (
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
              {count > 0 && (
                <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* ── Internal Notes tab ───────────────────────────────── */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              {notes.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notes.map((note) => (
                    <div key={note._id} className="bg-amber-50 rounded-xl p-4 flex gap-3">
                      <StickyNote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-amber-700 mb-1">{note.adminName}</p>
                        <p className="text-sm text-gray-800">{note.content}</p>
                        <p className="text-xs text-gray-400 mt-1.5">{formatDateTime(note.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No internal notes yet</p>
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

          {/* ── Follow-ups tab ───────────────────────────────────── */}
          {activeTab === "followups" && (
            <div className="space-y-4">
              {followUps.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {followUps.map((fu) => (
                    <div key={fu._id} className="bg-blue-50 rounded-xl p-4 flex gap-3">
                      <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                            {FOLLOW_UP_LABELS[fu.type] ?? fu.type}
                          </span>
                          {fu.status && (
                            <span className="text-xs text-gray-500 capitalize">{fu.status}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-800">{fu.note}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDateTime(fu.createdAt)}</p>
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
