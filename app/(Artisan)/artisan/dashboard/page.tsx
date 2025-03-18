"use client";

import { AppointmentReview } from "@/components/Artisan/dashboard/AppointmentReview";
import DailyUpdates from "@/components/Artisan/dashboard/DailyUpdates";
import RevenueDetails from "@/components/Artisan/dashboard/RevenueDetails";
import { Descriptions } from "@/components/shared/Headings";
import React from "react";

type Props = {};

const ArtisanDashboard = (props: Props) => {
  return (
    <section className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-6">
        <Descriptions
          title="Welcome Albert Bannor"
          desc="What’s starting point?"
        />
        <div className="border-2 border-primary w-full" />
      </div>
      <div className="flex flex-col gap-1.5">
        <AppointmentReview />
        <div className="flex flex-col lg:flex-row gap-0.5">
          <DailyUpdates />
          <RevenueDetails />
        </div>
      </div>
    </section>
  );
};

export default ArtisanDashboard;
