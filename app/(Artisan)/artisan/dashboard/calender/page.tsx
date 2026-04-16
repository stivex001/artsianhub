"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Appointment,
  AppointmentStatus,
  monthNames,
  dayNames,
} from "@/components/calender/data";
import { useAppointments } from "@/apis/crud/appointments";
import type { AppointmentsInfo } from "@/apis/crud/appointments";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import CalendarToolbar, {
  ViewType,
} from "@/components/Artisan/Schedule/CalendarToolbar";
import { DaysHeader } from "@/components/calender/DaysHeader";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  User,
  CalendarDays,
} from "lucide-react";

// ─── Time grid constants ─────────────────────────────────────────────────────
const HOUR_HEIGHT = 64; // px per hour
const START_HOUR = 6; // 6 AM
const END_HOUR = 22; // 10 PM
const NUM_HOURS = END_HOUR - START_HOUR;
const TOTAL_HEIGHT = NUM_HOURS * HOUR_HEIGHT;

const HOURS_DISPLAY = Array.from({ length: NUM_HOURS }, (_, i) => {
  const h = START_HOUR + i;
  const suffix = h < 12 ? "AM" : "PM";
  const display = h === 12 ? 12 : h % 12;
  return `${display}${suffix}`;
});

// ─── Time helpers ─────────────────────────────────────────────────────────────
function parseTime(timeStr: string): number {
  const match = timeStr.match(/^(\d{1,2}):?(\d{0,2})\s*(AM|PM)$/i);
  if (!match) return START_HOUR;
  let hour = parseInt(match[1]);
  const mins = parseInt(match[2] || "0");
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return hour + mins / 60;
}

function getTopOffset(timeStr: string): number {
  return Math.max(0, (parseTime(timeStr) - START_HOUR) * HOUR_HEIGHT);
}

function getDuration(apt: Appointment): number {
  return Math.max(0.5, parseTime(apt.endTime) - parseTime(apt.startTime));
}

function toDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  AppointmentStatus,
  {
    label: string;
    bg: string;
    border: string;
    text: string;
    badge: string;
    dot: string;
  }
