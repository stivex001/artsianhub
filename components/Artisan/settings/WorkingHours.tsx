import { Descriptions } from "@/components/shared/Headings";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { days, timeOptions } from "./data";
import { TimeDropdown } from "./TimeDropdown";
import { ToggleSwitch } from "./ToggleSwitch";
import { CustomButton } from "@/components/clickable/CustomButton";

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

export const WorkingHours = (props: Props) => {
  const [schedule, setSchedule] = useState<WorkingSchedule>({
    monday: { enabled: true, startTime: "09:00am", endTime: "10:00am" },
    tuesday: { enabled: true, startTime: "09:00am", endTime: "10:00am" },
    wednesday: { enabled: true, startTime: "09:00am", endTime: "10:00am" },
    thursday: { enabled: true, startTime: "09:00am", endTime: "10:00am" },
    friday: { enabled: true, startTime: "09:00am", endTime: "10:00am" },
    saturday: { enabled: false, startTime: "Select", endTime: "Select" },
    sunday: { enabled: false, startTime: "Select", endTime: "Select" },
  });

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
      [day]: {
        ...prev[day],
        [timeType]: time,
      },
    }));
    setDropdownOpen(null);
  };

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
    <form className="flex flex-col gap-8">
      <Descriptions
        title="Working Days and Hours"
        desc="Let users know your schedule."
      />

      <div className="space-y-5">
        {days?.map(({ key, label }) => {
          const daySchedule = schedule[key as keyof WorkingSchedule];

          return (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ToggleSwitch
                  enabled={daySchedule.enabled}
                  onChange={() => toggleDay(key as keyof WorkingSchedule)}
                />
                <span
                  className={`font-medium ${
                    daySchedule.enabled ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <TimeDropdown
                  day={key as keyof WorkingSchedule}
                  timeType="startTime"
                  value={daySchedule.startTime}
                  disabled={!daySchedule.enabled}
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  updateTime={updateTime}
                />
                <span
                  className={`text-sm ${
                    daySchedule.enabled ? "text-gray-500" : "text-gray-300"
                  }`}
                >
                  –
                </span>
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
      <div className="w-fit">
        <CustomButton
          type="submit"
          label="Save Changes"
          className="w-full rounded-[10px]"
          variant="primary"
        />
      </div>
    </form>
  );
};
