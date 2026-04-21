"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Send,
  Loader2,
  CheckCircle2,
  RotateCcw,
  HelpCircle,
  CreditCard,
  CalendarX,
  UserX,
  Swords,
  MoreHorizontal,
} from "lucide-react";
import { useAdminTickets } from "@/apis/crud/admin";
import type { TicketCategory, TicketPriority } from "@/apis/crud/adminConstants";

// ─── Enums as UI config ───────────────────────────────────────────────────────

interface CategoryOption {
  value: TicketCategory;
  label: string;
  desc: string;
  Icon: React.ElementType;
  color: string;
  bg: string;
}

const CATEGORIES: CategoryOption[] = [
  { value: "general_enquiry", label: "General Enquiry",  desc: "Questions or general info",     Icon: HelpCircle,    color: "text-blue-600",    bg: "bg-blue-50"    },
  { value: "booking_issue",   label: "Booking Issue",    desc: "Problems with appointments",    Icon: CalendarX,     color: "text-indigo-600",  bg: "bg-indigo-50"  },
  { value: "payment_issue",   label: "Payment Issue",    desc: "Billing or transaction issues", Icon: CreditCard,    color: "text-purple-600",  bg: "bg-purple-50"  },
  { value: "account_issue",   label: "Account Issue",    desc: "Login, access or profile",      Icon: UserX,         color: "text-orange-600",  bg: "bg-orange-50"  },
  { value: "dispute",         label: "Dispute",          desc: "Conflict with another user",    Icon: Swords,        color: "text-red-600",     bg: "bg-red-50"     },
  { value: "other",           label: "Other",            desc: "Something not listed above",    Icon: MoreHorizontal,color: "text-gray-600",    bg: "bg-gray-100"   },
];

interface PriorityOption {
  value: TicketPriority;
  label: string;
  badge: string;
  dot: string;
}

const PRIORITIES: PriorityOption[] = [
  { value: "low",    label: "Low",    badge: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",        dot: "bg-gray-400"   },
  { value: "medium", label: "Medium", badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",         dot: "bg-blue-500"   },
  { value: "high",   label: "High",   badge: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",   dot: "bg-orange-500" },
  { value: "urgent", label: "Urgent", badge: "bg-red-50 text-red-700 ring-1 ring-red-200",            dot: "bg-red-500"    },
];

const SUBJECT_MAX = 120;
const DESC_MAX    = 2000;

// ─── Success screen ───────────────────────────────────────────────────────────
const SuccessCard = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-6 text-center gap-5"
  >
    <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center">
      <CheckCircle2 className="w-10 h-10 text-green-500" />
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900">Ticket Submitted!</h3>
      <p className="text-sm text-gray-500 mt-1.5 max-w-xs leading-relaxed">
        Our support team has been notified and will respond shortly. You'll hear
        from us via your registered email.
      </p>
    </div>
    <button
      onClick={onReset}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-[#02198B]
        bg-[#02198B]/[0.07] hover:bg-[#02198B]/[0.12] transition-colors"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      Submit another ticket
    </button>
  </motion.div>
);

// ─── Component ────────────────────────────────────────────────────────────────
interface CreateTicketFormProps {
  /** Optional class applied to the outer card wrapper */
  className?: string;
}

export const CreateTicketForm = ({ className = "" }: CreateTicketFormProps) => {
  const { createTicket } = useAdminTickets();
  const mutation = createTicket();

  const [category, setCategory]   = useState<TicketCategory>("general_enquiry");
  const [priority, setPriority]   = useState<TicketPriority>("medium");
  const [subject, setSubject]     = useState("");
  const [message, setMessage]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    subject.trim().length > 0 && message.trim().length > 0;

  const handleReset = () => {
    setCategory("general_enquiry");
    setPriority("medium");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      await mutation.mutateAsync({ category, priority, subject: subject.trim(), message });
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err?.data?.message ?? err?.message ?? "Failed to submit ticket. Please try again.");
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SuccessCard onReset={handleReset} />
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 flex flex-col gap-6"
          >
            {/* ── Category ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Category <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map(({ value, label, desc, Icon, color, bg }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCategory(value)}
                    className={`flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all
                      ${category === value
                        ? "bg-[#02198B]/[0.04] border-[#02198B]/25 ring-1 ring-[#02198B]/15"
                        : "bg-gray-50 border-gray-100 hover:border-gray-200 hover:bg-gray-100/60"
                      }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      category === value ? "bg-[#02198B]/10" : bg
                    }`}>
                      <Icon className={`w-3.5 h-3.5 ${category === value ? "text-[#02198B]" : color}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold leading-tight ${
                        category === value ? "text-[#02198B]" : "text-gray-700"
                      }`}>
                        {label}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Priority ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Priority <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {PRIORITIES.map(({ value, label, badge, dot }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPriority(value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                      transition-all ring-offset-1 ${
                      priority === value
                        ? `${badge} scale-105`
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${priority === value ? dot : "bg-gray-400"}`} />
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-400">
                {priority === "urgent"
                  ? "Urgent tickets are escalated immediately to a senior agent."
                  : priority === "high"
                  ? "High priority tickets are addressed within 24 hours."
                  : priority === "medium"
                  ? "Medium priority tickets are addressed within 2–3 business days."
                  : "Low priority tickets are addressed within 5 business days."}
              </p>
            </div>

            {/* ── Subject ──────────────────────────────────────────────── */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your issue…"
                maxLength={SUBJECT_MAX}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition-all"
              />
              <p className="text-[11px] text-gray-400 text-right">
                {subject.length}/{SUBJECT_MAX}
              </p>
            </div>

            {/* ── Description ──────────────────────────────────────────── */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your issue in detail — include any relevant dates, transaction IDs, or steps to reproduce the problem…"
                maxLength={DESC_MAX}
                rows={6}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 resize-none
                  focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40
                  transition-all leading-relaxed"
              />
              <p className={`text-[11px] text-right transition-colors ${
                message.length >= DESC_MAX * 0.9 ? "text-orange-500" : "text-gray-400"
              }`}>
                {message.length}/{DESC_MAX}
              </p>
            </div>

            {/* ── Actions ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
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
                {mutation.isPending ? "Submitting…" : "Submit Ticket"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateTicketForm;
