"use client"
import { ChevronDown } from "lucide-react";
import { WorkingSchedule } from "./WorkingHours";
import { timeOptions } from "./data";

export const TimeDropdown = ({
  day,
  timeType,
  value,
  disabled,
  dropdownOpen,
  setDropdownOpen,
  updateTime,
}: {
  day: keyof WorkingSchedule;
  timeType: "startTime" | "endTime";
  value: string;
  disabled: boolean;
  dropdownOpen: string | null;
  setDropdownOpen: (value: string | null) => void;
  updateTime: any;
}) => {
  const dropdownId = `${day}-${timeType}`;
  const isOpen = dropdownOpen === dropdownId;

  if (disabled) {
    return (
      <button
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed min-w-[120px]"
      >
        <span>{value}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="relative">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen(isOpen ? null : dropdownId);
        }}
        className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-[120px] cursor-pointer"
      >
        <span className="text-gray-900">{value}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {timeOptions?.map((time) => (
            <button
              key={time}
              onClick={(e) => {
                e.stopPropagation();
                updateTime(day, timeType, time);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                value === time ? "bg-blue-50 text-primary" : "text-gray-900"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
