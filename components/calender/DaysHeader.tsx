import React from "react";
import { dayNames } from "./data";

type Props = {
  currentDate: any;
};

export const DaysHeader = ({ currentDate }: Props) => {
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="grid grid-cols-8 border border-gray-200 rounded-lg">
      <div className="p-4 bg-gray-50"></div>
      {weekDays?.map((date, index) => {
        const isToday = date.toDateString() === new Date().toDateString();
        return (
          <div
            key={index}
            className="p-4 bg-gray-50 text-center border-l border-gray-200"
          >
            <div
              className={`text-sm font-medium ${
                isToday ? "text-blue-600" : "text-gray-900"
              }`}
            >
              {date.getDate()}
            </div>
            <div
              className={`text-xs ${
                isToday ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {dayNames[index]}
            </div>
          </div>
        );
      })}
    </div>
  );
};
