"use client";

import React, { useState, useMemo } from "react";
import { useAdminBookings, BOOKING_STATUSES, BookingStatus, downloadReport, Booking } from "@/apis/crud/admin";
import { useAuthStore } from "@/store/authStore";
import Wrapper from "@/components/shared/Wrapper";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Download,
  MapPin,
  Users,
} from "lucide-react";

// ── Status helpers ─────────────────────────────────────────────────────────────
export const STATUS_COLORS: Partial<Record<BookingStatus, string>> = {
  Pending:              "bg-yellow-50 text-yellow-700",
  Accepted:             "bg-blue-50 text-blue-600",
  "In Progress":        "bg-purple-50 text-purple-600",
  Completed:            "bg-green-50 text-green-600",
  Declined:             "bg-red-50 text-red-600",
  Rescheduled:          "bg-cyan-50 text-cyan-600",
  "Cancelled (Client)": "bg-gray-100 text-gray-500",
  "Cancelled (Artisan)":"bg-gray-100 text-gray-500",
  "No Show (Artisan)":  "bg-orange-50 text-orange-600",
  "No Show (Client)":   "bg-orange-50 text-orange-600",
};

const filterTabs: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All",         value: "all"              },
  { label: "Pending",     value: "Pending"           },
  { label: "Accepted",    value: "Accepted"          },
  { label: "In Progress", value: "In Progress"       },
  { label: "Completed",   value: "Completed"         },
  { label: "Declined",    value: "Declined"          },
  { label: "Cancelled",   value: "Cancelled (Client)"},
];

const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const truncate = (str?: string, max = 40) =>
  str && str.length > max ? str.slice(0, max) + "…" : str ?? "—";

// ── Grouping types ─────────────────────────────────────────────────────────────
interface ClientGroup {
  key: string;
  clientId: string | null;
  clientName: string;
  initials: string;
  bookings: Booking[];
}

