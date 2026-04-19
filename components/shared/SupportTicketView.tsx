"use client";

import { motion } from "framer-motion";
import {
  LifeBuoy,
  Clock,
  ShieldCheck,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { CreateTicketForm } from "./CreateTicketForm";

// ─── Info panel data ──────────────────────────────────────────────────────────
const WHAT_HAPPENS = [
  {
    Icon: MessageSquare,
    bg: "bg-blue-50",
    color: "text-blue-600",
    title: "We receive your ticket",
    body: "Your issue is logged and our support team is notified immediately.",
  },
  {
    Icon: Clock,
    bg: "bg-amber-50",
    color: "text-amber-600",
    title: "We review & investigate",
    body: "An agent is assigned based on the category and priority you selected.",
  },
  {
    Icon: ShieldCheck,
    bg: "bg-green-50",
    color: "text-green-600",
    title: "You receive a resolution",
    body: "We'll respond via email and may ask follow-up questions if needed.",
  },
];

const TIPS = [
  "Be specific — include booking IDs, dates, or any relevant details.",
  "For urgent matters like blocked accounts, select Urgent priority.",
  "Each ticket is tracked independently; feel free to submit multiple.",
];

// ─── Component ────────────────────────────────────────────────────────────────
interface SupportTicketViewProps {
  /** Applied to the outer section element */
  className?: string;
}

export const SupportTicketView = ({ className = "" }: SupportTicketViewProps) => (
  <section className={`flex flex-col gap-5 ${className}`}>
    {/* ── Page header ──────────────────────────────────────────────── */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Support Ticket</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Raise an issue with our support team — we're here to help.
        </p>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#02198B]/[0.06] rounded-xl shrink-0 w-fit">
        <LifeBuoy className="w-4 h-4 text-[#02198B]" />
        <span className="text-xs font-semibold text-[#02198B]">Help &amp; Support</span>
      </div>
    </div>

    {/* ── Body: form + info panel ───────────────────────────────────── */}
    <div className="flex flex-col lg:flex-row gap-5 flex-1">

      {/* ── Left: form ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="flex-1 min-w-0"
      >
        <CreateTicketForm />
      </motion.div>

      {/* ── Right: info panel ────────────────────────────────────────  */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.07 }}
        className="lg:w-72 shrink-0 flex flex-col gap-4"
      >
        {/* What happens next */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#02198B] rounded-full" />
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              What happens next
            </p>
          </div>
          <ol className="flex flex-col gap-4">
            {WHAT_HAPPENS.map(({ Icon, bg, color, title, body }, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips */}
        <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">Tips</p>
          </div>
          <ul className="flex flex-col gap-2">
            {TIPS.map((tip, i) => (
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

export default SupportTicketView;
