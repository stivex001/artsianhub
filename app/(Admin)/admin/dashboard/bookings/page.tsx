"use client";

import React, { useState } from "react";
import { useAdminBookings, BOOKING_STATUSES, BookingStatus, downloadReport } from "@/api/crud/admin";
import Wrapper from "@/components/shared/Wrapper";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  SlidersHorizontal,
  Download,
  DollarSign,
} from "lucide-react";

// ── Status helpers ─────────────────────────────────────────────────────────────
const STATUS_COLORS: Partial<Record<BookingStatus, string>> = {
  Pending: "bg-yellow-50 text-yellow-700",
  Accepted: "bg-blue-50 text-blue-600",
  "In Progress": "bg-purple-50 text-purple-600",
  Completed: "bg-green-50 text-green-600",
  Declined: "bg-red-50 text-red-600",
  Rescheduled: "bg-cyan-50 text-cyan-600",
  "Cancelled (Client)": "bg-gray-100 text-gray-500",
  "Cancelled (Artisan)": "bg-gray-100 text-gray-500",
  "No Show (Artisan)": "bg-orange-50 text-orange-600",
  "No Show (Client)": "bg-orange-50 text-orange-600",
};

const filterTabs: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "Accepted", value: "Accepted" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Declined", value: "Declined" },
  { label: "Cancelled", value: "Cancelled (Client)" },
];

const BookingsPage = () => {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<BookingStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;

  const { getAllBookings } = useAdminBookings();
  const { data, isPending } = getAllBookings(
    activeStatus !== "all"
      ? { status: activeStatus, page: currentPage, limit: LIMIT }
      : { page: currentPage, limit: LIMIT }
  );

  const bookings = data?.data ?? [];
  const total = data?.total ?? 0;

  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <section className="flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Monitor all transactions between artisans and clients
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
        ) : bookings.length === 0 ? (
          <EmptyBookings />
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Artisan</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/admin/dashboard/bookings/${booking._id}`)}
                    >
                      <td className="px-5 py-4">
                        {booking.clientId ? (
                          <div>
                            <p className="font-medium text-gray-900">{booking.clientId.firstName} {booking.clientId.lastName}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{booking.clientId.email}</p>
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-4">
                        {booking.artisanId ? (
                          <div>
                            <p className="font-medium text-gray-900">{booking.artisanId.firstName} {booking.artisanId.lastName}</p>
                            {booking.artisanId.professionalTitle && (
                              <p className="text-xs text-gray-400 mt-0.5">{booking.artisanId.professionalTitle}</p>
                            )}
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-4 text-gray-600">{booking.serviceType ?? "—"}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[booking.status] ?? "bg-gray-100 text-gray-500"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(booking.scheduledDate ?? booking.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        {booking.totalAmount ? (
                          <div className="flex items-center gap-1 font-medium text-gray-900">
                            <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                            {booking.totalAmount.toLocaleString()}
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-4">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/admin/dashboard/bookings/${booking._id}`)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">
                        {booking.clientId
                          ? `${booking.clientId.firstName} ${booking.clientId.lastName}`
                          : "Unknown Client"}
                      </p>
                      {booking.artisanId && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          → {booking.artisanId.firstName} {booking.artisanId.lastName}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[booking.status] ?? "bg-gray-100 text-gray-500"}`}>
                      {booking.status}
                    </span>
                    {booking.totalAmount && (
                      <span className="text-xs text-gray-600 font-medium">${booking.totalAmount}</span>
                    )}
                    <span className="text-xs text-gray-400">
                      {formatDate(booking.scheduledDate ?? booking.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
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
