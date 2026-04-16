"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminClients, UserStatus } from "@/api/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Shield,
  ShieldOff,
  AlertTriangle,
  CheckCircle2,
  User,
  CalendarDays,
  RefreshCw,
  StickyNote,
  Send,
  Loader2,
  Clock,
  MapPin,
  BadgeCheck,
  XCircle,
  Info,
} from "lucide-react";
import { format } from "date-fns";
import { BookingStatusBadge, UserStatusBadge } from "@/components/admin/shared/badges";
import { formatLocation } from "@/utils/normalizeCountry";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const formatDateTime = (d?: string) => {
  if (!d) return "—";
  return format(new Date(d), "dd MMM yyyy · h:mm a");
};

const extractError = (err: unknown, fallback: string) => {
  const e = err as any;
  return e?.data?.message ?? e?.data?.error ?? e?.message ?? fallback;
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────
const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: React.ReactNode;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-gray-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 mt-0.5 break-all">{value}</p>
      </div>
    </div>
  );
};

const PageSkeleton = () => (
  <div className="flex flex-col gap-5 animate-pulse">
    <div className="h-8 bg-gray-100 rounded-xl w-36" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="h-52 bg-gray-100 rounded-2xl" />
        <div className="h-44 bg-gray-100 rounded-2xl" />
        <div className="h-60 bg-gray-100 rounded-2xl" />
      </div>
      <div className="lg:col-span-2 h-80 bg-gray-100 rounded-2xl" />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
const ClientDetailPage = () => {
  const params   = useParams();
  const router   = useRouter();
  const clientId = params?.id as string;
  const qc       = useQueryClient();

  const { getClientById, updateClientStatus, addClientNote } = useAdminClients();
  const { data, isPending, refetch } = getClientById(clientId);

  // ── Destructure from actual API shape ─────────────────────────────────────
  const client        = data?.data?.client;
  const bookings      = data?.data?.recentBookings ?? [];
  const internalNotes = data?.data?.internalNotes ?? [];

  const statusMutation = updateClientStatus(clientId);
  const noteMutation   = addClientNote(clientId);

  const [reasonText, setReasonText]   = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [imgError, setImgError]       = useState(false);

  // ── Status update ──────────────────────────────────────────────────────────
  const handleStatusChange = async (accountStatus: UserStatus) => {
    if (!reasonText.trim() && accountStatus !== "active") {
      toast.error("Please provide a reason");
      return;
    }
    try {
      await statusMutation.mutateAsync({ accountStatus, reason: reasonText || undefined });
      setReasonText("");
      toast.success(`Client status updated to ${accountStatus}`);
      refetch();
      qc.invalidateQueries({ queryKey: ["admin_clients"] });
    } catch (err) {
      toast.error(extractError(err, "Failed to update status"));
    }
  };

  // ── Add note ───────────────────────────────────────────────────────────────
  const handleAddNote = async () => {
    if (!noteContent.trim()) {
      toast.error("Note content cannot be empty");
      return;
    }
    try {
      await noteMutation.mutateAsync({ content: noteContent.trim() });
      setNoteContent("");
      toast.success("Note added successfully");
      refetch();
    } catch (err) {
      toast.error(extractError(err, "Failed to add note"));
    }
  };

  if (isPending) return <PageSkeleton />;

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertTriangle className="w-8 h-8" />
        <p className="text-sm">Client not found</p>
        <button
          onClick={() => router.back()}
          className="text-primary text-sm font-medium hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const location = formatLocation(client.city, client.state, client.country) || null;

  return (
    <section className="flex flex-col gap-5">
      {/* ── Back ──────────────────────────────────────────────────── */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Clients
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Left column ──────────────────────────────────────────── */}
        <div className="lg:col-span-1 flex flex-col gap-4">

          {/* ── Profile card ─────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center text-center pb-5 border-b border-gray-100">
              {client.profilePicture && !imgError ? (
                <img
                  src={client.profilePicture}
                  alt={`${client.firstName} ${client.lastName}`}
                  onError={() => setImgError(true)}
                  className="w-20 h-20 rounded-full object-cover mb-3 ring-2 ring-gray-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mb-3">
                  {client.firstName?.[0]}{client.lastName?.[0]}
                </div>
              )}

              <h2 className="font-bold text-gray-900 text-lg leading-tight">
                {client.firstName} {client.lastName}
              </h2>

              {/* Status + Verified badges */}
              <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
                <UserStatusBadge status={client.accountStatus} />
                {client.userId?.isVerified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                    <BadgeCheck className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500 ring-1 ring-gray-200">
                    <XCircle className="w-3 h-3 opacity-60" />
                    Unverified
                  </span>
                )}
              </div>

              {/* Suspension reason banner */}
              {client.suspensionReason && (
                <div className="mt-3 w-full flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5 text-left">
                  <Info className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-700 leading-snug">{client.suspensionReason}</p>
                </div>
              )}
            </div>

            {/* Contact / profile info */}
            <div className="space-y-3.5 pt-4">
              <InfoRow icon={Mail}        label="Email"         value={client.userId?.email} />
              <InfoRow icon={Phone}       label="Phone"         value={client.phoneNumber || null} />
              <InfoRow icon={User}        label="Gender"        value={client.gender ? <span className="capitalize">{client.gender}</span> : null} />
              <InfoRow icon={Calendar}    label="Date of Birth" value={client.dateOfBirth ? formatDate(client.dateOfBirth) : null} />
              <InfoRow icon={MapPin}      label="Location"      value={location} />
              <InfoRow icon={CalendarDays} label="Member Since" value={formatDate(client.createdAt ?? client.userId?.createdAt)} />
            </div>
          </div>

          {/* ── Moderation ───────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" />
              Moderation
            </h3>
            <div className="mb-3">
              <label className="text-xs text-gray-500 font-medium mb-1.5 block">
                Reason <span className="text-gray-400">(required for suspend / ban)</span>
              </label>
              <textarea
                value={reasonText}
                onChange={(e) => setReasonText(e.target.value)}
                placeholder="Enter reason…"
                rows={2}
                className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleStatusChange("active")}
                disabled={statusMutation.isPending}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-60 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Activate Account
              </button>
              <button
                onClick={() => handleStatusChange("suspended")}
                disabled={statusMutation.isPending}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 disabled:opacity-60 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Suspend Account
              </button>
              <button
                onClick={() => handleStatusChange("banned")}
                disabled={statusMutation.isPending}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 disabled:opacity-60 transition-colors"
              >
                <ShieldOff className="w-4 h-4" />
                Ban Account
              </button>
            </div>
          </div>

          {/* ── Internal Notes ───────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-gray-400" />
              Internal Notes
              {internalNotes.length > 0 && (
                <span className="ml-auto text-[11px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-medium">
                  {internalNotes.length}
                </span>
              )}
            </h3>

            {/* Add note */}
            <div className="flex flex-col gap-2 mb-4">
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Add an internal note…"
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button
                onClick={handleAddNote}
                disabled={noteMutation.isPending || !noteContent.trim()}
                className="self-end inline-flex items-center gap-2 px-4 py-2 bg-[#02198B] text-white text-xs font-medium rounded-xl hover:bg-[#011571] disabled:opacity-50 transition-colors"
              >
                {noteMutation.isPending
                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  : <Send className="w-3.5 h-3.5" />
                }
                Add Note
              </button>
            </div>

            {/* Notes list */}
            {internalNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 gap-2 text-gray-300">
                <StickyNote className="w-6 h-6" />
                <p className="text-xs">No notes yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
                {[...internalNotes].reverse().map((note) => (
                  <div key={note._id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-400">
                      <Clock className="w-3 h-3 shrink-0" />
                      {note.createdAt
                        ? format(new Date(note.createdAt), "MMM d, yyyy · h:mm a")
                        : "—"}
                      {note.adminName && (
                        <span className="ml-1">· {note.adminName}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* ── Stats strip ──────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {
                label: "Total Bookings",
                value: bookings.length,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Completed",
                value: bookings.filter((b) => b.status === "Completed").length,
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                label: "In Progress",
                value: bookings.filter((b) => b.status === "In Progress").length,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-4 flex flex-col gap-1`}>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Recent bookings ──────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                Recent Bookings
                {bookings.length > 0 && (
                  <span className="text-[11px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-medium">
                    {bookings.length}
                  </span>
                )}
              </h3>
              <button
                onClick={() => refetch()}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-2 text-gray-400">
                <CalendarDays className="w-8 h-8" />
                <p className="text-sm">No bookings found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Scheduled
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {bookings.map((booking, i) => (
                      <tr key={booking._id ?? i} className="hover:bg-gray-50/50">
                        {/* Description */}
                        <td className="px-5 py-4 max-w-[200px]">
                          <p className="text-gray-900 line-clamp-2 leading-snug">
                            {booking.description || "—"}
                          </p>
                        </td>
                        {/* Location */}
                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                            {booking.location || "—"}
                          </div>
                        </td>
                        {/* Status */}
                        <td className="px-4 py-4">
                          <BookingStatusBadge status={booking.status} />
                        </td>
                        {/* Scheduled date */}
                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap text-xs">
                          {formatDateTime(booking.preferredDateTime ?? booking.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientDetailPage;
