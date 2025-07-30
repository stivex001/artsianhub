"use client";
import { useAppointments } from "@/api/crud/appointments";
import { AppointmentCard } from "@/components/Client/manageJob/AppointmentCard";
import { ResuablePagination } from "@/components/shared/ResuablePagination";
import { TabComponent } from "@/components/shared/TabComponent";
import Wrapper from "@/components/shared/Wrapper";
import { Search } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const tabs = [
  { key: "all", label: "All", count: 156 },
  { key: "Pending", label: "Pending", count: 45 },
  { key: "accepted", label: "Accepted", count: 45 },
  { key: "inprogress", label: "In Progress", count: 23 },
  { key: "completed", label: "Completed", count: 67 },
  { key: "cancelled", label: "Cancelled", count: 4 },
];



const ManageJob = (props: Props) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = true;

  const { getMyBookings } = useAppointments();
  const { data: booking, isPending } = getMyBookings();
  const appointments = booking?.data

  console.log(booking, "booking__");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Filter appointments based on active tab and search query
  const filteredAppointments = appointments?.filter((appointment) => {
    const matchesTab = activeTab === "all" || appointment?.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      appointment?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      appointment?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <Wrapper className="flex flex-col gap-4">
      <TabComponent
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex items-center gap-2 py-2 px-3 lg:w-[320px] border border-gray-300 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <div className="pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
          placeholder="Search appointment"
        />
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAppointments?.map((appointment) => (
          <AppointmentCard key={appointment?._id} appointment={appointment} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAppointments?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No appointments found matching your criteria.
          </p>
        </div>
      )}

      {pagination && (
        <ResuablePagination
          pagination={{
            currentPage: currentPage,
            totalPages: 10,
            onPageChange: setCurrentPage,
          }}
        />
      )}
    </Wrapper>
  );
};

export default ManageJob;
