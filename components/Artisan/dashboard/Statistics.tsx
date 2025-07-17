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

const statsData: StatCardProps[] = [
  {
    label: "Total No. of Appointment",
    value: 12,
    icon: CalenderIcon,
  },
  {
    label: "Accepted Appointment",
    value: 342,
    icon: GreenCase,
  },
  {
    label: "Declined Appointment",
    value: 47,
    icon: DeclinedCase,
  },
  {
    label: "Completed Appointment",
    value: 47,
    icon: CompletedCase,
  },
  {
    label: "Appointment Revenue",
    value: 90902,
    icon: RevenueCase,
  },
];

const Statistics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statsData.map((item, index) => (
        <StatCard key={index} StatData={item} />
      ))}
    </div>
  );
};

export default Statistics;
