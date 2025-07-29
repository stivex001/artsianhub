"use client";
import { useAppointments } from "@/api/crud/appointments";
import { AppointmentCard } from "@/components/Client/manageJob/AppointmentCard";
import { ResuablePagination } from "@/components/shared/ResuablePagination";
import { TabComponent } from "@/components/shared/TabComponent";
import Wrapper from "@/components/shared/Wrapper";
import { Search, MapPin } from "lucide-react";
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

// Sample appointment data
const appointments = [
  {
    id: 1,
    title: "Plumbing Repair",
    date: "Fri Jun 20, 2024 - 8:00",
    location: "Chesterfield",
    client: {
      name: "Claire Rosalie",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    },
    status: "pending",
    attachments: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    ],
    artisanInfo: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      completedJobs: 125,
      professionalTitle: "Plumber",
      primaryLocation: "Chesterfield",
      pricePerHour: 5,
    },
    description: `Hello. I have a leaking pipe under my kitchen sink that's causing water to spread across the cabinet floor. I'm not sure where the leak is coming from exactly, but it gets worse when I run the tap. I'd like someone to come take a look and fix it as soon as possible. The area is accessible, and I've already cleared the space under the sink. If replacement parts are needed, I'm happy to cover the cost — just let me know what's required after inspection.

I'm located in Chesterfield. I'm available tomorrow morning (June 25th) between 9 AM and 12 PM, or anytime on Wednesday.

Please contact me if you need more details. Thanks!`,
  },
  {
    id: 2,
    title: "Plumbing Repair",
    date: "Fri Jun 20, 2024 - 8:00",
    location: "Chesterfield",
    client: {
      name: "Claire Rosalie",
      avatar: "/api/placeholder/32/32",
    },
    status: "inprogress",
    attachments: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    ],
    artisanInfo: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      completedJobs: 125,
      professionalTitle: "Plumber",
      primaryLocation: "Chesterfield",
      pricePerHour: 5,
    },
    description: `Hello. I have a leaking pipe under my kitchen sink that's causing water to spread across the cabinet floor. I'm not sure where the leak is coming from exactly, but it gets worse when I run the tap. I'd like someone to come take a look and fix it as soon as possible. The area is accessible, and I've already cleared the space under the sink. If replacement parts are needed, I'm happy to cover the cost — just let me know what's required after inspection.

I'm located in Chesterfield. I'm available tomorrow morning (June 25th) between 9 AM and 12 PM, or anytime on Wednesday.

Please contact me if you need more details. Thanks!`,
  },
  {
    id: 3,
    title: "Plumbing Repair",
    date: "Fri Jun 20, 2024 - 8:00",
    location: "Chesterfield",
    client: {
      name: "Claire Rosalie",
      avatar: "/api/placeholder/32/32",
    },
    status: "cancelled",
    attachments: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    ],
    artisanInfo: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      completedJobs: 125,
      professionalTitle: "Plumber",
      primaryLocation: "Chesterfield",
      pricePerHour: 5,
    },
    description: `Hello. I have a leaking pipe under my kitchen sink that's causing water to spread across the cabinet floor. I'm not sure where the leak is coming from exactly, but it gets worse when I run the tap. I'd like someone to come take a look and fix it as soon as possible. The area is accessible, and I've already cleared the space under the sink. If replacement parts are needed, I'm happy to cover the cost — just let me know what's required after inspection.

I'm located in Chesterfield. I'm available tomorrow morning (June 25th) between 9 AM and 12 PM, or anytime on Wednesday.

Please contact me if you need more details. Thanks!`,
  },
  {
    id: 4,
    title: "Plumbing Repair",
    date: "Fri Jun 20, 2024 - 8:00",
    location: "Chesterfield",
    client: {
      name: "Claire Rosalie",
      avatar: "/api/placeholder/32/32",
    },
    status: "declined",
    attachments: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    ],
    artisanInfo: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      completedJobs: 125,
      professionalTitle: "Plumber",
      primaryLocation: "Chesterfield",
      pricePerHour: 5,
    },
    description: `Hello. I have a leaking pipe under my kitchen sink that's causing water to spread across the cabinet floor. I'm not sure where the leak is coming from exactly, but it gets worse when I run the tap. I'd like someone to come take a look and fix it as soon as possible. The area is accessible, and I've already cleared the space under the sink. If replacement parts are needed, I'm happy to cover the cost — just let me know what's required after inspection.

I'm located in Chesterfield. I'm available tomorrow morning (June 25th) between 9 AM and 12 PM, or anytime on Wednesday.

Please contact me if you need more details. Thanks!`,
  },
  {
    id: 5,
    title: "Plumbing Repair",
    date: "Fri Jun 20, 2024 - 8:00",
    location: "Chesterfield",
    client: {
      name: "Claire Rosalie",
      avatar: "/api/placeholder/32/32",
    },
    status: "completed",
    attachments: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    ],
    artisanInfo: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      completedJobs: 125,
      professionalTitle: "Plumber",
      primaryLocation: "Chesterfield",
      pricePerHour: 5,
    },
    description: `Hello. I have a leaking pipe under my kitchen sink that's causing water to spread across the cabinet floor. I'm not sure where the leak is coming from exactly, but it gets worse when I run the tap. I'd like someone to come take a look and fix it as soon as possible. The area is accessible, and I've already cleared the space under the sink. If replacement parts are needed, I'm happy to cover the cost — just let me know what's required after inspection.

I'm located in Chesterfield. I'm available tomorrow morning (June 25th) between 9 AM and 12 PM, or anytime on Wednesday.

Please contact me if you need more details. Thanks!`,
  },
  {
    id: 6,
    title: "Electrical Repair",
    date: "Fri Jun 20, 2024 - 8:00",
    location: "Chesterfield",
    client: {
      name: "Claire Rosalie",
      avatar: "/api/placeholder/32/32",
    },
    status: "accepted",
    attachments: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    ],
    artisanInfo: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      completedJobs: 125,
      professionalTitle: "Plumber",
      primaryLocation: "Chesterfield",
      pricePerHour: 5,
    },
    description: `Hello. I have a leaking pipe under my kitchen sink that's causing water to spread across the cabinet floor. I'm not sure where the leak is coming from exactly, but it gets worse when I run the tap. I'd like someone to come take a look and fix it as soon as possible. The area is accessible, and I've already cleared the space under the sink. If replacement parts are needed, I'm happy to cover the cost — just let me know what's required after inspection.

I'm located in Chesterfield. I'm available tomorrow morning (June 25th) between 9 AM and 12 PM, or anytime on Wednesday.

Please contact me if you need more details. Thanks!`,
  },
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
