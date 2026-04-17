"use client";

import { useArtisans } from "@/apis/crud/artisans";
import AppointmentDetailsStats from "@/components/Artisan/dashboard/AppointmentDetailsStats";
import { RecentAppointments } from "@/components/Artisan/dashboard/RecentAppointments";
import Statistics from "@/components/Artisan/dashboard/Statistics";
import QuickLinks from "@/components/Artisan/dashboard/QuickLinks";
import SubscriptionBanner from "@/components/Artisan/dashboard/SubscriptionBanner";
import IncompleteProfileModal from "@/components/shared/IncompleteProfileModal";
import { useAuthStore } from "@/store/authStore";
import { useSubscriptions } from "@/apis/crud/subscriptions";
import React, { useEffect, useState } from "react";
import { AuthLoadingScreen } from "@/components/auth/AuthLoader";

type Props = {};

const ArtisanDashboard = (props: Props) => {
  const [openIncompleteProfile, setOpenIncompleteProfile] = useState(false);

  const { currentUser, isHydrated } = useAuthStore();
  const { getArtisanDashboard } = useArtisans();
  const { data, isLoading: isDashboardLoading } = getArtisanDashboard();

  // Check subscription status
  const { getStatus } = useSubscriptions();
  const { data: subscriptionData, isLoading: isSubscriptionLoading } =
    getStatus();

  // Wait for hydration and data loading to prevent layout shift and flickering
  const isPageLoading =
    !isHydrated || isDashboardLoading || isSubscriptionLoading;

  useEffect(() => {
    if (currentUser?.isVerified) {
      const isProfileIncomplete =
        !currentUser.firstName || !currentUser.lastName;
      if (isProfileIncomplete) {
        setOpenIncompleteProfile(true);
      }
    }
  }, [currentUser]);

  if (isPageLoading) {
    return <AuthLoadingScreen message="Loading dashboard..." />;
  }

  const dashboardData = data?.data;
  const metrics = dashboardData?.metrics;
  const recentAppointment = dashboardData?.recentAppointments;
  const isSubscribed = subscriptionData?.data?.isActive || false;

  return (
    <section className="flex flex-col gap-5">
      <SubscriptionBanner isSubscribed={isSubscribed} />
      <Statistics isLoading={isDashboardLoading} metrics={metrics} />
      <QuickLinks />
      {/* <AppointmentDetailsStats /> */}
      <RecentAppointments
        appointments={recentAppointment}
        isLoading={isDashboardLoading}
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
