"use client";

import React, { useState } from "react";
import { useAdminTickets, TICKET_STATUSES, TicketStatus, Ticket } from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Clock, Tag, User, ChevronDown, UserCog, ShieldAlert } from "lucide-react";
import AdminPicker from "./AdminPicker";
import {
  STATUS_COLORS, STATUS_LABELS, CATEGORY_LABELS,
  PRIORITY_COLORS, formatTicketDateTime,
} from "./ticket-constants";
import { useAuthStore } from "@/store/authStore";

interface Props {
  ticket: Ticket;
  ticketId: string;
  onRefetch: () => void;
}

const TicketMetaCard = ({ ticket, ticketId, onRefetch }: Props) => {
  const { currentUser } = useAuthStore();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";
  const queryClient = useQueryClient();
  const { updateTicketStatus, assignTicket } = useAdminTickets();
  const statusMutation = updateTicketStatus(ticketId);
  const assignMutation = assignTicket(ticketId);

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");
  const [showAssignPanel, setShowAssignPanel] = useState(false);
  const [assignAdminId, setAssignAdminId]     = useState("");

  const invalidate = () => {
    onRefetch();
    queryClient.invalidateQueries({ queryKey: ["admin_tickets"] });
  };

  const handleStatusChange = async (status: TicketStatus) => {
    setShowStatusMenu(false);
    try {
      await statusMutation.mutateAsync({
        status,
        ...(resolutionNote.trim() ? { resolutionSummary: resolutionNote.trim() } : {}),
      });
      setResolutionNote("");
      toast.success(`Ticket marked as ${STATUS_LABELS[status]}`);
      invalidate();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleAssign = async () => {
    if (!assignAdminId.trim()) return;
    try {
      await assignMutation.mutateAsync({ assignedAdminId: assignAdminId.trim() });
      setAssignAdminId("");
      setShowAssignPanel(false);
      toast.success("Ticket assigned");
      invalidate();
    } catch {
      toast.error("Failed to assign ticket");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-900 text-base">{ticket.subject}</h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ticket.description}</p>
        </div>

        {/* Status dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowStatusMenu((v) => !v)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${STATUS_COLORS[ticket.status] ?? "bg-gray-100 text-gray-600"}`}
          >
            {STATUS_LABELS[ticket.status as TicketStatus] ?? ticket.status}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {showStatusMenu && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 z-10 py-1">
              {(ticket.status === "resolved" || ticket.status === "closed") && (
                <div className="px-4 py-2 border-b border-gray-50">
                  <input
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="Resolution summary (optional)"
                    className="w-full text-xs px-2 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              )}
              {TICKET_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${ticket.status === s ? "font-semibold text-primary" : "text-gray-700"}`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meta badges */}
      <div className="mt-4 flex flex-wrap gap-2.5 text-xs">
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium capitalize ${PRIORITY_COLORS[ticket.priority] ?? ""}`}>
          <Tag className="w-3 h-3" />{ticket.priority} priority
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
          <Clock className="w-3 h-3" />{formatTicketDateTime(ticket.createdAt)}
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
          <Tag className="w-3 h-3" />{CATEGORY_LABELS[ticket.category] ?? ticket.category}
        </span>
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium capitalize ${ticket.raisedByRole === "client" ? "bg-indigo-50 text-indigo-600" : "bg-teal-50 text-teal-600"}`}>
          <User className="w-3 h-3" />{ticket.raisedByRole}
        </span>
        {ticket.escalatedToSuperAdmin && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-medium">
            <ShieldAlert className="w-3 h-3" />Escalated
          </span>
        )}
      </div>

      {/* Resolution summary */}
      {ticket.resolutionSummary && (
        <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-800">
          <span className="font-medium">Resolution: </span>{ticket.resolutionSummary}
        </div>
      )}

      {/* Assign row */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Assigned to: </span>
          {ticket.assignedAdminId ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="font-medium text-gray-900">{ticket.assignedAdminId.name}</span>
              <span className="text-xs text-gray-400">({ticket.assignedAdminId.email})</span>
            </span>
          ) : (
            <span className="text-gray-400">Unassigned</span>
          )}
        </div>
        {isSuperAdmin && (
          <button
            onClick={() => setShowAssignPanel((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <UserCog className="w-3.5 h-3.5" />
            {ticket.assignedAdminId?._id ? "Reassign" : "Assign Ticket"}
          </button>
        )}
      </div>

      {showAssignPanel && (
        <div className="mt-3 flex items-start gap-2">
          <AdminPicker value={assignAdminId} onChange={setAssignAdminId} />
          <div className="flex gap-2 shrink-0 pt-0.5">
            <button
              onClick={handleAssign}
              disabled={!assignAdminId.trim() || assignMutation.isPending}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              {assignMutation.isPending ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => { setShowAssignPanel(false); setAssignAdminId(""); }}
              className="px-3 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketMetaCard;
