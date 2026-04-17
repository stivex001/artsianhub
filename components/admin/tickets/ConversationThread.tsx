"use client";

import React, { useState } from "react";
import { useAdminTickets, TicketMessage, Ticket } from "@/apis/crud/admin";
import { toast } from "sonner";
import { Send, Lock, Unlock, User, CheckCircle2, RefreshCw } from "lucide-react";
import { ROLE_LABEL, formatTicketDateTime } from "./ticket-constants";

interface Props {
  ticket: Ticket;
  ticketId: string;
  messages: TicketMessage[];
  onRefetch: () => void;
}

const ConversationThread = ({ ticket, ticketId, messages, onRefetch }: Props) => {
  const { replyToTicket } = useAdminTickets();
  const replyMutation = replyToTicket(ticketId);

  const [replyText, setReplyText]   = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [sending, setSending]       = useState(false);

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await replyMutation.mutateAsync({ message: replyText.trim(), internal: isInternal });
      setReplyText("");
      toast.success(isInternal ? "Internal note added" : "Reply sent");
      onRefetch();
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-sm">
          Conversation
          {messages.length > 0 && (
            <span className="ml-2 text-xs font-normal text-gray-400">
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </span>
          )}
        </h3>
        <button onClick={onRefetch} className="text-gray-400 hover:text-gray-600 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="divide-y divide-gray-50 max-h-[480px] overflow-y-auto">
        {/* Original description */}
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-medium text-sm text-gray-900 capitalize">{ticket.raisedByRole}</span>
                <span className="text-xs text-gray-400">{formatTicketDateTime(ticket.createdAt)}</span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Original</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
            </div>
          </div>
        </div>

        {/* Replies */}
        {messages.length > 0 ? messages.map((msg) => {
          const isAdminSender = ["admin", "super_admin"].includes(msg.senderRole);
          return (
            <div key={msg._id} className={`p-5 ${msg.internal ? "bg-amber-50/40" : ""}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.internal ? "bg-amber-100" : isAdminSender ? "bg-green-100" : "bg-primary/10"
                }`}>
                  {msg.internal ? (
                    <Lock className="w-4 h-4 text-amber-600" />
                  ) : isAdminSender ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="font-medium text-sm text-gray-900">
                      {ROLE_LABEL[msg.senderRole] ?? msg.senderRole}
                    </span>
                    <span className="text-xs text-gray-400">{formatTicketDateTime(msg.createdAt)}</span>
                    {msg.internal && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                        Internal Note
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{msg.message}</p>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="p-8 text-center text-gray-400 text-sm">No replies yet</div>
        )}
      </div>

      {/* Reply composer */}
      <div className="border-t border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setIsInternal(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !isInternal ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Unlock className="w-3 h-3" />Reply to User
          </button>
          <button
            onClick={() => setIsInternal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isInternal ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Lock className="w-3 h-3" />Internal Note
          </button>
        </div>
        <div className="flex gap-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSendReply(); }}
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
            <Lock className="w-3 h-3" />This note is only visible to admin staff
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1.5">⌘ + Enter to send</p>
      </div>
    </div>
  );
};

export default ConversationThread;
