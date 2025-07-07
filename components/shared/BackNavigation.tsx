"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowB } from "../assets/icons/NavigationIcons";

type Props = {};

export const BackNavigation = (props: Props) => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="flex items-center gap-2">
      <ArrowB />
      <span className="text-sm font-medium text-paragrah">Back</span>
    </button>
  );
};
