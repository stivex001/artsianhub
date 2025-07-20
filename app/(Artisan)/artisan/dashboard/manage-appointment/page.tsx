"use client";

import { sampleData } from "@/components/Artisan/manageAppointment/data";
import { Descriptions } from "@/components/shared/Headings";
import { ReusableTable } from "@/components/shared/ResuableTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { TabComponent } from "@/components/shared/TabComponent";
import Wrapper from "@/components/shared/Wrapper";
import Image from "next/image";
import { useState } from "react";

type Props = {};

const tabs = [
  { key: "all", label: "All", count: 156 },
  { key: "new-requests", label: "New Requests", count: 12 },
  { key: "accepted", label: "Accepted", count: 45 },
  { key: "scheduled", label: "Scheduled", count: 23 },
  { key: "completed", label: "Completed", count: 67 },
  { key: "declined", label: "Declined", count: 5 },
  { key: "cancelled", label: "Cancelled", count: 4 },
];

const columns = [
  {
    key: "clientName",
    header: "Client Name",
    render: (value: any, row: any) => (
      <div className="flex items-center gap-3">
        <div className="">
          {row?.photo ? (
            <div className="w-10 h-10 relative overflow-hidden">
              <Image
                src={row?.photo}
                alt={row?.clientName}
                fill
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
              {row.clientName.charAt(0)}
            </div>
          )}
        </div>
        <div className="">
          <div className="text-sm  text-body">{value}</div>
        </div>
      </div>
    ),
  },
  {
    key: "contact",
    header: "Contact",
    render: (value: any) => (
      <div>
        <div className="text-sm text-gray-900">{value.email}</div>
        <div className="text-sm text-gray-500">{value.phone}</div>
      </div>
    ),
  },
  {
    key: "services",
    header: "Services",
    render: (value: any) => (
      <span className="text-sm text-gray-900">{value}</span>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (value: any) => (
      <span className="text-sm text-gray-900">{value}</span>
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
    render: (value: any) => (
      <div>
        <div className="text-sm text-gray-900">{value.date}</div>
        <div className="text-sm text-gray-500">{value.time}</div>
      </div>
    ),
  },
];

const ManageAppointment = (props: Props) => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
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
          data={sampleData}
          searchable={true}
          searchPlaceholder="Search appointment"
          onSearch={setSearchQuery}
          pagination={{
            currentPage: currentPage,
            totalPages: 10,
            onPageChange: setCurrentPage,
          }}
          url="/artisan/dashboard/manage-appointment"
        />
      </Wrapper>
    </section>
  );
};

export default ManageAppointment;