function groupByClient(bookings: Booking[]): ClientGroup[] {
  const map = new Map<string, ClientGroup>();
  for (const b of bookings) {
    const key = b.clientId?._id ?? `anon:${b.email}`;
    if (!map.has(key)) {
      const firstName = b.clientId?.firstName ?? "";
      const lastName  = b.clientId?.lastName  ?? "";
      map.set(key, {
        key,
        clientId: b.clientId?._id ?? null,
        clientName: b.clientId ? `${firstName} ${lastName}` : "Unknown Client",
        initials: b.clientId
          ? `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()
          : "?",
        bookings: [],
      });
    }
    map.get(key)!.bookings.push(b);
  }
  return Array.from(map.values());
}

// ── Page ───────────────────────────────────────────────────────────────────────
const BookingsPage = () => {
  const { currentUser } = useAuthStore();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<BookingStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const LIMIT = 10;

  const { getAllBookings } = useAdminBookings();
  const { data, isPending } = getAllBookings(
    activeStatus !== "all"
      ? { status: activeStatus, page: currentPage, limit: LIMIT }
      : { page: currentPage, limit: LIMIT }
  );

  const bookings = data?.data ?? [];
  const total    = data?.total ?? bookings.length;

  const groups = useMemo(() => {
    const g = groupByClient(bookings);
    // Default: expand all groups
    if (expandedGroups.size === 0 && g.length > 0) {
      setExpandedGroups(new Set(g.map((gr) => gr.key)));
    }
    return g;
  }, [bookings]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <section className="flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Monitor all service bookings between artisans and clients
          </p>
        </div>
        {isSuperAdmin && (
          <button
            onClick={() => downloadReport("bookings")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* ── Filter Tabs ─────────────────────────────────────────────── */}
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
        ) : groups.length === 0 ? (
          <EmptyBookings />
        ) : (
          <>
            {/* Desktop grouped table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]">Client</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Artisan</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled</th>
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group) => {
                    const isExpanded = expandedGroups.has(group.key);
                    return (
                      <React.Fragment key={group.key}>
                        {/* ── Group header row ── */}
                        <tr
                          className="bg-gray-50/80 border-t border-b border-gray-100 cursor-pointer hover:bg-gray-100/60 transition-colors"
                          onClick={() => toggleGroup(group.key)}
                        >
                          <td className="px-5 py-3" colSpan={5}>
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-xs">
                                {group.initials}
                              </div>
                              <p className="font-semibold text-gray-800 text-sm">
                                {group.clientName}
                              </p>
                              <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                                {group.bookings.length} booking{group.bookings.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </td>
                        </tr>

                        {/* ── Booking sub-rows ── */}
                        {isExpanded &&
                          group.bookings.map((booking, idx) => (
                            <tr
                              key={booking._id}
                              className={`hover:bg-gray-50/70 cursor-pointer transition-colors ${
                                idx < group.bookings.length - 1 ? "border-b border-gray-50" : ""
                              }`}
                              onClick={() => router.push(`/admin/dashboard/bookings/${booking._id}`)}
                            >
                              {/* Indent spacer in client column */}
                              <td className="px-5 py-3.5">
                                <div className="pl-10 flex items-center gap-1.5 text-xs text-gray-400">
                                  <div className="w-px h-4 bg-gray-200 mr-1" />
                                  #{idx + 1}
                                </div>
                              </td>

                              {/* Artisan */}
                              <td className="px-4 py-3.5">
                                {booking.artisanId ? (
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {booking.artisanId.firstName} {booking.artisanId.lastName}
                                    </p>
                                    {booking.artisanId.professionalTitle && (
                                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[140px]">
                                        {booking.artisanId.professionalTitle}
                                      </p>
                                    )}
                                  </div>
                                ) : <span className="text-gray-400 text-xs">—</span>}
                              </td>

                              {/* Description */}
                              <td className="px-4 py-3.5">
                                <p className="text-gray-700 text-sm max-w-[200px] truncate" title={booking.description}>
                                  {truncate(booking.description)}
                                </p>
                                {booking.location && (
                                  <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span className="truncate max-w-[160px]">{booking.location}</span>
                                  </div>
                                )}
                              </td>

                              {/* Status */}
                              <td className="px-4 py-3.5">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${STATUS_COLORS[booking.status] ?? "bg-gray-100 text-gray-500"}`}>
                                  {booking.status}
                                </span>
                                {booking.escalatedToSuperAdmin && (
                                  <p className="text-[10px] text-orange-500 font-medium mt-1">Escalated</p>
                                )}
                              </td>

                              {/* Scheduled */}
                              <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap text-sm">
                                {formatDate(booking.preferredDateTime ?? booking.preferredDate ?? booking.createdAt)}
                                {booking.preferredTime && (
                                  <p className="text-xs text-gray-400 mt-0.5">{booking.preferredTime}</p>
                                )}
                              </td>

                              <td className="px-4 py-3.5">
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </td>
                            </tr>
                          ))
                        }
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile grouped cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {groups.map((group) => {
                const isExpanded = expandedGroups.has(group.key);
                return (
                  <div key={group.key}>
                    {/* Group header */}
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50/80 hover:bg-gray-100/60 transition-colors"
                      onClick={() => toggleGroup(group.key)}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-xs">
                          {group.initials}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-800 text-sm">{group.clientName}</p>
                          <p className="text-xs text-gray-400">{group.bookings.length} booking{group.bookings.length !== 1 ? "s" : ""}</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Booking cards */}
                    {isExpanded && (
                      <div className="divide-y divide-gray-50">
                        {group.bookings.map((booking) => (
                          <div
                            key={booking._id}
                            className="px-4 py-3.5 pl-8 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => router.push(`/admin/dashboard/bookings/${booking._id}`)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                {booking.artisanId && (
                                  <p className="text-xs text-gray-500 mb-0.5">
                                    → {booking.artisanId.firstName} {booking.artisanId.lastName}
                                  </p>
                                )}
                                {booking.description && (
                                  <p className="text-sm text-gray-700 truncate">{booking.description}</p>
                                )}
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2 items-center">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[booking.status] ?? "bg-gray-100 text-gray-500"}`}>
                                {booking.status}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatDate(booking.preferredDateTime ?? booking.preferredDate ?? booking.createdAt)}
                              </span>
                              {booking.escalatedToSuperAdmin && (
                                <span className="text-[10px] text-orange-500 font-medium">Escalated</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
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

const EmptyBookings = () => (
  <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
      <CalendarDays className="w-6 h-6" />
    </div>
    <p className="text-sm">No bookings found</p>
  </div>
);

export default BookingsPage;
