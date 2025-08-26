"use client";
import CalendarToolbar from "@/components/Artisan/Schedule/CalendarToolbar";
import { appointments, timeSlots } from "@/components/calender/data";
import { DaysHeader } from "@/components/calender/DaysHeader";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import React, { useState } from "react";
import { getLocationStyles } from "@/utils/colorUtils";

type Props = {};

const Calendar = (props: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState("Weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  // helper: return date string YYYY-MM-DD
  const toDateString = (date: Date) => date.toISOString().split("T")[0];

  // given dayIndex, return actual Date of that column
  const getDayDate = (dayIndex: number) => {
    const dayDate = new Date(currentDate);
    const startOfWeek = currentDate.getDate() - currentDate.getDay(); // Sunday=0
    dayDate.setDate(startOfWeek + dayIndex);
    return dayDate;
  };

  // get appointments for a specific date+time
  const getAppointmentsForSlot = (date: Date, time: string) => {
    const dateStr = toDateString(date);
    return appointments.filter(
      (apt) => apt.date === dateStr && apt.startTime.startsWith(time)
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <Descriptions
        title="My Schedule"
        desc="View and manage all your upcoming appointments in one place. Stay organized and never miss a job."
      />

      <Wrapper>
        <CalendarToolbar
          currentDate={currentDate}
          viewType={viewType}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigate={navigateWeek}
          onToday={() => setCurrentDate(new Date())}
        />

        {/* Calendar Grid */}
        <div className="overflow-hidden">
          <DaysHeader currentDate={currentDate} />

          {/* Rows = timeslots */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b border-gray-100">
              {/* Time column */}
              <div className="h-20 p-2 text-sm text-gray-600 font-medium border-r">
                {time}
              </div>

              {/* Day columns */}
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dayDate = getDayDate(dayIndex);
                const slotAppointments = getAppointmentsForSlot(dayDate, time);

                return (
                  <div
                    key={dayIndex}
                    className="h-20 p-1 border-r relative"
                  >
                    {slotAppointments.map((appointment, idx) => {
                      const styles = getLocationStyles(appointment.location);

                      return (
                        <div
                          key={`${appointment.id}-${idx}`}
                          className={`mb-1 p-1 rounded text-xs cursor-pointer ${styles.bg} ${styles.border}`}
                        >
                          <div className="font-medium">{appointment.title}</div>
                          <div>
                            {appointment.startTime} - {appointment.endTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                            <span className={styles.text}>
                              {appointment.location}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Calendar;
