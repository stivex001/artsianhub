"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  X,
  CheckCheck,
  Loader2,
  UserPlus,
  UserCheck,
  Calendar,
  Star,
  MessageCircle,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { RenderHtml } from "@/utils/renderHtml";

// ─── Shared type ─────────────────────────────────────────────────────────────
export interface BaseNotification {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string | Date;
  eventType?: string;
  priority?: "low" | "medium" | "high";
}

interface NotificationModalProps {
  onClose: () => void;
  notifications: BaseNotification[];
  total: number;
  onMarkSingle: (id: string) => void;
  onMarkAll: () => void;
  isMarkingAll?: boolean;
  pendingId?: string | null;
  isLoading?: boolean;
  /** Optional "View all" deep link (e.g. "/admin/dashboard/notifications") */
  viewAllHref?: string;
}

// ─── Icon map by event type / title keyword ───────────────────────────────────
const getIcon = (
  eventType?: string,
  title?: string
): { Icon: LucideIcon; bg: string; color: string } => {
  const t = `${eventType ?? ""} ${title ?? ""}`.toLowerCase();
  if (t.includes("client_reg") || t.includes("new_client") || t.includes("client registered"))
    return { Icon: UserPlus,      bg: "bg-emerald-50", color: "text-emerald-600" };
  if (t.includes("artisan_reg") || t.includes("new_artisan") || t.includes("artisan registered"))
    return { Icon: UserCheck,     bg: "bg-blue-50",    color: "text-blue-600"    };
  if (t.includes("book"))
    return { Icon: Calendar,      bg: "bg-indigo-50",  color: "text-indigo-600"  };
  if (t.includes("review") || t.includes("rating") || t.includes("star"))
    return { Icon: Star,          bg: "bg-amber-50",   color: "text-amber-500"   };
  if (t.includes("ticket") || t.includes("support"))
    return { Icon: MessageCircle, bg: "bg-orange-50",  color: "text-orange-500"  };
  if (t.includes("payment") || t.includes("subscri"))
    return { Icon: CreditCard,    bg: "bg-purple-50",  color: "text-purple-600"  };
  if (t.includes("warn") || t.includes("alert"))
    return { Icon: AlertTriangle, bg: "bg-red-50",     color: "text-red-500"     };
  if (t.includes("complet") || t.includes("success"))
    return { Icon: CheckCircle2,  bg: "bg-green-50",   color: "text-green-600"   };
  return { Icon: Bell, bg: "bg-[#02198B]/[0.06]", color: "text-[#02198B]" };
};

