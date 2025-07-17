"use client";

import { useUser } from "@/api/crud/user";
import Statistics from "@/components/Artisan/dashboard/Statistics";
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
    </section>
  );
};

export default ArtisanDashboard;
