"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminTickets } from "@/apis/crud/admin";
import TicketMetaCard from "@/components/admin/tickets/TicketMetaCard";
import ConversationThread from "@/components/admin/tickets/ConversationThread";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const TicketDetailPage = () => {
  const params   = useParams();
  const router   = useRouter();
  const ticketId = params?.id as string;

  const { getTicketById } = useAdminTickets();
  const { data, isPending, refetch } = getTicketById(ticketId);

  const ticket   = data?.data?.ticket;
  const messages = data?.data?.messages ?? [];

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
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />Back
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-xs font-mono text-gray-400">{ticket.ticketId}</span>
        <span className="text-gray-300">/</span>
        <h1 className="text-base font-bold text-gray-900 line-clamp-1">{ticket.subject}</h1>
      </div>

      <TicketMetaCard ticket={ticket} ticketId={ticketId} onRefetch={refetch} />
      <ConversationThread ticket={ticket} ticketId={ticketId} messages={messages} onRefetch={refetch} />
    </section>
  );
};

export default TicketDetailPage;
