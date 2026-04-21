"use client";

import AdminTable from "@/components/admin/shared/AdminTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CalendarDays } from "lucide-react";

type Props = {
  appointments: any;
  isLoading: boolean;
};

const columns = [
  {
    key: "clientName",
    header: "Client",
    render: (row: any) => (
      <div className="flex items-center gap-3">
        {row?.clientId?.profilePicture ? (
          <div className="w-9 h-9 relative overflow-hidden shrink-0">
            <Image
              src={row.clientId.profilePicture}
              alt={row.clientId.firstName}
              fill
              className="object-cover rounded-full ring-2 ring-white shadow-sm"
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#02198B] to-[#1e3a8a] flex items-center justify-center shrink-0 ring-2 ring-white shadow-sm">
            <span className="text-[11px] font-bold text-white">
              {row?.clientId?.firstName?.charAt(0)}
              {row?.clientId?.lastName?.charAt(0)}
            </span>
          </div>
        )}
        <span className="text-sm font-medium text-gray-900">
          {row?.clientId?.firstName} {row?.clientId?.lastName}
        </span>
      </div>
    ),
  },
  {
    key: "services",
    header: "Description",
    render: (row: any) => (
      <span className="text-sm text-gray-600 line-clamp-1 max-w-[220px]">
        {row?.description || "—"}
      </span>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (row: any) => (
      <span className="text-sm text-gray-500 line-clamp-1">{row?.location || "—"}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => <StatusBadge status={row?.status} />,
  },
  {
    key: "date",
    header: "Date",
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="text-sm text-gray-900 tabular-nums">
          {formatDate(row?.preferredDate)}
        </span>
        <span className="text-xs text-gray-400">{row?.preferredTime}</span>
      </div>
    ),
  },
];

export const RecentAppointments = ({ appointments, isLoading }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Recent Appointments</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Your latest booking activity</p>
          </div>
        </div>
        <Link
          href="/artisan/dashboard/manage-appointment"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
        >
          View All
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={appointments ?? []}
        keyExtractor={(row: any) => row._id ?? row.preferredDate ?? String(Math.random())}
        onRowClick={(row: any) => router.push(`/artisan/dashboard/manage-appointment/${row._id}`)}
        loading={isLoading}
        skeletonRows={5}
        emptyMessage="No recent appointments"
        emptySubMessage="Client bookings will appear here once you receive them"
      />
    </div>
  );
};
