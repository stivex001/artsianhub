import { Descriptions } from "@/components/shared/Headings";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

type Props = {};

interface DaySchedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface WorkingSchedule {
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

  const timeOptions = [
    "12:00am", "12:30am", "01:00am", "01:30am", "02:00am", "02:30am",
    "03:00am", "03:30am", "04:00am", "04:30am", "05:00am", "05:30am",
    "06:00am", "06:30am", "07:00am", "07:30am", "08:00am", "08:30am",
    "09:00am", "09:30am", "10:00am", "10:30am", "11:00am", "11:30am",
    "12:00pm", "12:30pm", "01:00pm", "01:30pm", "02:00pm", "02:30pm",
    "03:00pm", "03:30pm", "04:00pm", "04:30pm", "05:00pm", "05:30pm",
    "06:00pm", "06:30pm", "07:00pm", "07:30pm", "08:00pm", "08:30pm",
    "09:00pm", "09:30pm", "10:00pm", "10:30pm", "11:00pm", "11:30pm"
  ];

  const days = [
    { key: "monday", label: "Mondays" },
    { key: "tuesday", label: "Tuesdays" },
    { key: "wednesday", label: "Wednesdays" },
    { key: "thursday", label: "Thursdays" },
    { key: "friday", label: "Fridays" },
    { key: "saturday", label: "Saturdays" },
    { key: "sunday", label: "Sundays" },
  ];

  const toggleDay = (day: keyof WorkingSchedule) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        startTime: !prev[day].enabled ? "09:00am" : "Select",
        endTime: !prev[day].enabled ? "10:00am" : "Select",
      }
    }));
  };

  const updateTime = (day: keyof WorkingSchedule, timeType: 'startTime' | 'endTime', time: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: time
      }
    }));
    setDropdownOpen(null);
  };

  const TimeDropdown = ({ 
    day, 
    timeType, 
    value, 
    disabled 
  }: { 
    day: keyof WorkingSchedule; 
    timeType: 'startTime' | 'endTime'; 
    value: string; 
    disabled: boolean;
  }) => {
    const dropdownId = `${day}-${timeType}`;
    const isOpen = dropdownOpen === dropdownId;

    if (disabled) {
      return (
        <button className="flex items-center justify-between px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed min-w-[120px]">
          <span>{value}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(isOpen ? null : dropdownId);
          }}
          className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-[120px]"
        >
          <span className="text-gray-900">{value}</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={(e) => {
                  e.stopPropagation();
                  updateTime(day, timeType, time);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  value === time ? 'bg-blue-50 text-primary' : 'text-gray-900'
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

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-primary' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(null);
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [dropdownOpen]);

  return (
    <form className="flex flex-col gap-8">
      <Descriptions
        title="Working Days and Hours"
        desc="Let users know your schedule."
      />
      
      <div className="space-y-4">
        {days.map(({ key, label }) => {
          const daySchedule = schedule[key as keyof WorkingSchedule];
          
          return (
            <div key={key} className="flex items-center justify-between py-3">
              {/* Day name and toggle */}
              <div className="flex items-center gap-4">
                <ToggleSwitch 
                  enabled={daySchedule.enabled} 
                  onChange={() => toggleDay(key as keyof WorkingSchedule)} 
                />
                <span className={`font-medium ${daySchedule.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>

              {/* Time selectors */}
              <div className="flex items-center gap-4">
                <TimeDropdown
                  day={key as keyof WorkingSchedule}
                  timeType="startTime"
                  value={daySchedule.startTime}
                  disabled={!daySchedule.enabled}
                />
                <span className={`text-sm ${daySchedule.enabled ? 'text-gray-500' : 'text-gray-300'}`}>
                  –
                </span>
                <TimeDropdown
                  day={key as keyof WorkingSchedule}
                  timeType="endTime"
                  value={daySchedule.endTime}
                  disabled={!daySchedule.enabled}
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};