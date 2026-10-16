"use client";

import { CalendarDays, MapPin, RefreshCw } from "lucide-react";
import AdminTable, { TableColumn } from "@/components/admin/shared/AdminTable";
import { BookingStatusBadge } from "@/components/admin/shared/badges";
import { formatDateTime } from "@/utils/formatDate";
import { ClientBooking } from "@/apis/crud/adminTypes";

export const BOOKING_COLUMNS: TableColumn<ClientBooking>[] = [
  {
    key: "description",
    header: "Description",
    className: "max-w-[200px] whitespace-normal",
    render: (row) => (
      <p className="text-gray-900 line-clamp-2 leading-snug">{row.description || "—"}</p>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (row) => (
      <div className="flex items-center gap-1.5 text-gray-500">
        <MapPin className="w-3.5 h-3.5 text-gray-300 shrink-0" />
        {row.location || "—"}
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <BookingStatusBadge status={row.status} />,
  },
  {
    key: "preferredDateTime",
    header: "Scheduled",
    render: (row) => (
      <span className="text-gray-500 text-xs">
        {formatDateTime(row.preferredDateTime ?? row.createdAt)}
      </span>
    ),
  },
];

interface ClientRecentBookingsProps {
  bookings: ClientBooking[];
  onRefresh: () => void;
}

const ClientRecentBookings = ({ bookings, onRefresh }: ClientRecentBookingsProps) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
      <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
        <CalendarDays className="w-4 h-4 text-gray-400" />
        Recent Bookings
        {bookings.length > 0 && (
          <span className="text-[11px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-medium">
            {bookings.length}
          </span>
        )}
      </h3>
      <button
        onClick={onRefresh}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        title="Refresh"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>

    <AdminTable
      columns={BOOKING_COLUMNS}
      data={bookings}
      keyExtractor={(b) => b._id}
      emptyMessage="No bookings found"
      skeletonRows={4}
    />
  </div>
);

export default ClientRecentBookings;
