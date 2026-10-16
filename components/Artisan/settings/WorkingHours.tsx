"use client";

import React, { useEffect, useState } from "react";
import { days } from "./data";
import { TimeDropdown } from "./TimeDropdown";
import { ToggleSwitch } from "./ToggleSwitch";
import { CustomButton } from "@/components/clickable/CustomButton";
import { useArtisans } from "@/apis/crud/artisans";
import { toast } from "sonner";
import { Clock } from "lucide-react";

type Props = {};

interface DaySchedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export interface WorkingSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

function convertTo12Hour(time24: string): string {
  if (!time24 || time24 === "Select") return "Select";
  const [h, m] = time24.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 || 12;
  return `${hour12.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}${suffix}`;
}

function convertTo24Hour(time12: string): string {
  if (!time12 || time12 === "Select") return "";
  const match = time12.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
  if (!match) return "";
  let [_, h, m, suffix] = match;
  let hour = parseInt(h, 10);
  if (suffix.toLowerCase() === "pm" && hour !== 12) hour += 12;
  if (suffix.toLowerCase() === "am" && hour === 12) hour = 0;
  return `${hour.toString().padStart(2, "0")}:${m}`;
}

export const WorkingHours = (props: Props) => {
  const { updateArtisanProfile, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const personalInfo = profile?.data;

  const initialSchedule: WorkingSchedule = (() => {
    const wdah = personalInfo?.workingDaysAndHours;

    const defaultSchedule: WorkingSchedule = {
      monday: { enabled: false, startTime: "Select", endTime: "Select" },
      tuesday: { enabled: false, startTime: "Select", endTime: "Select" },
      wednesday: { enabled: false, startTime: "Select", endTime: "Select" },
      thursday: { enabled: false, startTime: "Select", endTime: "Select" },
      friday: { enabled: false, startTime: "Select", endTime: "Select" },
      saturday: { enabled: false, startTime: "Select", endTime: "Select" },
      sunday: { enabled: false, startTime: "Select", endTime: "Select" },
    };

    if (!wdah) return defaultSchedule;

    const parseArray = (arr: any[]) => {
      const scheduleFromBackend = { ...defaultSchedule };
      arr.forEach((dayObj: any) => {
        const dayKey = dayObj.day.toLowerCase() as keyof WorkingSchedule;
        scheduleFromBackend[dayKey] = {
          enabled: true,
          startTime: convertTo12Hour(dayObj.startTime),
          endTime: convertTo12Hour(dayObj.endTime),
        };
      });
      return scheduleFromBackend;
    };

    if (typeof wdah === "string") {
      try {
        const parsed = JSON.parse(wdah);
        if (Array.isArray(parsed)) return parseArray(parsed);
      } catch {
        console.warn("Invalid workingDaysAndHours string from backend");
      }
      return defaultSchedule;
    }

    if (Array.isArray(wdah)) {
      return parseArray(wdah);
    }

    return defaultSchedule;
  })();

  const [schedule, setSchedule] = useState<WorkingSchedule>(initialSchedule);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toggleDay = (day: keyof WorkingSchedule) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        startTime: !prev[day].enabled ? "09:00am" : "Select",
        endTime: !prev[day].enabled ? "10:00am" : "Select",
      },
    }));
  };

  const updateTime = (
    day: keyof WorkingSchedule,
    timeType: "startTime" | "endTime",
    time: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [timeType]: time },
    }));
    setDropdownOpen(null);
  };

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(null);
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dropdownOpen]);

  const { mutate: updatePersonalInfo, isPending } = updateArtisanProfile;

  const handleEditProfileInfo = async () => {
    const formData = new FormData();
    try {
      const formatted = Object.entries(schedule)
        .filter(([_, value]) => value.enabled)
        .map(([day, value]) => ({
          day: day.charAt(0).toUpperCase() + day.slice(1),
          startTime: convertTo24Hour(value.startTime),
          endTime: convertTo24Hour(value.endTime),
        }));

      formData.append("workingDaysAndHours", JSON.stringify(formatted));

      updatePersonalInfo(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Schedule Updated Successfully");
          refetch();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Something went wrong");
          console.error("Update Profile Error:", error);
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected Error:", error);
    }
  };

  const enabledCount = Object.values(schedule).filter((d) => d.enabled).length;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditProfileInfo();
      }}
      className="flex flex-col gap-7"
    >
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3.5 rounded-full bg-[#02198B]" />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Weekly Availability
          </p>
        </div>
        {enabledCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#02198B]/[0.06] text-[#02198B] text-xs font-semibold">
            <Clock className="w-3 h-3" />
            {enabledCount} day{enabledCount !== 1 ? "s" : ""} active
          </span>
        )}
      </div>

      {/* ── Day rows ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        {days?.map(({ key, label }) => {
          const daySchedule = schedule[key as keyof WorkingSchedule];
          const isEnabled = daySchedule.enabled;

          return (
            <div
              key={key}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                isEnabled
                  ? "bg-[#02198B]/[0.03] border-[#02198B]/[0.1]"
                  : "bg-white border-gray-100 hover:border-gray-200"
              }`}
            >
              {/* Left: toggle + day name */}
              <div className="flex items-center gap-3.5">
                <ToggleSwitch
                  enabled={daySchedule.enabled}
                  onChange={() => toggleDay(key as keyof WorkingSchedule)}
                />
                <div>
                  <p
                    className={`text-sm font-semibold leading-tight ${
                      isEnabled ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </p>
                  {isEnabled && (
                    <p className="text-[10px] text-[#02198B]/60 font-medium mt-0.5">
                      Available
                    </p>
                  )}
                </div>
              </div>

              {/* Right: time range */}
              <div
                className={`flex items-center gap-3 transition-opacity duration-200 ${
                  !isEnabled ? "opacity-35 pointer-events-none" : ""
                }`}
              >
                <TimeDropdown
                  day={key as keyof WorkingSchedule}
                  timeType="startTime"
                  value={daySchedule.startTime}
                  disabled={!daySchedule.enabled}
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  updateTime={updateTime}
                />
                <span className="text-gray-300 font-medium text-sm">→</span>
                <TimeDropdown
                  day={key as keyof WorkingSchedule}
                  timeType="endTime"
                  value={daySchedule.endTime}
                  disabled={!daySchedule.enabled}
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  updateTime={updateTime}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Save footer ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Clients see your availability when booking
        </p>
        <CustomButton
          type="submit"
          label="Save Schedule"
          className="rounded-xl"
          variant="primary"
          disabled={isPending}
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
