"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Megaphone, Users, MessageSquare, Loader2, RotateCcw } from "lucide-react";
import { useAdminTickets } from "@/apis/crud/admin";
import { OUTREACH_MESSAGE_TYPES } from "@/components/admin/tickets/ticket-constants";
import MultiRecipientPicker from "@/components/admin/broadcast/MultiRecipientPicker";
import RichTextEditor from "@/components/shared/RichTextEditor";
import {
  MESSAGE_TYPE_META,
  ROLE_OPTIONS,
  BROADCAST_TIPS,
  SUBJECT_MAX_LENGTH,
  PREVIEW_MAX_RECIPIENTS,
} from "@/components/admin/broadcast/broadcast-constants";
import type { Role, Recipient } from "@/components/admin/broadcast/broadcast-types";
import { RenderHtml } from "@/utils/renderHtml";

const BroadcastMessagePage = () => {
  const { createOutreach } = useAdminTickets();
  const mutation = createOutreach();

  const [role, setRole]               = useState<Role>("artisan");
  const [recipients, setRecipients]   = useState<Recipient[]>([]);
  const [messageType, setMessageType] = useState("info");
  const [subject, setSubject]         = useState("");
  const [message, setMessage]         = useState("");

  const canSubmit =
    recipients.length > 0 && subject.trim().length > 0 && message.trim().length > 0;

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setRecipients([]);
  };

  const handleReset = () => {
    setRecipients([]);
    setMessageType("info");
    setSubject("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      await mutation.mutateAsync({
        recipientIds: recipients.map((r) => r.id),
        recipientRole: role,
        messageType,
        subject: subject.trim(),
        message,
      });
      toast.success(
        `Broadcast sent to ${recipients.length} recipient${recipients.length !== 1 ? "s" : ""}.`
      );
      handleReset();
    } catch {
      toast.error("Failed to send broadcast. Please try again.");
    }
  };

  const typeMeta = MESSAGE_TYPE_META[messageType] ?? MESSAGE_TYPE_META.general;

  return (
    <section className="flex flex-col gap-5 h-full">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Broadcast Message</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Send targeted messages to artisans or clients on the platform
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#02198B]/[0.06] rounded-xl shrink-0 w-fit">
          <Megaphone className="w-4 h-4 text-[#02198B]" />
          <span className="text-xs font-semibold text-[#02198B]">Admin Broadcast</span>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-5 flex-1">

        {/* ── Left: form ─────────────────────────────────────────────────── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5"
        >
          {/* Role selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Recipient Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleRoleChange(opt.value)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all
                    ${role === opt.value
                      ? "bg-[#02198B]/[0.05] border-[#02198B]/20 ring-1 ring-[#02198B]/15"
                      : "bg-gray-50 border-gray-100 hover:border-gray-200"
                    }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                    ${role === opt.value ? "bg-[#02198B]/10" : "bg-gray-100"}`}>
                    <Users className={`w-4 h-4 ${role === opt.value ? "text-[#02198B]" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold leading-tight
                      ${role === opt.value ? "text-[#02198B]" : "text-gray-700"}`}>
                      {opt.label}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recipients */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Recipients <span className="text-red-400">*</span>
            </label>
            <MultiRecipientPicker
              role={role}
              selected={recipients}
              onChange={setRecipients}
            />
          </div>

          {/* Message type */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Message Type
            </label>
            <div className="flex flex-wrap gap-2">
              {OUTREACH_MESSAGE_TYPES.map((t) => {
                const meta = MESSAGE_TYPE_META[t] ?? MESSAGE_TYPE_META.general;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setMessageType(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                      ${messageType === t
                        ? meta.badge
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                  >
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Subject <span className="text-red-400">*</span>
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Platform Update Scheduled"
              maxLength={SUBJECT_MAX_LENGTH}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900
                focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition-all"
            />
            <p className="text-[11px] text-gray-400 text-right">
              {subject.length}/{SUBJECT_MAX_LENGTH}
            </p>
          </div>

          {/* Message — Rich Text Editor */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Message <span className="text-red-400">*</span>
            </label>
            <RichTextEditor
              value={message}
              onChange={setMessage}
              placeholder="Write your broadcast message here…"
              maxLength={1000}
              minHeight="160px"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100 mt-auto">
            <button
              type="button"
              onClick={handleReset}
              disabled={mutation.isPending}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-500
                hover:bg-gray-100 transition-colors disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="submit"
              disabled={mutation.isPending || !canSubmit}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white
                bg-[#02198B] hover:bg-[#011571] disabled:opacity-50 transition-colors shadow-sm"
            >
              {mutation.isPending
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Send className="w-4 h-4" />
              }
              {mutation.isPending
                ? "Sending…"
                : `Send to ${recipients.length > 0 ? recipients.length : "—"} recipient${recipients.length !== 1 ? "s" : ""}`
              }
            </button>
          </div>
        </motion.form>

        {/* ── Right: preview + tips ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.06 }}
          className="lg:w-80 shrink-0 flex flex-col gap-4"
        >
          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#02198B] rounded-full" />
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Message Preview
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 flex flex-col gap-3">
              {/* Type badge */}
              <span className={`w-fit text-[11px] font-semibold px-2.5 py-1 rounded-full ${typeMeta.badge}`}>
                {typeMeta.label}
              </span>

              {/* Subject */}
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Subject
                </p>
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  {subject.trim() || (
                    <span className="text-gray-300 italic font-normal">No subject yet</span>
                  )}
                </p>
              </div>

              {/* Message — rendered HTML */}
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Message
                </p>
                {message ? (
                  <RenderHtml
                    html={message}
                    className="text-xs text-gray-600 leading-relaxed rich-text-preview line-clamp-[10]"
                  />
                ) : (
                  <p className="text-xs text-gray-300 italic">No message yet</p>
                )}
              </div>

              {/* To */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  To
                </p>
                {recipients.length === 0 ? (
                  <p className="text-xs text-gray-300 italic">No recipients selected</p>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {recipients.slice(0, PREVIEW_MAX_RECIPIENTS).map((r) => (
                      <span
                        key={r.id}
                        className="text-[11px] bg-[#02198B]/[0.07] text-[#02198B] px-2 py-0.5 rounded-full font-medium truncate max-w-[140px]"
                      >
                        {r.name}
                      </span>
                    ))}
                    {recipients.length > PREVIEW_MAX_RECIPIENTS && (
                      <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                        +{recipients.length - PREVIEW_MAX_RECIPIENTS} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">Tips</p>
            </div>
            <ul className="flex flex-col gap-2">
              {BROADCAST_TIPS.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-amber-700/80">
                  <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BroadcastMessagePage;
