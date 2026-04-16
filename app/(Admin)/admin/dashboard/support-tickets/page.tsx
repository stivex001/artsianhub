"use client";

import React, { useState } from "react";
import { useAdminTickets, TICKET_STATUSES, TICKET_PRIORITIES, TicketStatus, TicketPriority } from "@/apis/crud/admin";
import Wrapper from "@/components/shared/Wrapper";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  SlidersHorizontal,
  Download,
} from "lucide-react";
import { downloadReport } from "@/apis/crud/admin";

// ── Priority badge ─────────────────────────────────────────────────────────────
const PRIORITY_STYLES: Record<TicketPriority, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-50 text-blue-600",
  high: "bg-orange-50 text-orange-600",
  urgent: "bg-red-50 text-red-600",
};

// ── Status badge ───────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<TicketStatus, { cls: string; icon: React.ReactNode }> = {
  open: { cls: "bg-blue-50 text-blue-600", icon: <MessageSquare className="w-3 h-3" /> },
  in_progress: { cls: "bg-yellow-50 text-yellow-700", icon: <Clock className="w-3 h-3" /> },
  waiting_on_user: { cls: "bg-purple-50 text-purple-600", icon: <AlertCircle className="w-3 h-3" /> },
  resolved: { cls: "bg-green-50 text-green-600", icon: <CheckCircle2 className="w-3 h-3" /> },
  closed: { cls: "bg-gray-100 text-gray-500", icon: <XCircle className="w-3 h-3" /> },
};

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  waiting_on_user: "Waiting",
  resolved: "Resolved",
  closed: "Closed",
};

const CATEGORY_LABELS: Record<string, string> = {
  general_enquiry: "General",
  booking_issue: "Booking",
  payment_issue: "Payment",
  account_issue: "Account",
  dispute: "Dispute",
  other: "Other",
};

const filterTabs: { label: string; value: TicketStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Waiting", value: "waiting_on_user" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
];

// ── Page ───────────────────────────────────────────────────────────────────────
const SupportTicketsPage = () => {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<TicketStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;

  const { getAllTickets } = useAdminTickets();
  const { data, isPending } = getAllTickets(
    activeStatus !== "all"
      ? { status: activeStatus, page: currentPage, limit: LIMIT }
      : { page: currentPage, limit: LIMIT }
  );

  const tickets = data?.data ?? [];
  const total = data?.total ?? 0;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and respond to all platform support requests
          </p>
        </div>
        <button
          onClick={() => downloadReport("bookings")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* ── Status Filters ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => { setActiveStatus(tab.value); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeStatus === tab.value
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────────── */}
      <Wrapper className="overflow-hidden !p-0 shadow-sm border border-gray-100">
        {isPending ? (
          <div className="p-5"><SkeletonTableLoader /></div>
        ) : tickets.length === 0 ? (
          <EmptyTickets />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tickets.map((ticket) => {
                    const statusInfo = STATUS_STYLES[ticket.status] ?? STATUS_STYLES.open;
                    return (
                      <tr
                        key={ticket._id}
                        className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                        onClick={() => router.push(`/admin/dashboard/support-tickets/${ticket._id}`)}
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">{ticket.subject}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-gray-600">{CATEGORY_LABELS[ticket.category] ?? ticket.category}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${PRIORITY_STYLES[ticket.priority] ?? ""}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.cls}`}>
                            {statusInfo.icon}
                            {STATUS_LABELS[ticket.status]}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-gray-700">
                            {ticket.userId
                              ? `${ticket.userId.firstName} ${ticket.userId.lastName}`
                              : "—"}
                          </p>
                          {ticket.userId?.email && (
                            <p className="text-xs text-gray-400 mt-0.5">{ticket.userId.email}</p>
                          )}
                        </td>
                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap">{formatDate(ticket.createdAt)}</td>
                        <td className="px-4 py-4">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {tickets.map((ticket) => {
                const statusInfo = STATUS_STYLES[ticket.status] ?? STATUS_STYLES.open;
                return (
                  <div
                    key={ticket._id}
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => router.push(`/admin/dashboard/support-tickets/${ticket._id}`)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-gray-900 text-sm line-clamp-2 flex-1">{ticket.subject}</p>
                      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.cls}`}>
                        {statusInfo.icon}
                        {STATUS_LABELS[ticket.status]}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${PRIORITY_STYLES[ticket.priority] ?? ""}`}>
                        {ticket.priority}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(ticket.createdAt)}</span>
                    </div>
                    {ticket.userId && (
                      <p className="mt-1.5 text-xs text-gray-500">
                        {ticket.userId.firstName} {ticket.userId.lastName}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-5 pb-4 pt-2">
              <Pagination
                currentPage={currentPage}
                totalEntries={total}
                entriesPerPage={LIMIT}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </Wrapper>
    </section>
  );
};

const EmptyTickets = () => (
  <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
      <MessageSquare className="w-6 h-6" />
    </div>
    <p className="text-sm">No support tickets found</p>
  </div>
);

export default SupportTicketsPage;
