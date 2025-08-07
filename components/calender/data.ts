// Sample appointments data
export interface Appointment {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  day: number; // 0-6 (Monday to Sunday)
  color: string;
}

export const appointments: Appointment[] = [
  {
    id: "1",
    title: "Pipe Leak Repair",
    startTime: "6:00am",
    endTime: "7am",
    location: "Matlock",
    day: 0, // Monday
    color: "bg-orange-100 border-orange-200",
  },
  {
    id: "2",
    title: "Pipe Leak Repair",
    startTime: "6:00am",
    endTime: "7am",
    location: "Sheffield",
    day: 2, // Wednesday
    color: "bg-blue-100 border-blue-200",
  },
  {
    id: "3",
    title: "Pipe Leak Repair",
    startTime: "7:00am",
    endTime: "8:30am",
    location: "Chesterfield",
    day: 1, // Tuesday
    color: "bg-gray-100 border-gray-200",
  },
  {
    id: "4",
    title: "Pipe Leak Repair",
    startTime: "7:00am",
    endTime: "9:00am",
    location: "Chesterfield",
    day: 4, // Friday
    color: "bg-green-100 border-green-200",
  },
  {
    id: "5",
    title: "Pipe Leak Repair",
    startTime: "9:00am",
    endTime: "10am",
    location: "Clay",
    day: 0, // Monday
    color: "bg-orange-100 border-orange-200",
  },
  {
    id: "6",
    title: "Pipe Leak Repair",
    startTime: "9:00am",
    endTime: "10am",
    location: "Matlock",
    day: 2, // Wednesday
    color: "bg-blue-100 border-blue-200",
  },
  {
    id: "7",
    title: "Pipe Leak Repair",
    startTime: "8:00am",
    endTime: "8:30am",
    location: "Clay",
    day: 5, // Saturday
    color: "bg-green-100 border-green-200",
  },
  {
    id: "8",
    title: "Pipe Leak Repair",
    startTime: "8:30am",
    endTime: "9:00am",
    location: "Matlock",
    day: 5, // Saturday
    color: "bg-green-100 border-green-200",
  },
  {
    id: "9",
    title: "Pipe Leak Repair",
    startTime: "9:00am",
    endTime: "10am",
    location: "Chesterfield",
    day: 1, // Tuesday
    color: "bg-red-100 border-red-200",
  },
  {
    id: "10",
    title: "Pipe Leak Repair",
    startTime: "9:00am",
    endTime: "10am",
    location: "Cross",
    day: 2, // Wednesday
    color: "bg-green-100 border-green-200",
  },
  {
    id: "11",
    title: "Pipe Leak Repair",
    startTime: "9:00am",
    endTime: "10am",
    location: "Chesterfield",
    day: 0, // Monday
    color: "bg-red-100 border-red-200",
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