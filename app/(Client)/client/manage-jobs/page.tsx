"use client";
import { TabComponent } from "@/components/shared/TabComponent";
import Wrapper from "@/components/shared/Wrapper";
import { Search } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const tabs = [
  { key: "all", label: "All", count: 156 },
  { key: "pending", label: "Pending", count: 45 },
  { key: "accepted", label: "Accepted", count: 45 },
  { key: "inprogress", label: "In Progress", count: 23 },
  { key: "completed", label: "Completed", count: 67 },
  { key: "cancelled", label: "Cancelled", count: 4 },
];

const ManageJob = (props: Props) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchQuery(query);
  };

  return (
    <Wrapper className="flex flex-col gap-4">
      <TabComponent
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="flex items-center gap-2 py-2 px-3 lg:w-[320px] border border-gray-300 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <div className=" pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className=" w-full leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 "
          placeholder="Search appointment"
        />
      </div>
    </Wrapper>
  );
};

export default ManageJob;
