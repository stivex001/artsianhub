"use client";

import { useAppointments } from "@/apis/crud/appointments";
import { Descriptions } from "@/components/shared/Headings";
import AdminTable from "@/components/admin/shared/AdminTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { TabComponent } from "@/components/shared/TabComponent";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

type Props = {};

const tabs = [
  { key: "all", label: "All", count: 156 },
  { key: "Pending", label: "Pending", count: 12 },
  { key: "Accepted", label: "Accepted", count: 45 },
  { key: "scheduled", label: "Scheduled", count: 23 },
  { key: "Completed", label: "Completed", count: 67 },
  { key: "Declined", label: "Declined", count: 5 },
  { key: "Cancelled", label: "Cancelled", count: 4 },
];

const columns = [
  {
    key: "clientName",
    header: "Client Name",
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
    key: "contact",
    header: "Contact",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row?.email || "—"}</span>
    ),
  },
  {
    key: "services",
    header: "Job Description",
    render: (row: any) => (
      <span className="text-sm text-gray-600 line-clamp-1 max-w-[200px]">
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
        <span className="text-sm text-gray-900 tabular-nums">{formatDate(row?.preferredDate)}</span>
        <span className="text-xs text-gray-400">{row?.preferredTime}</span>
      </div>
    ),
  },
];

const ManageAppointment = (props: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { getMyBookings } = useAppointments();
  const { data: booking, isPending } = getMyBookings();
  const appointments = booking?.data;

  const filteredAppointments = appointments?.filter((appointment) => {
    const matchesTab = activeTab === "all" || appointment?.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      appointment?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      appointment?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="flex flex-col gap-5">
      <Descriptions
        title="Appointment"
        desc="View and manage your client appointments"
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tabs + search bar */}
        <div className="px-5 pt-4 flex flex-col gap-3">
          <TabComponent
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex items-center gap-2 py-2 px-3 w-full sm:max-w-xs border border-gray-200 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-white mb-1">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm leading-5 placeholder-gray-400 focus:outline-none"
              placeholder="Search appointment..."
            />
          </div>
        </div>

        {/* Table */}
        <AdminTable
          columns={columns}
          data={filteredAppointments ?? []}
          keyExtractor={(row: any) => row._id ?? String(Math.random())}
          onRowClick={(row: any) => router.push(`/artisan/dashboard/manage-appointment/${row._id}`)}
          loading={isPending}
          skeletonRows={8}
          emptyMessage="No appointments found"
          emptySubMessage="Try adjusting the filters or search query"
        />
      </div>
    </section>
  );
};

export default ManageAppointment;