// ─── Priority dot ─────────────────────────────────────────────────────────────
const PRIORITY_DOT: Record<string, string> = {
  high:   "bg-red-400",
  medium: "bg-amber-400",
  low:    "bg-gray-300",
};

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const SkeletonItem = () => (
  <div className="flex items-start gap-3 px-4 py-3.5 animate-pulse">
    <div className="w-9 h-9 rounded-xl bg-gray-100 shrink-0" />
    <div className="flex-1 space-y-2 pt-0.5">
      <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      <div className="h-2.5 bg-gray-100 rounded-full w-full" />
      <div className="h-2.5 bg-gray-100 rounded-full w-1/3" />
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export const NotificationModal = ({
  onClose,
  notifications,
  total,
  onMarkSingle,
  onMarkAll,
  isMarkingAll,
  pendingId,
  isLoading,
  viewAllHref,
}: NotificationModalProps) => {
  const modalRef                    = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab]   = useState<"all" | "unread">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const visibleItems =
    activeTab === "unread" ? notifications.filter((n) => !n.read) : notifications;

  // ── Close on outside click ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-[calc(100%+10px)] w-[22rem] sm:w-96 bg-white
        rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#02198B]/[0.07] flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 text-[#02198B]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <p className="text-[11px] text-gray-400 leading-none mt-0.5">
                {unreadCount} unread
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400
            hover:text-gray-700 hover:bg-gray-100 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50/60">
        {(["all", "unread"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all
              ${activeTab === tab
                ? "bg-[#02198B] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
          >
            {tab === "all"
              ? `All${total > 0 ? ` (${total})` : ""}`
              : `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}`
            }
          </button>
        ))}
      </div>

      {/* ── List ───────────────────────────────────────────────────────────── */}
      <div className="overflow-y-auto max-h-[360px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[0, 1, 2].map((i) => <SkeletonItem key={i} />)}
            </motion.div>
          ) : visibleItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="flex flex-col items-center justify-center py-12 px-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-gray-500">
                {activeTab === "unread" ? "No unread notifications" : "You're all caught up"}
              </p>
              <p className="text-xs text-gray-400 mt-1 text-center">
                {activeTab === "unread"
                  ? "All notifications have been read."
                  : "New notifications will appear here."}
              </p>
            </motion.div>
          ) : (
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {visibleItems.map((n, idx) => {
                const { Icon, bg, color } = getIcon(n.eventType, n.title);
                const isMarkingThis = pendingId === n._id;
                const isExpanded    = expandedId === n._id;
                const timeAgo       = n.createdAt
                  ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })
                  : "";

                const handleClick = () => {
                  setExpandedId(isExpanded ? null : n._id);
                  if (!n.read) onMarkSingle(n._id);
                };

                return (
                  <motion.div
                    key={n._id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`border-b border-gray-50 transition-colors
                      ${!n.read
                        ? "bg-[#02198B]/[0.025] border-l-2 border-l-[#02198B]/40"
                        : ""
                      }`}
                  >
                    {/* ── Clickable header row ────────────────────────── */}
                    <button
                      onClick={handleClick}
                      className={`w-full flex items-start gap-3 px-4 py-3.5 text-left
                        transition-colors cursor-pointer
                        ${!n.read ? "hover:bg-[#02198B]/[0.04]" : "hover:bg-gray-50/70"}`}
                    >
                      {/* Icon circle */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${bg}`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug
                          ${!n.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                          {n.title}
                        </p>

                        {/* Collapsed preview — hidden when expanded */}
                        {!isExpanded && (
                          <RenderHtml
                            html={n.message}
                            className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed
                              [&_ul]:list-disc [&_ul]:pl-3 [&_ol]:list-decimal [&_ol]:pl-3
                              [&_li]:mb-0 [&_p]:mb-0 [&_strong]:font-semibold"
                          />
                        )}

                        <p className="text-[11px] text-gray-400 mt-1">{timeAgo}</p>
                      </div>

                      {/* Right: unread dot / spinner / chevron */}
                      <div className="shrink-0 flex flex-col items-center gap-1.5 mt-1">
                        {isMarkingThis ? (
                          <Loader2 className="w-3.5 h-3.5 text-[#02198B] animate-spin" />
                        ) : !n.read ? (
                          <span className="w-2 h-2 rounded-full bg-[#02198B] block" />
                        ) : null}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </motion.div>
                        {/* Priority dot */}
                        {n.priority && n.priority !== "low" && (
                          <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[n.priority] ?? ""}`} />
                        )}
                      </div>
                    </button>

                    {/* ── Expanded full message ───────────────────────── */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pl-[3.25rem]">
                            <RenderHtml
                              html={n.message}
                              className="text-xs text-gray-700 leading-relaxed rich-text-preview
                                [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mt-1 [&_ul]:mb-1
                                [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mt-1 [&_ol]:mb-1
                                [&_li]:mb-1 [&_p]:mb-1 [&_strong]:font-semibold
                                [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:text-sm [&_h2]:mb-1
                                [&_a]:text-[#02198B] [&_a]:underline"
                            />
                            <button
                              onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                              className="mt-2 text-[11px] font-semibold text-[#02198B]/70
                                hover:text-[#02198B] transition-colors"
                            >
                              Show less
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      {!isLoading && notifications.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/40">
          <button
            onClick={onMarkAll}
            disabled={isMarkingAll || unreadCount === 0}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-all
              disabled:opacity-40 disabled:cursor-not-allowed
              ${unreadCount > 0
                ? "text-[#02198B] hover:text-[#011571]"
                : "text-gray-400"
              }`}
          >
            {isMarkingAll
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <CheckCheck className="w-3.5 h-3.5" />
            }
            Mark all read
          </button>

          {viewAllHref && (
            <Link
              href={viewAllHref}
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-semibold text-gray-500
                hover:text-[#02198B] transition-colors"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
};
