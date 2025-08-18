"use client";

import { useArtisans } from "@/api/crud/artisans";
import AppointmentDetailsStats from "@/components/Artisan/dashboard/AppointmentDetailsStats";
import { RecentAppointments } from "@/components/Artisan/dashboard/RecentAppointments";
import Statistics from "@/components/Artisan/dashboard/Statistics";
import ToDoList from "@/components/Artisan/dashboard/ToDoList";
import IncompleteProfileModal from "@/components/shared/IncompleteProfileModal";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";

type Props = {};

const ArtisanDashboard = (props: Props) => {
  const [openIncompleteProfile, setOpenIncompleteProfile] = useState(false);

  const { currentUser } = useAuthStore();
  const { getArtisanDashboard } = useArtisans();
  const { data, isLoading } = getArtisanDashboard();
  const dashboardData = data?.data;
  const metrics = dashboardData?.metrics;
  const recentAppointment = dashboardData?.recentAppointments;

  useEffect(() => {
    if (currentUser?.isVerified) {
      const isProfileIncomplete =
        !currentUser.firstName || !currentUser.lastName;
      if (isProfileIncomplete) {
        setOpenIncompleteProfile(true);
      }
    }
  }, [currentUser]);

  return (
    <section className="flex flex-col gap-5">
      <Statistics isLoading={isLoading} metrics={metrics} />
      <ToDoList />
      {/* <AppointmentDetailsStats /> */}
      <RecentAppointments
        appointments={recentAppointment}
        isLoading={isLoading}
      />

      <IncompleteProfileModal
        isOpen={openIncompleteProfile}
        onClose={() => setOpenIncompleteProfile(false)}
        role={currentUser?.role || "artisan"}
      />
    </section>
  );
};

export default ArtisanDashboard;
