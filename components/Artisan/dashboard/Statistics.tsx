"use client";

import React from "react";
import StatCard from "@/components/admin/dashboard/StatCard";
import { CalendarDays, CheckCircle2, XCircle, Trophy, DollarSign } from "lucide-react";

type StatisticProp = {
  isLoading: boolean;
  metrics: any;
};

const Statistics = ({ isLoading, metrics }: StatisticProp) => {
  const statsData = [
    {
      label: "Total Appointments",
      value: metrics?.total ?? 0,
      icon: CalendarDays,
      bg: "bg-blue-600",
      loading: isLoading,
    },
    {
      label: "Accepted",
      value: metrics?.accepted ?? 0,
      icon: CheckCircle2,
      bg: "bg-emerald-500",
      loading: isLoading,
    },
    {
      label: "Declined",
      value: metrics?.declined ?? 0,
      icon: XCircle,
      bg: "bg-rose-500",
      loading: isLoading,
    },
    {
      label: "Completed",
      value: metrics?.completed ?? 0,
      icon: Trophy,
      bg: "bg-violet-600",
      loading: isLoading,
    },
    // {
    //   label: "Revenue",
    //   value: metrics?.revenue ? `$${metrics.revenue.toLocaleString()}` : 0,
    //   icon: DollarSign,
    //   bg: "bg-[#02198B]",
    //   loading: isLoading,
    // },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {statsData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Statistics;
