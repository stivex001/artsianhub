"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export const CustomDropdown = ({
  value,
  onChange,
  options,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  id: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const isOpen = dropdownOpen === id;

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(null);
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(isOpen ? null : id)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <span className="text-gray-900">{value}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0  bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setDropdownOpen(null);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                value === option ? "bg-blue-50 text-blue-700" : "text-gray-900"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
