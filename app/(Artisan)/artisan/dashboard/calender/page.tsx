"use client"
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import { Search, ChevronLeft, ChevronRight, ChevronDown, MapPin } from "lucide-react";
import React, { useState } from "react";

type Props = {};

interface Appointment {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  day: number; // 0-6 (Monday to Sunday)
  color: string;
}

const Calendar = (props: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState("Weekly");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample appointments data
  const appointments: Appointment[] = [
    {
      id: "1",
      title: "Pipe Leak Repair",
      startTime: "6:00am",
      endTime: "7am",
      location: "Matlock",
      day: 0, // Monday
      color: "bg-orange-100 border-orange-200"
    },
    {
      id: "2",
      title: "Pipe Leak Repair",
      startTime: "6:00am",
      endTime: "7am",
      location: "Sheffield",
      day: 2, // Wednesday
      color: "bg-blue-100 border-blue-200"
    },
    {
      id: "3",
      title: "Pipe Leak Repair",
      startTime: "7:00am",
      endTime: "8:30am",
      location: "Chesterfield",
      day: 1, // Tuesday
      color: "bg-gray-100 border-gray-200"
    },
    {
      id: "4",
      title: "Pipe Leak Repair",
      startTime: "7:00am",
      endTime: "9:00am",
      location: "Chesterfield",
      day: 4, // Friday
      color: "bg-green-100 border-green-200"
    },
    {
      id: "5",
      title: "Pipe Leak Repair",
      startTime: "9:00am",
      endTime: "10am",
      location: "Clay",
      day: 0, // Monday
      color: "bg-orange-100 border-orange-200"
    },
    {
      id: "6",
      title: "Pipe Leak Repair",
      startTime: "9:00am",
      endTime: "10am",
      location: "Matlock",
      day: 2, // Wednesday
      color: "bg-blue-100 border-blue-200"
    },
    {
      id: "7",
      title: "Pipe Leak Repair",
      startTime: "8:00am",
      endTime: "8:30am",
      location: "Clay",
      day: 5, // Saturday
      color: "bg-green-100 border-green-200"
    },
    {
      id: "8",
      title: "Pipe Leak Repair",
      startTime: "8:30am",
      endTime: "9:00am",
      location: "Matlock",
      day: 5, // Saturday
      color: "bg-green-100 border-green-200"
    },
    {
      id: "9",
      title: "Pipe Leak Repair",
      startTime: "9:00am",
      endTime: "10am",
      location: "Chesterfield",
      day: 1, // Tuesday
      color: "bg-red-100 border-red-200"
    },
    {
      id: "10",
      title: "Pipe Leak Repair",
      startTime: "9:00am",
      endTime: "10am",
      location: "Cross",
      day: 2, // Wednesday
      color: "bg-green-100 border-green-200"
    },
    {
      id: "11",
      title: "Pipe Leak Repair",
      startTime: "9:00am",
      endTime: "10am",
      location: "Chesterfield",
      day: 0, // Monday
      color: "bg-red-100 border-red-200"
    }
  ];

  // Generate time slots from 6AM to 9PM
  const timeSlots = [
    "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", 
    "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"
  ];

  // Get the Monday of current week
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentDate);
  
  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getAppointmentsForDay = (dayIndex: number) => {
    return appointments.filter(apt => apt.day === dayIndex);
  };

  const getLocationColor = (location: string) => {
    const colors = {
      "Matlock": "text-gray-600",
      "Sheffield": "text-blue-600", 
      "Chesterfield": "text-red-600",
      "Clay": "text-orange-600",
      "Cross": "text-green-600"
    };
    return colors[location as keyof typeof colors] || "text-gray-600";
  };

  const getLocationDot = (location: string) => {
    const colors = {
      "Matlock": "bg-gray-500",
      "Sheffield": "bg-blue-500",
      "Chesterfield": "bg-red-500", 
      "Clay": "bg-orange-500",
      "Cross": "bg-green-500"
    };
    return colors[location as keyof typeof colors] || "bg-gray-500";
  };

  const timeToPosition = (time: string) => {
    const hour = parseInt(time.replace(/[^\d]/g, ''));
    const isPM = time.toLowerCase().includes('pm');
    let hour24 = hour;
    
    if (isPM && hour !== 12) hour24 += 12;
    if (!isPM && hour === 12) hour24 = 0;
    
    // Position relative to 6AM start (6AM = 0, 7AM = 1, etc.)
    return (hour24 - 6) * 60; // 60px per hour
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = timeToPosition(startTime);
    const end = timeToPosition(endTime);
    return end - start;
  };

  return (
    <div className="flex flex-col gap-5">
      <Descriptions
        title="My Schedule"
        desc="View and manage all your upcoming appointments in one place. Stay organized and never miss a job."
      />
      
      <Wrapper className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Today
            </button>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigateWeek('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <h2 className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
              <button 
                onClick={() => navigateWeek('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 py-2 px-3 w-80 border border-gray-300 rounded-xl focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
                placeholder="Search appointment"
              />
            </div>

            {/* View Type Dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <span>{viewType}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Days Header */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 bg-gray-50"></div>
            {weekDays.map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div key={index} className="p-4 bg-gray-50 text-center border-l border-gray-200">
                  <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                    {date.getDate()}
                  </div>
                  <div className={`text-xs ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                    {dayNames[index]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Slots and Appointments */}
          <div className="grid grid-cols-8">
            {/* Time Column */}
            <div className="bg-gray-50">
              {timeSlots.map((time, index) => (
                <div key={time} className="h-16 p-2 border-b border-gray-200 text-sm text-gray-600 font-medium">
                  {time}
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <div key={dayIndex} className="relative border-l border-gray-200">
                {/* Time Slot Backgrounds */}
                {timeSlots.map((time, slotIndex) => (
                  <div 
                    key={`${dayIndex}-${slotIndex}`} 
                    className={`h-16 border-b border-gray-100 ${dayIndex === 2 ? 'bg-blue-50' : ''}`}
                  />
                ))}

                {/* Appointments */}
                {getAppointmentsForDay(dayIndex).map((appointment, aptIndex) => {
                  const topPosition = timeToPosition(appointment.startTime);
                  const height = calculateDuration(appointment.startTime, appointment.endTime);
                  
                  return (
                    <div
                      key={`${appointment.id}-${aptIndex}`}
                      className={`absolute left-1 right-1 p-2 rounded border ${appointment.color} cursor-pointer hover:shadow-sm transition-shadow`}
                      style={{
                        top: `${topPosition}px`,
                        height: `${Math.max(height, 40)}px`,
                        zIndex: 10
                      }}
                    >
                      <div className="text-xs font-medium text-gray-800 mb-1">
                        {appointment.title}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {appointment.startTime} - {appointment.endTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getLocationDot(appointment.location)}`}></div>
                        <span className={`text-xs ${getLocationColor(appointment.location)}`}>
                          {appointment.location}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Calendar;