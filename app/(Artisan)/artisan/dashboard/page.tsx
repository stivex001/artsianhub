"use client";

import { useUser } from "@/api/crud/user";
import AppointmentDetailsStats from "@/components/Artisan/dashboard/AppointmentDetailsStats";
import Statistics from "@/components/Artisan/dashboard/Statistics";
import ToDoList from "@/components/Artisan/dashboard/ToDoList";
import { useAuthStore } from "@/store/authStore";
import React from "react";

type Props = {};

const ArtisanDashboard = (props: Props) => {
  const { getCurrentUser } = useUser();
  const { data, isLoading } = getCurrentUser();

  const { currentUser } = useAuthStore();

  return (
    <section className="flex flex-col gap-5">
      <Statistics />
      <ToDoList />
     <AppointmentDetailsStats />
    </section>
  );
};

export default ArtisanDashboard;
