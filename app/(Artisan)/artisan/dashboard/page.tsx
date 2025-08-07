"use client";

import { useArtisans } from "@/api/crud/artisans";
import AppointmentDetailsStats from "@/components/Artisan/dashboard/AppointmentDetailsStats";
import { RecentAppointments } from "@/components/Artisan/dashboard/RecentAppointments";
import Statistics from "@/components/Artisan/dashboard/Statistics";
import ToDoList from "@/components/Artisan/dashboard/ToDoList";
import React from "react";

type Props = {};

const ArtisanDashboard = (props: Props) => {
  const { getArtisanDashboard } = useArtisans();
  const { data, isLoading } = getArtisanDashboard();
  const dashboardData = data?.data;
  const metrics = dashboardData?.metrics;
  const recentAppointment = dashboardData?.recentAppointments;

  console.log(dashboardData, "dahsbBBb");

  return (
    <section className="flex flex-col gap-5">
      <Statistics isLoading={isLoading} metrics={metrics} />
      <ToDoList />
      {/* <AppointmentDetailsStats /> */}
      <RecentAppointments
        appointments={recentAppointment}
        isLoading={isLoading}
      />
    </section>
  );
};

export default ArtisanDashboard;
