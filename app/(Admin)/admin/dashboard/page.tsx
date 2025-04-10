"use client";

import { useUser } from "@/api/crud/user";
import { ArtisanActivities } from "@/components/admin/dashboard/ArtisanActivities";
import { SubscriptionPlans } from "@/components/admin/dashboard/SubscriptionPlans";
import { UserReview } from "@/components/admin/dashboard/UsersReview";
import DailyUpdates from "@/components/Artisan/dashboard/DailyUpdates";
import { Descriptions } from "@/components/shared/Headings";
import { useAuthStore } from "@/store/authStore";
import React from "react";

type Props = {};

const AdminDashboard = (props: Props) => {
  const { getCurrentArtisanUser } = useUser();
  const { data, isLoading } = getCurrentArtisanUser();

  const { currentUser } = useAuthStore();

  console.log(data, "user___");

  return (
    <section className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-6">
        <Descriptions
          title={`Welcome ${currentUser?.firstName} ${currentUser?.lastName}`}
          className="!text-primary !font-normal"
        />
        <div className="border-2 border-primary w-full" />
      </div>
      <div className="flex flex-col gap-5">
        <UserReview />
        <div className="border-2 border-primary w-full " />
        <ArtisanActivities />
        <div className="border-2 border-primary w-full" />
        <SubscriptionPlans />
        <div className="flex flex-col lg:flex-row gap-0.5">
          <DailyUpdates />
          {/* <RevenueDetails /> */}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
