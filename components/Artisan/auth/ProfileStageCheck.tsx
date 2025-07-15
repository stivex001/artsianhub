"use client";
import { ProfileCheckIcon } from "@/components/assets/icons/UsersIcon";
import { useArtisanProfileStore } from "@/store/artisanProfileStore";
import React from "react";

type Props = {};

export const ProfileStageCheck = (props: Props) => {
  const { completedSteps, currentStep } = useArtisanProfileStore();

  const stages = [
    {
      number: 1,
      title: "Personal Info",
      completed: completedSteps.personalInfo,
    },
    {
      number: 2,
      title: "Service Details",
      completed: completedSteps.serviceDetails,
    },
    {
      number: 3,
      title: "Location & Price Details",
      completed: completedSteps.locationPriceDetails,
    },
  ];

  return (
    <div className="flex flex-col mt-8">
      {stages.map((stage, index) => {
        const isActive = stage.number === currentStep;
        return (
          <div key={stage.number} className="relative mb-6">
            <div className="flex items-center gap-3">
              {stage.completed ? (
                <ProfileCheckIcon />
              ) : (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-white text-body font-bold text-base`}
                >
                  {stage.number}
                </div>
              )}

              {index < stages.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-12 border-l-2 border-dotted border-[#EBEBEB] -translate-x-0.5"></div>
              )}

              {/* Title */}
              <div
                className={`text-xl font-bold ${
                  stage.completed || isActive
                    ? "text-paragrah"
                    : "text-[#98A2B3]"
                }`}
              >
                {stage.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
