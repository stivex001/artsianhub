// Sample appointments data
export interface Appointment {
  id: string | number;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  date: string;
}

export const appointments: Appointment[] = [
  {
    id: 1,
    title: "Pipe Leak Repair",
    startTime: "6:00AM",
    endTime: "7:00AM",
    location: "Matlock",
    date: "2025-08-25", // Monday
  },
  {
    id: 2,
    title: "Pipe Leak Repair",
    startTime: "6:00AM",
    endTime: "7:00AM",
    location: "Sheffield",
    date: "2025-08-27", // Wednesday
  },
  {
    id: 3,
    title: "Pipe Leak Repair",
    startTime: "7:00AM",
    endTime: "8:30AM",
    location: "Chesterfield",
    date: "2025-08-26", // Tuesday
  },
  {
    id: 4,
    title: "Pipe Leak Repair",
    startTime: "7:00AM",
    endTime: "9:00AM",
    location: "Chesterfield",
    date: "2025-08-29", // Friday
  },
  {
    id: 5,
    title: "Pipe Leak Repair",
    startTime: "8:00AM",
    endTime: "8:30AM",
    location: "Clay",
    date: "2025-08-30", // Saturday
  },
  {
    id: 6,
    title: "Pipe Leak Repair",
    startTime: "8:30AM",
    endTime: "9:00AM",
    location: "Matlock",
    date: "2025-08-30", // Saturday
  },
  {
    id: 7,
    title: "Pipe Leak Repair",
    startTime: "9:00AM",
    endTime: "10:00AM",
    location: "Clay",
    date: "2025-08-25", // Monday
  },

  {
    id: 8,
    title: "Pipe Leak Repair",
    date: "2025-08-29",
    startTime: "9:00AM",
    endTime: "10:00AM",
    location: "Matlock",
  },
  {
    id: 9,
    title: "Pipe Leak Repair",
    date: "2025-09-02",
    startTime: "2:00PM",
    endTime: "5:00PM",
    location: "Chesterfield",
  },
  {
    id: 10,
    title: "Pipe Leak Repair",
    date: "2025-09-01",
    startTime: "9:00AM",
    endTime: "10:00AM",
    location: "Cross",
  },
];

export const timeSlots = [
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
];

export const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
