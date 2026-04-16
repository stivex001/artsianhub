"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminTickets, TICKET_STATUSES, TicketStatus } from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  Send,
  Lock,
  Unlock,
  User,
  Clock,
  Tag,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
const PRIORITY_COLORS: Record<string, string> = {
  low: "text-gray-500 bg-gray-100",
  medium: "text-blue-600 bg-blue-50",
  high: "text-orange-600 bg-orange-50",
  urgent: "text-red-600 bg-red-50",
};

const STATUS_COLORS: Record<string, string> = {
  open: "text-blue-600 bg-blue-50",
  in_progress: "text-yellow-700 bg-yellow-50",
  waiting_on_user: "text-purple-600 bg-purple-50",
  resolved: "text-green-600 bg-green-50",
  closed: "text-gray-500 bg-gray-100",
};

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  waiting_on_user: "Waiting on User",
  resolved: "Resolved",
  closed: "Closed",
};

const CATEGORY_LABELS: Record<string, string> = {
  general_enquiry: "General Enquiry",
  booking_issue: "Booking Issue",
  payment_issue: "Payment Issue",
  account_issue: "Account Issue",
  dispute: "Dispute",
  other: "Other",
};

// ─────────────────────────────────────────────────────────────────────────────
const TicketDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const ticketId = params?.id as string;
  const queryClient = useQueryClient();

  const { getTicketById, replyToTicket, updateTicketStatus } = useAdminTickets();

  const { data, isPending, refetch } = getTicketById(ticketId);
  const ticket = data?.data;

  const replyMutation = replyToTicket(ticketId);
  const statusMutation = updateTicketStatus(ticketId);

  const [replyText, setReplyText] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await replyMutation.mutateAsync({ message: replyText.trim(), internal: isInternal });
      setReplyText("");
      toast.success(isInternal ? "Internal note added" : "Reply sent to user");
      refetch();
      queryClient.invalidateQueries({ queryKey: ["admin_tickets"] });
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (status: TicketStatus) => {
    setShowStatusMenu(false);
    try {
      await statusMutation.mutateAsync({ status });
      toast.success(`Ticket marked as ${STATUS_LABELS[status]}`);
      refetch();
      queryClient.invalidateQueries({ queryKey: ["admin_tickets"] });
    } catch {
      toast.error("Failed to update status");
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-xl w-48" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertTriangle className="w-8 h-8" />
        <p className="text-sm">Ticket not found</p>
        <button onClick={() => router.back()} className="text-primary text-sm font-medium hover:underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5 max-w-4xl">
      {/* ── Back + Title ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-gray-300">/</span>
        <h1 className="text-lg font-bold text-gray-900 line-clamp-1">{ticket.subject}</h1>
      </div>

      {/* ── Ticket Meta ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-900 text-base">{ticket.subject}</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ticket.description}</p>
          </div>

          {/* Status control */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowStatusMenu((v) => !v)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                STATUS_COLORS[ticket.status] ?? "bg-gray-100 text-gray-600"
              }`}
            >
              {STATUS_LABELS[ticket.status as TicketStatus] ?? ticket.status}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showStatusMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10 py-1">
                {TICKET_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      ticket.status === s ? "font-semibold text-primary" : "text-gray-700"
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Meta badges */}
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium capitalize ${PRIORITY_COLORS[ticket.priority] ?? ""}`}>
            <Tag className="w-3 h-3" />
            {ticket.priority} priority
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
            <Clock className="w-3 h-3" />
            {formatDate(ticket.createdAt)}
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
            <Tag className="w-3 h-3" />
            {CATEGORY_LABELS[ticket.category] ?? ticket.category}
          </span>
          {ticket.userId && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
              <User className="w-3 h-3" />
              {ticket.userId.firstName} {ticket.userId.lastName}
            </span>
          )}
        </div>
      </div>

      {/* ── Conversation Thread ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">Conversation</h3>
          <button onClick={() => refetch()} className="text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-gray-50 max-h-[480px] overflow-y-auto">
          {/* Original description message */}
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-medium text-sm text-gray-900">
                    {ticket.userId
                      ? `${ticket.userId.firstName} ${ticket.userId.lastName}`
                      : "User"}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(ticket.createdAt)}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Original</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
              </div>
            </div>
          </div>

          {/* Replies */}
          {ticket.replies && ticket.replies.length > 0 ? (
            ticket.replies.map((reply) => (
              <div key={reply._id} className={`p-5 ${reply.internal ? "bg-amber-50/40" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    reply.internal ? "bg-amber-100" : "bg-green-100"
                  }`}>
                    {reply.internal ? (
                      <Lock className="w-4 h-4 text-amber-600" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-medium text-sm text-gray-900">
                        {reply.author?.name ?? "Admin"}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(reply.createdAt)}</span>
                      {reply.internal && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                          Internal Note
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{reply.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 text-sm">No replies yet</div>
          )}
        </div>

        {/* ── Reply Composer ───────────────────────────────────── */}
        <div className="border-t border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setIsInternal(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !isInternal ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Unlock className="w-3 h-3" />
              Reply to User
            </button>
            <button
              onClick={() => setIsInternal(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isInternal ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Lock className="w-3 h-3" />
              Internal Note
            </button>
          </div>
          <div className="flex gap-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={isInternal ? "Add a private staff note…" : "Type your reply to the user…"}
              rows={3}
              className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <button
              onClick={handleSendReply}
              disabled={!replyText.trim() || sending}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-white disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0 self-end"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {isInternal && (
            <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              This note is only visible to admin staff
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TicketDetailPage;
