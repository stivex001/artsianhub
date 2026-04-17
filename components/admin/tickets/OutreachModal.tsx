"use client";

import React, { useState } from "react";
import { useAdminTickets } from "@/apis/crud/admin";
import { toast } from "sonner";
import { Send, X } from "lucide-react";
import { OUTREACH_MESSAGE_TYPES } from "./ticket-constants";
import RecipientPicker from "./RecipientPicker";

interface Props {
  onClose: () => void;
}

const OutreachModal = ({ onClose }: Props) => {
  const { createOutreach } = useAdminTickets();
  const outreachMutation = createOutreach();

  const [form, setForm] = useState({
    recipientId:   "",
    recipientRole: "client" as "client" | "artisan",
    messageType:   "general",
    subject:       "",
    message:       "",
  });

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm((p) => ({ ...p, recipientRole: e.target.value as "client" | "artisan", recipientId: "" }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.recipientId || !form.subject.trim() || !form.message.trim()) return;
    try {
      await outreachMutation.mutateAsync(form);
      toast.success("Outreach message sent");
      onClose();
    } catch {
      toast.error("Failed to send outreach");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="font-semibold text-gray-900">Create Outreach</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Recipient Role</label>
            <select
              value={form.recipientRole}
              onChange={handleRoleChange}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="client">Client</option>
              <option value="artisan">Artisan</option>
            </select>
          </div>

          <RecipientPicker
            role={form.recipientRole}
            value={form.recipientId}
            onChange={(id) => setForm((p) => ({ ...p, recipientId: id }))}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Message Type</label>
            <select
              value={form.messageType}
              onChange={set("messageType")}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {OUTREACH_MESSAGE_TYPES.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Subject</label>
            <input
              value={form.subject}
              onChange={set("subject")}
              placeholder="e.g. Welcome to ArtisansHub!"
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Message</label>
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={4}
              placeholder="Write your outreach message…"
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={outreachMutation.isPending || !form.recipientId}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
              {outreachMutation.isPending ? "Sending…" : "Send Outreach"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OutreachModal;
