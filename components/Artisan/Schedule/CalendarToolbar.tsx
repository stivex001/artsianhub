"use client";
import { ChevronLeft, ChevronRight, ChevronDown, Search } from "lucide-react";
import { monthNames } from "@/components/calender/data";
import React from "react";

type Props = {
  currentDate: Date;
  viewType: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNavigate: (direction: "prev" | "next") => void;
  onToday: () => void;
};

const CalendarToolbar = ({
  currentDate,
  viewType,
  searchQuery,
  onSearchChange,
  onNavigate,
  onToday,
}: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <button
          onClick={onToday}
          className="px-4 py-2 border border-[#E4E5EA] text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Today
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("prev")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h2 className="text-xl font-bold text-paragrah">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <button
            onClick={() => onNavigate("next")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 py-2 px-3 w-80 border border-gray-300 rounded-xl focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
            placeholder="Search appointment"
          />
        </div>

        {/* View Type Dropdown */}
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
            <span>{viewType}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarToolbar;
