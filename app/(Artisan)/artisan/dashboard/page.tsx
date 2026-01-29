"use client";

import { useArtisans } from "@/api/crud/artisans";
import AppointmentDetailsStats from "@/components/Artisan/dashboard/AppointmentDetailsStats";
import { RecentAppointments } from "@/components/Artisan/dashboard/RecentAppointments";
import Statistics from "@/components/Artisan/dashboard/Statistics";
import ToDoList from "@/components/Artisan/dashboard/ToDoList";
import SubscriptionBanner from "@/components/Artisan/dashboard/SubscriptionBanner";
import IncompleteProfileModal from "@/components/shared/IncompleteProfileModal";
import { useAuthStore } from "@/store/authStore";
import { useSubscriptions } from "@/api/crud/subscriptions";
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

  // Check subscription status
  const { getStatus } = useSubscriptions();
  const { data: subscriptionData } = getStatus();
  const isSubscribed = subscriptionData?.data?.isActive || false;

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
      <SubscriptionBanner isSubscribed={isSubscribed} />
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
