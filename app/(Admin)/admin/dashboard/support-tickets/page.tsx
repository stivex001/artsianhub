"use client";

import React, { useState } from "react";
import { useAdminTickets, TicketStatus, downloadReport } from "@/apis/crud/admin";
import Wrapper from "@/components/shared/Wrapper";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import EmptyTickets from "@/components/admin/tickets/EmptyTickets";
import OutreachModal from "@/components/admin/tickets/OutreachModal";
import { PRIORITY_STYLES, STATUS_STYLES, STATUS_LABELS, CATEGORY_LABELS, ROLE_STYLES, formatTicketDate } from "@/components/admin/tickets/ticket-constants";
import { useRouter } from "next/navigation";
import { ChevronRight, SlidersHorizontal, Download, Send } from "lucide-react";

const filterTabs: { label: string; value: TicketStatus | "all" }[] = [
  { label: "All",         value: "all"             },
  { label: "Open",        value: "open"            },
  { label: "In Progress", value: "in_progress"     },
  { label: "Waiting",     value: "waiting_on_user" },
  { label: "Resolved",    value: "resolved"        },
  { label: "Closed",      value: "closed"          },
];

const SupportTicketsPage = () => {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<TicketStatus | "all">("all");
  const [currentPage, setCurrentPage]   = useState(1);
  const [showOutreach, setShowOutreach] = useState(false);
  const LIMIT = 10;

  const { getAllTickets } = useAdminTickets();
  const { data, isPending } = getAllTickets(
    activeStatus !== "all"
      ? { status: activeStatus, page: currentPage, limit: LIMIT }
      : { page: currentPage, limit: LIMIT }
  );

  const tickets = data?.data ?? [];
  const total   = data?.total ?? tickets.length;

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and respond to all platform support requests</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowOutreach(true)}
            className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary/5 transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />Create Outreach
          </button>
          <button
            onClick={() => downloadReport("tickets")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => { setActiveStatus(tab.value); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeStatus === tab.value ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <Wrapper className="overflow-hidden !p-0 shadow-sm border border-gray-100">
        {isPending ? (
          <div className="p-5"><SkeletonTableLoader /></div>
        ) : tickets.length === 0 ? (
          <EmptyTickets />
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Ticket", "Category", "Priority", "Status", "Raised By", "Assigned", "Date", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider first:px-5">{h}</th>
                    ))}
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
                          <p className="text-xs text-gray-400 mt-0.5 font-mono">{ticket.ticketId}</p>
                        </td>
                        <td className="px-4 py-4 text-gray-600 text-sm">{CATEGORY_LABELS[ticket.category] ?? ticket.category}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${PRIORITY_STYLES[ticket.priority] ?? ""}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.cls}`}>
                            {statusInfo.icon}{STATUS_LABELS[ticket.status]}
                          </span>
                          {ticket.escalatedToSuperAdmin && (
                            <p className="text-[10px] text-orange-500 font-medium mt-1">Escalated</p>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${ROLE_STYLES[ticket.raisedByRole] ?? "bg-gray-100 text-gray-500"}`}>
                            {ticket.raisedByRole}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {ticket.assignedAdminId ? (
                            <div>
                              <p className="text-sm font-medium text-gray-800">{ticket.assignedAdminId.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[140px]">{ticket.assignedAdminId.email}</p>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">Unassigned</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap text-sm">{formatTicketDate(ticket.createdAt)}</td>
                        <td className="px-4 py-4"><ChevronRight className="w-4 h-4 text-gray-400" /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden divide-y divide-gray-50">
              {tickets.map((ticket) => {
                const statusInfo = STATUS_STYLES[ticket.status] ?? STATUS_STYLES.open;
                return (
                  <div key={ticket._id} className="p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => router.push(`/admin/dashboard/support-tickets/${ticket._id}`)}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm line-clamp-2">{ticket.subject}</p>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{ticket.ticketId}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.cls}`}>
                        {statusInfo.icon}{STATUS_LABELS[ticket.status]}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${PRIORITY_STYLES[ticket.priority] ?? ""}`}>{ticket.priority}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${ROLE_STYLES[ticket.raisedByRole] ?? ""}`}>{ticket.raisedByRole}</span>
                      <span className="text-xs text-gray-400">{formatTicketDate(ticket.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-5 pb-4 pt-2">
              <Pagination currentPage={currentPage} totalEntries={total} entriesPerPage={LIMIT} onPageChange={setCurrentPage} />
            </div>
          </>
        )}
      </Wrapper>

      {showOutreach && <OutreachModal onClose={() => setShowOutreach(false)} />}
    </section>
  );
};

export default SupportTicketsPage;
