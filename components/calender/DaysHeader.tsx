"use client";
import React from "react";
import { dayNames } from "./data";

type Props = {
  currentDate: Date;
  onDayClick?: (date: Date) => void;
  selectedDate?: Date;
};

export const DaysHeader = ({ currentDate, onDayClick, selectedDate }: Props) => {
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    // Monday-first
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const today = new Date();

  return (
    <div className="grid grid-cols-8 border-b border-gray-100 bg-white sticky top-0 z-20">
      {/* Time gutter */}
      <div className="w-16 flex-shrink-0 border-r border-gray-100" />

      {weekDays.map((date, index) => {
        const isToday = date.toDateString() === today.toDateString();
        const isSelected =
          selectedDate && date.toDateString() === selectedDate.toDateString();

        return (
          <button
            key={index}
            onClick={() => onDayClick?.(date)}
            className={`
              flex flex-col items-center justify-center py-3 gap-0.5
              border-r border-gray-100 last:border-r-0
              transition-colors hover:bg-gray-50 cursor-pointer
              ${isSelected && !isToday ? "bg-primary/5" : ""}
            `}
          >
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest ${
                isToday ? "text-primary" : "text-gray-400"
              }`}
            >
              {dayNames[index]}
            </span>
            <span
              className={`
                flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full transition-all
                ${
                  isToday
                    ? "bg-primary text-white shadow-md"
                    : isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {date.getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
};
