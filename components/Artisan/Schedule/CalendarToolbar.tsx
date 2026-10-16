"use client";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { monthNames } from "@/components/calender/data";
import React from "react";

export type ViewType = "Day" | "Weekly" | "Monthly";

const VIEW_OPTIONS: { label: string; value: ViewType }[] = [
  { label: "Day", value: "Day" },
  { label: "Week", value: "Weekly" },
  { label: "Month", value: "Monthly" },
];

type Props = {
  currentDate: Date;
  viewType: ViewType;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNavigate: (direction: "prev" | "next") => void;
  onToday: () => void;
  onViewChange?: (view: ViewType) => void;
};

const CalendarToolbar = ({
  currentDate,
  viewType,
  searchQuery,
  onSearchChange,
  onNavigate,
  onToday,
  onViewChange,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
      {/* Left: Today + Navigation */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onToday}
          className="px-3 py-1.5 text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Today
        </button>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onNavigate("prev")}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <h2 className="text-sm font-bold text-gray-800 w-32 text-center select-none">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <button
            onClick={() => onNavigate("next")}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Right: Search + View switcher */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2 py-1.5 px-3 border border-gray-200 rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all bg-white">
          <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-36 sm:w-48 text-xs placeholder-gray-400 focus:outline-none bg-transparent text-gray-700"
            placeholder="Search appointments..."
          />
        </div>

        {/* View pills */}
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
          {VIEW_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onViewChange?.(opt.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                viewType === opt.value
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarToolbar;
