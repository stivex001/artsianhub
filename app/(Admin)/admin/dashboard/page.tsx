"use client";

import { useArtisans } from "@/api/crud/artisans";
import { useUser } from "@/api/crud/user";
import { ArtisanActivities } from "@/components/admin/dashboard/ArtisanActivities";
import { SubscriptionPlans } from "@/components/admin/dashboard/SubscriptionPlans";
import { UserReview } from "@/components/admin/dashboard/UsersReview";
import CustomBarChart from "@/components/shared/CustomBarChart";
import { Descriptions } from "@/components/shared/Headings";
import { Spinner } from "@/components/shared/Spinner";
import React from "react";

type Props = {};

const revenueData = [
  {
    name: "Artisan Revenue",
    value: 60,
    color: "#D3DE31",
    labelColor: "#5691D1",
  },
  {
    name: "Subscription Revenue",
    value: 30,
    color: "#013975",
    labelColor: "#1F873B",
  },
];

const AdminDashboard = (props: Props) => {
  const { getCurrentUser } = useUser();
  const { getAllArtisanCount } = useArtisans();
  const { data, isLoading } = getCurrentUser();
  const { data: counts, isLoading: ispending } = getAllArtisanCount();

  const appointmentsCount = counts?.appointments;
  const usersCount = counts?.users;

  return (
    <section className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-6">
        <Descriptions
          title={`Welcome Admin`}
          className="!text-primary !font-normal"
        />
        <div className="border-2 border-primary w-full" />
      </div>
      <div className="flex flex-col gap-5">
        <UserReview usersCount={usersCount} isLoading={ispending} />
        <div className="border-2 border-primary w-full " />
        <ArtisanActivities
          appointmentsCount={appointmentsCount}
          isLoading={isLoading}
        />
        {/* <div className="border-2 border-primary w-full" />
        <SubscriptionPlans /> */}
        <div className="">
          <CustomBarChart data={revenueData} />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
