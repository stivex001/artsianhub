"use client";
import { useAppointments } from "@/api/crud/appointments";
import { useArtisans } from "@/api/crud/artisans";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";
import CustomBarChart from "@/components/shared/CustomBarChart";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

const data = [
  {
    name: "Total Appointment",
    value: 60,
    color: "#5691D1",
    labelColor: "#5691D1",
  },
  {
    name: "Accepted Appointment",
    value: 30,
    color: "#1F873B",
    labelColor: "#1F873B",
  },
  {
    name: "Declined Appointment",
    value: 18,
    color: "#AE2525",
    labelColor: "#AE2525",
  },
  {
    name: "Completed Appointment",
    value: 28,
    color: "#0D3D73",
    labelColor: "#0D3D73",
  },
];

const DailyUpdates = (props: Props) => {
  const [dateTo, setDateTo] = React.useState<Date>();
  const [dateFrom, setDateFrom] = React.useState<Date>();

  const { getBookingCount } = useAppointments();
  
    const { data: total_appointments, isLoading } = getBookingCount();
  
    const counts = total_appointments?.counts

    const chartData = counts
    ? [
        {
          name: "Total Appointment",
          value: counts?.total || 0,
          color: "#5691D1",
          labelColor: "#5691D1",
        },
        {
          name: "Pending Appointment",
          value: counts?.pending || 0,
          color: "#e94c4c",
          labelColor: "#e94c4c",
        },
        {
          name: "Accepted Appointment",
          value: counts?.accepted || 0,
          color: "#1F873B",
          labelColor: "#1F873B",
        },
        {
          name: "Declined Appointment",
          value: counts?.declined || 0,
          color: "#AE2525",
          labelColor: "#AE2525",
        },
        {
          name: "Completed Appointment",
          value: counts?.completed || 0,
          color: "#0D3D73",
          labelColor: "#0D3D73",
        },
      ]
    : [];


  return (
    <Wrapper className="flex-1 px-2 py-5">
      <div className="w-11/12 mx-auto flex items-center justify-between gap-7 mb-8">
        <div className="flex items-center gap-2">
          <button className="px-2 py-2.5 bg-blue-500 text-white rounded">
            Daily
          </button>
          <button className="px-2 py-2.5 bg-white text-primary rounded">
            Weekly
          </button>
          <button className="px-2 py-2.5 bg-white text-primary rounded">
            Monthly
          </button>
        </div>
        <div className="flex items-center gap-4">
          <CustomDatePicker date={dateTo} setDate={setDateTo} />
          <CustomDatePicker date={dateFrom} setDate={setDateFrom} />
        </div>
      </div>
      <CustomBarChart data={chartData} />
    </Wrapper>
  );
};

export default DailyUpdates;