> = {
  confirmed: {
    label: "Confirmed",
    bg: "bg-emerald-50",
    border: "border-l-emerald-500",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    border: "border-l-amber-400",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  completed: {
    label: "Completed",
    bg: "bg-blue-50",
    border: "border-l-blue-500",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    border: "border-l-red-400",
    text: "text-red-600",
    badge: "bg-red-100 text-red-600",
    dot: "bg-red-500",
  },
};

// ─── Appointment Card ─────────────────────────────────────────────────────────
const AppointmentCard = ({
  apt,
  onClick,
}: {
  apt: Appointment;
  onClick?: () => void;
}) => {
  const cfg = STATUS_CONFIG[apt.status];
  const heightPx = getDuration(apt) * HOUR_HEIGHT;
  const isShort = heightPx < 56;

  return (
    <div
      onClick={onClick}
      className={`
        absolute left-1 right-1 rounded-lg border-l-4 px-2 overflow-hidden
        cursor-pointer transition-all duration-150 group
        hover:shadow-md hover:z-30 z-10
        ${cfg.bg} ${cfg.border}
      `}
      style={{
        top: getTopOffset(apt.startTime) + 2,
        height: Math.max(heightPx - 4, 28),
      }}
    >
      <div className="flex flex-col h-full justify-start pt-1">
        <p className={`text-xs font-bold leading-tight truncate ${cfg.text}`}>
          {apt.title}
        </p>
        {!isShort && (
          <>
            <p className="text-[10px] text-gray-500 truncate mt-0.5">
              {apt.startTime} – {apt.endTime}
            </p>
            {heightPx >= 80 && (
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                <span className="text-[10px] text-gray-500 truncate">
                  {apt.location}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ─── Week View ────────────────────────────────────────────────────────────────
const WeekView = ({
  currentDate,
  appointments,
  onDayClick,
}: {
  currentDate: Date;
  appointments: Appointment[];
  onDayClick: (date: Date) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to 8 AM on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = (8 - START_HOUR) * HOUR_HEIGHT;
    }
  }, []);

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
    return d;
  };

  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Current time indicator
  const now = new Date();
  const nowOffset =
    now.getHours() >= START_HOUR && now.getHours() < END_HOUR
      ? (now.getHours() + now.getMinutes() / 60 - START_HOUR) * HOUR_HEIGHT
      : null;

  const today = new Date();

  return (
    <div className="flex flex-col">
      <DaysHeader
        currentDate={currentDate}
        onDayClick={onDayClick}
        selectedDate={currentDate}
      />

      {/* Scrollable body */}
      <div
        ref={scrollRef}
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 360px)", minHeight: 400 }}
      >
        <div className="flex">
          {/* Time labels */}
          <div className="w-16 flex-shrink-0 border-r border-gray-100">
            {HOURS_DISPLAY.map((label, i) => (
              <div
                key={i}
                className="flex items-start justify-end pr-2 pt-1"
                style={{ height: HOUR_HEIGHT }}
              >
                <span className="text-[10px] font-medium text-gray-400 leading-none">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          <div className="flex flex-1 relative">
            {weekDays.map((day, idx) => {
              const dateStr = toDateString(day);
              const isToday = day.toDateString() === today.toDateString();
              const dayApts = appointments.filter((a) => a.date === dateStr);

              return (
                <div
                  key={idx}
                  className={`flex-1 border-r border-gray-100 last:border-r-0 relative ${
                    isToday ? "bg-primary/[0.02]" : ""
                  }`}
                  style={{ height: TOTAL_HEIGHT }}
                >
                  {/* Hour grid lines */}
                  {HOURS_DISPLAY.map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-t border-gray-100"
                      style={{ top: i * HOUR_HEIGHT }}
                    />
                  ))}

                  {/* Half-hour lines */}
                  {HOURS_DISPLAY.map((_, i) => (
                    <div
                      key={`half-${i}`}
                      className="absolute left-0 right-0 border-t border-dashed border-gray-50"
                      style={{ top: i * HOUR_HEIGHT + HOUR_HEIGHT / 2 }}
                    />
                  ))}

                  {/* Appointments */}
                  {dayApts.map((apt) => (
                    <AppointmentCard key={apt.id} apt={apt} />
                  ))}

                  {/* Current time line */}
                  {isToday && nowOffset !== null && (
                    <div
                      className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
                      style={{ top: nowOffset }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1.5 shrink-0" />
                      <div className="flex-1 h-px bg-red-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Day View ─────────────────────────────────────────────────────────────────
const DayView = ({
  currentDate,
  appointments,
}: {
  currentDate: Date;
  appointments: Appointment[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = (8 - START_HOUR) * HOUR_HEIGHT;
    }
  }, []);

  const dateStr = toDateString(currentDate);
  const dayApts = appointments.filter((a) => a.date === dateStr);
  const today = new Date();
  const isToday = currentDate.toDateString() === today.toDateString();

  const now = new Date();
  const nowOffset =
    isToday && now.getHours() >= START_HOUR && now.getHours() < END_HOUR
      ? (now.getHours() + now.getMinutes() / 60 - START_HOUR) * HOUR_HEIGHT
      : null;

  const dayName = dayNames[
    currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1
  ];

  return (
    <div className="flex flex-col">
      {/* Day header */}
      <div className="flex items-center gap-3 py-3 border-b border-gray-100">
        <div className="w-16 flex-shrink-0" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {dayName}
          </span>
          <span
            className={`flex items-center justify-center w-9 h-9 text-lg font-bold rounded-full ${
              isToday
                ? "bg-primary text-white shadow-md"
                : "text-gray-800 bg-gray-100"
            }`}
          >
            {currentDate.getDate()}
          </span>
          <span className="text-sm text-gray-500">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
        </div>
        {dayApts.length > 0 && (
          <span className="ml-auto text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {dayApts.length} booking{dayApts.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div
        ref={scrollRef}
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 360px)", minHeight: 400 }}
      >
        <div className="flex">
          {/* Time labels */}
          <div className="w-16 flex-shrink-0 border-r border-gray-100">
            {HOURS_DISPLAY.map((label, i) => (
              <div
                key={i}
                className="flex items-start justify-end pr-2 pt-1"
                style={{ height: HOUR_HEIGHT }}
              >
                <span className="text-[10px] font-medium text-gray-400 leading-none">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Single day column */}
          <div
            className="flex-1 relative"
            style={{ height: TOTAL_HEIGHT }}
          >
            {HOURS_DISPLAY.map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t border-gray-100"
                style={{ top: i * HOUR_HEIGHT }}
              />
            ))}
            {HOURS_DISPLAY.map((_, i) => (
              <div
                key={`half-${i}`}
                className="absolute left-0 right-0 border-t border-dashed border-gray-50"
                style={{ top: i * HOUR_HEIGHT + HOUR_HEIGHT / 2 }}
              />
            ))}

            {dayApts.map((apt) => {
              const cfg = STATUS_CONFIG[apt.status];
              const heightPx = getDuration(apt) * HOUR_HEIGHT;
              return (
                <div
                  key={apt.id}
                  className={`
                    absolute left-2 right-2 rounded-xl border-l-4 px-4 py-2.5 overflow-hidden
                    cursor-pointer transition-all hover:shadow-lg hover:z-30 z-10 group
                    ${cfg.bg} ${cfg.border}
                  `}
                  style={{
                    top: getTopOffset(apt.startTime) + 2,
                    height: Math.max(heightPx - 4, 40),
                  }}
                >
                  <div className="flex items-start justify-between gap-2 h-full">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className={`text-sm font-bold truncate ${cfg.text}`}>
                        {apt.title}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap mt-0.5">
                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>
                            {apt.startTime} – {apt.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{apt.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                          <User className="w-3 h-3 shrink-0" />
                          <span>{apt.clientName}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${cfg.badge}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })}

            {nowOffset !== null && (
              <div
                className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
                style={{ top: nowOffset }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1.5 shrink-0" />
                <div className="flex-1 h-px bg-red-500" />
              </div>
            )}

            {dayApts.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-300">
                <CalendarDays className="w-10 h-10" />
                <p className="text-sm font-medium">No bookings this day</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Month View ───────────────────────────────────────────────────────────────
const MonthView = ({
  currentDate,
  appointments,
  onDayClick,
}: {
  currentDate: Date;
  appointments: Appointment[];
  onDayClick: (date: Date) => void;
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday-first offset
  const offset = (firstDay + 6) % 7;
  const cells = Array.from({ length: Math.ceil((offset + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - offset + 1;
    return day >= 1 && day <= daysInMonth ? new Date(year, month, day) : null;
  });
  const today = new Date();

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-gray-100 mb-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="py-3 text-center text-[10px] font-semibold uppercase tracking-widest text-gray-400"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) {
            return (
              <div key={i} className="h-24 border-b border-r border-gray-50" />
            );
          }
          const dateStr = toDateString(date);
          const dayApts = appointments.filter((a) => a.date === dateStr);
          const isToday = date.toDateString() === today.toDateString();
          const isCurrentMonth = date.getMonth() === month;

          return (
            <button
              key={i}
              onClick={() => onDayClick(date)}
              className={`h-24 p-1.5 border-b border-r border-gray-100 text-left transition-colors hover:bg-gray-50 ${
                !isCurrentMonth ? "opacity-40" : ""
              } ${
                (i + 1) % 7 === 0 ? "border-r-0" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span
                  className={`text-xs font-bold flex items-center justify-center w-6 h-6 rounded-full ${
                    isToday
                      ? "bg-primary text-white"
                      : "text-gray-700"
                  }`}
                >
                  {date.getDate()}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 overflow-hidden">
                {dayApts.slice(0, 2).map((apt) => {
                  const cfg = STATUS_CONFIG[apt.status];
                  return (
                    <div
                      key={apt.id}
                      className={`text-[10px] font-semibold truncate px-1.5 py-0.5 rounded-md border-l-2 ${cfg.bg} ${cfg.border} ${cfg.text}`}
                    >
                      {apt.title}
                    </div>
                  );
                })}
                {dayApts.length > 2 && (
                  <span className="text-[10px] text-gray-400 font-medium pl-1">
                    +{dayApts.length - 2} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Mini Calendar (sidebar) ──────────────────────────────────────────────────
const MiniCalendar = ({
  currentDate,
  onSelectDate,
  appointments,
}: {
  currentDate: Date;
  onSelectDate: (d: Date) => void;
  appointments: Appointment[];
}) => {
  const [viewDate, setViewDate] = useState(new Date(currentDate));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;
  const cells = Array.from({ length: Math.ceil((offset + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - offset + 1;
    return day >= 1 && day <= daysInMonth ? new Date(year, month, day) : null;
  });
  const aptDates = new Set(appointments.map((a) => a.date));
  const today = new Date();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5 text-gray-500" />
        </button>
        <span className="text-xs font-bold text-gray-800">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-0.5">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div
            key={i}
            className="text-center text-[10px] font-semibold text-gray-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const isToday = date.toDateString() === today.toDateString();
          const isSelected =
            date.toDateString() === currentDate.toDateString();
          const dateStr = toDateString(date);
          const hasApts = aptDates.has(dateStr);
          return (
            <button
              key={i}
              onClick={() => onSelectDate(date)}
              className={`
                relative flex flex-col items-center justify-center h-7 w-7 mx-auto
                text-[11px] rounded-full transition-all
                ${
                  isToday
                    ? "bg-primary text-white font-bold"
                    : isSelected
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {date.getDate()}
              {hasApts && !isToday && (
                <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Stats summary ────────────────────────────────────────────────────────────
const getWeekApts = (date: Date, apts: Appointment[]) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  const weekStart = toDateString(d);
  d.setDate(d.getDate() + 6);
  const weekEnd = toDateString(d);
  return apts.filter((a) => a.date >= weekStart && a.date <= weekEnd);
};

// ─── API → Calendar mapper ────────────────────────────────────────────────────
const STATUS_MAP: Record<string, AppointmentStatus> = {
  accepted: "confirmed",
  pending: "pending",
  completed: "completed",
  declined: "cancelled",
};

/** Convert 24h "HH:MM" or "H:MM" to "9:00AM" display format */
function normaliseTime(raw: string | undefined): string {
  if (!raw) return "9:00AM";
  // Already has AM/PM
  if (/[AP]M/i.test(raw)) return raw.trim();
  // "HH:MM" 24h format
  const match = raw.match(/^(\d{1,2}):(\d{2})$/);
  if (match) {
    let h = parseInt(match[1]);
    const m = match[2];
    const suffix = h < 12 ? "AM" : "PM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return `${h}:${m}${suffix}`;
  }
  return raw;
}

function addOneHour(timeStr: string): string {
  const h = parseTime(timeStr);
  const next = h + 1;
  const suffix = next < 12 ? "AM" : "PM";
  const display = next === 12 ? 12 : Math.round(next) % 12 || 12;
  return `${display}:00${suffix}`;
}

function mapApiAppointment(raw: AppointmentsInfo): Appointment {
  const client = raw.clientId as unknown as {
    firstName?: string;
    lastName?: string;
  };
  const dateStr = raw.preferredDate
    ? new Date(raw.preferredDate).toISOString().split("T")[0]
    : "";
  const startTime = normaliseTime(raw.preferredTime);
  return {
    id: raw._id,
    title: raw.description || "Appointment",
    startTime,
    endTime: addOneHour(startTime),
    location: raw.location || "—",
    date: dateStr,
    clientName: client
      ? `${client.firstName ?? ""} ${client.lastName ?? ""}`.trim() || "Client"
      : "Client",
    status: STATUS_MAP[raw.status] ?? "pending",
  };
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>("Weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const { getMyBookings } = useAppointments();
  const { data: bookingsData, isLoading } = getMyBookings();

  const appointments: Appointment[] = (bookingsData?.data ?? []).map(mapApiAppointment);

  const navigate = (direction: "prev" | "next") => {
    const d = new Date(currentDate);
    if (viewType === "Day") {
      d.setDate(d.getDate() + (direction === "next" ? 1 : -1));
    } else if (viewType === "Weekly") {
      d.setDate(d.getDate() + (direction === "next" ? 7 : -7));
    } else {
      d.setMonth(d.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(d);
  };

  const filteredApts = searchQuery
    ? appointments.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : appointments;

  const weekApts = getWeekApts(currentDate, appointments);
  const confirmedCount = weekApts.filter((a) => a.status === "confirmed").length;
  const pendingCount = weekApts.filter((a) => a.status === "pending").length;
  const completedCount = weekApts.filter((a) => a.status === "completed").length;

  const handleDayClick = (date: Date) => {
    setCurrentDate(date);
    setViewType("Day");
  };

  return (
    <div className="flex flex-col gap-5">
      <Descriptions
        title="My Schedule"
        desc="View and manage all your upcoming appointments in one place. Stay organized and never miss a booking."
      />

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "This Week",  value: weekApts.length,  color: "text-primary",      bg: "bg-primary/5"  },
          { label: "Confirmed",  value: confirmedCount,   color: "text-emerald-700",  bg: "bg-emerald-50" },
          { label: "Pending",    value: pendingCount,     color: "text-amber-700",    bg: "bg-amber-50"   },
          { label: "Completed",  value: completedCount,   color: "text-blue-700",     bg: "bg-blue-50"    },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl px-4 py-3 ${stat.bg} flex items-center justify-between`}
          >
            <span className="text-xs font-semibold text-gray-500">{stat.label}</span>
            <span className={`text-2xl font-black ${stat.color}`}>
              {isLoading ? "—" : stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Main layout: Sidebar + Calendar */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Sidebar — desktop only */}
        <div className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
          <Wrapper className="p-4">
            <MiniCalendar
              currentDate={currentDate}
              onSelectDate={(date) => {
                setCurrentDate(date);
                setViewType("Day");
              }}
              appointments={appointments}
            />
          </Wrapper>

          <Wrapper className="p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              Upcoming
            </h3>
            <div className="flex flex-col gap-2">
              {appointments
                .filter((a) => a.date >= toDateString(new Date()))
                .sort((a: Appointment, b: Appointment) =>
                  a.date + a.startTime > b.date + b.startTime ? 1 : -1
                )
                .slice(0, 4)
                .map((apt: Appointment) => {
                  const cfg = STATUS_CONFIG[apt.status];
                  return (
                    <div
                      key={apt.id}
                      className={`rounded-lg p-2.5 border-l-4 ${cfg.bg} ${cfg.border}`}
                    >
                      <p className={`text-xs font-bold truncate ${cfg.text}`}>{apt.title}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 truncate">{apt.clientName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                        <span className="text-[10px] text-gray-400">
                          {apt.startTime} · {apt.date.slice(5).replace("-", "/")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              {!isLoading && appointments.filter((a) => a.date >= toDateString(new Date())).length === 0 && (
                <p className="text-xs text-gray-400 text-center py-3">No upcoming bookings</p>
              )}
            </div>
          </Wrapper>
        </div>

        {/* Calendar main */}
        <Wrapper className="flex-1 min-w-0 overflow-hidden p-4 sm:p-5">
          <CalendarToolbar
            currentDate={currentDate}
            viewType={viewType}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigate={navigate}
            onToday={() => {
              setCurrentDate(new Date());
              setViewType("Weekly");
            }}
            onViewChange={setViewType}
          />

          <div className="mt-4">
            {viewType === "Weekly" && (
              <WeekView
                currentDate={currentDate}
                appointments={filteredApts}
                onDayClick={handleDayClick}
              />
            )}
            {viewType === "Day" && (
              <DayView currentDate={currentDate} appointments={filteredApts} />
            )}
            {viewType === "Monthly" && (
              <MonthView
                currentDate={currentDate}
                appointments={filteredApts}
                onDayClick={handleDayClick}
              />
            )}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Calendar;
