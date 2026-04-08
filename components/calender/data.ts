// Appointment status types
export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";
export type ServiceType =
  | "Plumbing"
  | "Electrical"
  | "HVAC"
  | "Tiling"
  | "Roofing"
  | "Painting"
  | "Carpentry"
  | "Cleaning";

export interface Appointment {
  id: string | number;
  title: string;
  startTime: string; // "9:00AM"
  endTime: string;   // "11:00AM"
  location: string;
  date: string;      // "YYYY-MM-DD"
  clientName: string;
  status: AppointmentStatus;
  serviceType?: ServiceType;
}

// Current date: 2026-04-08 (Wednesday)
// Current week: Mon Apr 6 — Sun Apr 12, 2026
export const appointments: Appointment[] = [
  // Monday Apr 6
  {
    id: 1,
    title: "Pipe Installation",
    startTime: "9:00AM",
    endTime: "11:00AM",
    location: "Matlock",
    date: "2026-04-06",
    clientName: "James Harrow",
    status: "confirmed",
    serviceType: "Plumbing",
  },
  {
    id: 2,
    title: "Electrical Inspection",
    startTime: "2:00PM",
    endTime: "3:00PM",
    location: "Sheffield",
    date: "2026-04-06",
    clientName: "Amelia Cross",
    status: "completed",
    serviceType: "Electrical",
  },

  // Tuesday Apr 7
  {
    id: 3,
    title: "Kitchen Faucet Repair",
    startTime: "10:00AM",
    endTime: "12:00PM",
    location: "Chesterfield",
    date: "2026-04-07",
    clientName: "Marcus Webb",
    status: "confirmed",
    serviceType: "Plumbing",
  },
  {
    id: 4,
    title: "Bathroom Renovation",
    startTime: "3:00PM",
    endTime: "5:00PM",
    location: "Derby",
    date: "2026-04-07",
    clientName: "Sophia Lane",
    status: "pending",
    serviceType: "Tiling",
  },

  // Wednesday Apr 8 (TODAY)
  {
    id: 5,
    title: "HVAC Service",
    startTime: "8:00AM",
    endTime: "10:00AM",
    location: "Matlock",
    date: "2026-04-08",
    clientName: "Daniel Park",
    status: "confirmed",
    serviceType: "HVAC",
  },
  {
    id: 6,
    title: "Tile Grouting",
    startTime: "1:00PM",
    endTime: "3:00PM",
    location: "Clay Cross",
    date: "2026-04-08",
    clientName: "Rachel Storm",
    status: "confirmed",
    serviceType: "Tiling",
  },
  {
    id: 7,
    title: "Drain Cleaning",
    startTime: "4:00PM",
    endTime: "5:00PM",
    location: "Sheffield",
    date: "2026-04-08",
    clientName: "Tom Bradley",
    status: "pending",
    serviceType: "Plumbing",
  },

  // Thursday Apr 9
  {
    id: 8,
    title: "Roof Inspection",
    startTime: "9:00AM",
    endTime: "11:00AM",
    location: "Bakewell",
    date: "2026-04-09",
    clientName: "Nina Foster",
    status: "pending",
    serviceType: "Roofing",
  },
  {
    id: 9,
    title: "Paint Touch-up",
    startTime: "2:00PM",
    endTime: "4:00PM",
    location: "Matlock",
    date: "2026-04-09",
    clientName: "Chris Vale",
    status: "confirmed",
    serviceType: "Painting",
  },

  // Friday Apr 10
  {
    id: 10,
    title: "Water Heater Install",
    startTime: "11:00AM",
    endTime: "1:00PM",
    location: "Chesterfield",
    date: "2026-04-10",
    clientName: "Laura Briggs",
    status: "confirmed",
    serviceType: "Plumbing",
  },
  {
    id: 11,
    title: "Cabinet Fitting",
    startTime: "3:00PM",
    endTime: "5:00PM",
    location: "Sheffield",
    date: "2026-04-10",
    clientName: "Owen Miles",
    status: "pending",
    serviceType: "Carpentry",
  },

  // Saturday Apr 11
  {
    id: 12,
    title: "Deep Clean",
    startTime: "10:00AM",
    endTime: "12:00PM",
    location: "Derby",
    date: "2026-04-11",
    clientName: "Hannah Scott",
    status: "confirmed",
    serviceType: "Cleaning",
  },

  // Next week — Mon Apr 13
  {
    id: 13,
    title: "Boiler Service",
    startTime: "9:00AM",
    endTime: "11:00AM",
    location: "Sheffield",
    date: "2026-04-14",
    clientName: "Victor Reid",
    status: "confirmed",
    serviceType: "HVAC",
  },
  {
    id: 14,
    title: "Leak Repair",
    startTime: "2:00PM",
    endTime: "3:00PM",
    location: "Matlock",
    date: "2026-04-15",
    clientName: "Emma Walsh",
    status: "pending",
    serviceType: "Plumbing",
  },
  {
    id: 15,
    title: "Ceiling Fan Install",
    startTime: "10:00AM",
    endTime: "12:00PM",
    location: "Chesterfield",
    date: "2026-04-16",
    clientName: "Ryan Stone",
    status: "confirmed",
    serviceType: "Electrical",
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
