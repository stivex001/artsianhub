"use client";

import { useAppointments } from "@/api/crud/appointments";
import { Descriptions } from "@/components/shared/Headings";
import { ReusableTable } from "@/components/shared/ResuableTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { TabComponent } from "@/components/shared/TabComponent";
import Wrapper from "@/components/shared/Wrapper";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { useState } from "react";

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
    render: (value: any, row: any) => (
      <div className="flex items-center gap-3">
        <div className="">
          {row?.clientId?.profilePicture ? (
            <div className="w-10 h-10 relative overflow-hidden">
              <Image
                src={row?.clientId?.profilePicture}
                alt={row?.clientId?.firstName}
                fill
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
              {row?.clientId?.firstName?.charAt(0)}
              {row?.clientId?.lastName?.charAt(0)}
            </div>
          )}
        </div>
        <div className="">
          <div className="text-sm  text-body">
            {row?.clientId?.firstName} {row?.clientId?.lastName}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "contact",
    header: "Contact",
    render: (value: any, row: any) => (
      <div>
        <div className="text-sm text-gray-900">{row?.email}</div>
        {/* <div className="text-sm text-gray-500">{row?.clientId?.phoneNumber}</div> */}
      </div>
    ),
  },
  {
    key: "services",
    header: "Job Description",
    render: (value: any, row: any) => (
      <span className="text-sm text-gray-900 line-clamp-1">
        {row?.description}
      </span>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (value: any) => (
      <span className="text-sm text-gray-900 line-clamp-1">{value}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (value: any) => <StatusBadge status={value} />,
  },
  {
    key: "date",
    header: "Date",
    render: (value: any, row: any) => (
      <div>
        <div className="text-sm text-gray-900">
          {formatDate(row?.preferredDate)}
        </div>
        <div className="text-sm text-gray-500">{row?.preferredTime}</div>
      </div>
    ),
  },
];

const ManageAppointment = (props: Props) => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { getMyBookings } = useAppointments();
  const { data: booking, isPending } = getMyBookings();
  const appointments = booking?.data;

  const filteredAppointments = appointments?.filter((appointment) => {
    const matchesTab = activeTab === "all" || appointment?.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      appointment?.description
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      appointment?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <section className="flex flex-col gap-5">
      <Descriptions
        title="Appointment"
        desc="View and manage your client appointments"
      />

      <Wrapper className="flex flex-col gap-4 overflow-hidden no-scrollbar scrollbar-hidden">
        <TabComponent
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <ReusableTable
          columns={columns}
          data={filteredAppointments ?? []}
          searchable={true}
          searchPlaceholder="Search appointment"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          pagination={{
            currentPage: currentPage,
            totalPages: 10,
            onPageChange: setCurrentPage,
          }}
          url="/artisan/dashboard/manage-appointment"
          loading={isPending}
        />
      </Wrapper>
    </section>
  );
};

export default ManageAppointment;
