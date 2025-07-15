"use client";

import { useUser } from "@/api/crud/user";
import { AppointmentReview } from "@/components/Artisan/dashboard/AppointmentReview";
import DailyUpdates from "@/components/Artisan/dashboard/DailyUpdates";
import { Descriptions } from "@/components/shared/Headings";
import { useAuthStore } from "@/store/authStore";
import React from "react";

type Props = {};

const ArtisanDashboard = (props: Props) => {
  const { getCurrentUser } = useUser();
  const { data, isLoading } = getCurrentUser();

  const { currentUser } = useAuthStore();

  console.log(data, "user___");

  return (
    <section className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-6">
        <Descriptions
          title={`Welcome ${currentUser?.firstName} ${currentUser?.lastName}`}
          desc="What’s starting point?"
        />
        <div className="border-2 border-primary w-full" />
      </div>
      <div className="flex flex-col gap-1.5">
        <AppointmentReview />
        <div className="flex flex-col lg:flex-row gap-0.5">
          <DailyUpdates />
          {/* <RevenueDetails /> */}
        </div>
      </div>
    </section>
  );
};

export default ArtisanDashboard;
