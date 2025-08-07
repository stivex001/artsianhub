"use client";

import React from "react";
import StatCard, { StatCardProps } from "@/components/shared/StatCard";
import {
  CalenderIcon,
  CompletedCase,
  DeclinedCase,
  GreenCase,
  RevenueCase,
} from "@/components/assets/icons/StatsIcon";

type StatisticProp = {
  isLoading: boolean;
  metrics: any;
};

const Statistics = ({ isLoading, metrics }: StatisticProp) => {
  const statsData: StatCardProps[] = [
  {
    label: "Total No. of Appointment",
    value: metrics?.total ?? 0,
    icon: CalenderIcon,
    isLoading,
  },
  {
    label: "Accepted Appointment",
    value: metrics?.accepted ?? 0,
    icon: GreenCase,
    isLoading,
  },
  {
    label: "Declined Appointment",
    value: metrics?.declined ?? 0,
    icon: DeclinedCase,
    isLoading,
  },
  {
    label: "Completed Appointment",
    value: metrics?.completed ?? 0,
    icon: CompletedCase,
    isLoading,
  },
  {
    label: "Appointment Revenue",
    value: metrics?.revenue ?? 0,
    icon: RevenueCase,
    isLoading,
  },
];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statsData.map((item, index) => (
        <StatCard key={index} StatData={item}  />
      ))}
    </div>
  );
};

export default Statistics;
