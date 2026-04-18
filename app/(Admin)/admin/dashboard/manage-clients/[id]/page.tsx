"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAdminClients } from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  User,
  CalendarDays,
  StickyNote,
  Send,
  Loader2,
  Clock,
  MapPin,
  BadgeCheck,
  XCircle,
  Info,
} from "lucide-react";
import { formatDateGB, formatDateTime, extractApiError } from "@/utils/index";
import { formatLocation } from "@/utils/normalizeCountry";
import { BookingStatusBadge, UserStatusBadge } from "@/components/admin/shared/badges";
import BackLink from "@/components/admin/shared/BackLink";
import InfoRow from "@/components/admin/shared/InfoRow";
import ClientStatsStrip from "@/components/admin/clients/ClientStatsStrip";
import ClientRecentBookings from "@/components/admin/clients/ClientRecentBookings";
import ClientModerationPanel from "@/components/admin/clients/ClientModerationPanel";

// ─────────────────────────────────────────────────────────────────────────────
// Page skeleton
// ─────────────────────────────────────────────────────────────────────────────
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
  const clientId = params?.id as string;
  const qc       = useQueryClient();

  const { getClientById, updateClientStatus, addClientNote } = useAdminClients();
  const { data, isPending, refetch } = getClientById(clientId);

  const client        = data?.data?.client;
  const bookings      = data?.data?.recentBookings ?? [];
  const internalNotes = data?.data?.internalNotes ?? [];

  const statusMutation = updateClientStatus(clientId);
  const noteMutation   = addClientNote(clientId);

  const [noteContent, setNoteContent] = useState("");
  const [imgError, setImgError]       = useState(false);

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
      toast.error(extractApiError(err, "Failed to add note"));
    }
  };

  if (isPending) return <PageSkeleton />;

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertTriangle className="w-8 h-8" />
        <p className="text-sm">Client not found</p>
        <BackLink href="/admin/dashboard/manage-clients" label="Back to Clients" />
      </div>
    );
  }

  const location = formatLocation(client.city, client.state, client.country) || null;

  return (
    <section className="flex flex-col gap-5">
      <BackLink href="/admin/dashboard/manage-clients" label="Back to Clients" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Left column ──────────────────────────────────────────── */}
        <div className="lg:col-span-1 flex flex-col gap-4">

          {/* Profile card */}
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

              {client.suspensionReason && (
                <div className="mt-3 w-full flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5 text-left">
                  <Info className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-700 leading-snug">{client.suspensionReason}</p>
                </div>
              )}
            </div>

            <div className="space-y-3.5 pt-4">
              <InfoRow icon={Mail}        label="Email"         value={client.userId?.email} />
              <InfoRow icon={Phone}       label="Phone"         value={client.phoneNumber} />
              <InfoRow icon={User}        label="Gender"        value={client.gender} />
              <InfoRow icon={Calendar}    label="Date of Birth" value={formatDateGB(client.dateOfBirth)} />
              <InfoRow icon={MapPin}      label="Location"      value={location} />
              <InfoRow icon={CalendarDays} label="Member Since" value={formatDateGB(client.createdAt ?? client.userId?.createdAt)} />
            </div>
          </div>

          <ClientModerationPanel
            currentStatus={client.accountStatus}
            isPending={statusMutation.isPending}
            onStatusChange={async (status, reason) => {
              await statusMutation.mutateAsync({ accountStatus: status, reason });
              refetch();
              qc.invalidateQueries({ queryKey: ["admin_clients"] });
            }}
          />

          {/* Internal Notes */}
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
                      {formatDateTime(note.createdAt)}
                      {note.adminName && <span className="ml-1">· {note.adminName}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ClientStatsStrip
            total={bookings.length}
            completed={bookings.filter((b) => b.status === "Completed").length}
            inProgress={bookings.filter((b) => b.status === "In Progress").length}
          />

          <ClientRecentBookings bookings={bookings} onRefresh={refetch} />
        </div>
      </div>
    </section>
  );
};

export default ClientDetailPage;
