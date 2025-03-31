"use client";
import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Label } from "../ui/label";
import { Control, useController } from "react-hook-form";

interface TimeRangeProps {
  name: string;
  label: string;
  control: Control<any>;
}

const TimeRangePicker = ({ label, name, control }: TimeRangeProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: "This field is required" },
  });

  const [startTime, endTime] = value?.split("-") || ["09:00 AM", "05:00 PM"];

  const handleTimeChange = (newTime: string, type: "start" | "end") => {
    const updatedTime =
      type === "start" ? `${newTime}-${endTime}` : `${startTime}-${newTime}`;
    onChange(updatedTime);
  };

  return (
    <div>
      <Label htmlFor={name} className="text-base font-semibold capitalize">
        {label}
      </Label>
      <div className="w-fit flex items-center gap-5 border border-gray-300 p-2.5 text-[#D9D9D9] text-2xl">
        <TimePicker
          name={`${name}-start`}
          onChange={(value) => handleTimeChange(value || "09:00 AM", "start")}
          value={startTime}
          disableClock
          format="hh:mm a"
          className="bg-transparent border-none !focus:outline-none text-center"
        />
        <span className="text-gray-400">-</span>
        <TimePicker
          name={`${name}-end`}
          onChange={(value) => handleTimeChange(value || "05:00 PM", "end")}
          value={endTime}
          disableClock
          format="hh:mm a"
          className="bg-transparent border-none focus:outline-none text-center"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TimeRangePicker;
