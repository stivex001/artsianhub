"use client";
import React from "react";
import ProfileSetupLayout from "./ProfieSetupLayout";
import { useArtisanProfileStore } from "@/store/artisanProfileStore";
import { PersonalInfoStage } from "./PersonalInfoStage";
import { ServiceDetailsStage } from "./ServiceDetailsStage";
import { LocationPriceStage } from "./LocationPriceStage";


export const ArtisanProfileSetup = () => {
  const { currentStep } = useArtisanProfileStore();

  const renderStage = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStage />;
      case 2:
        return <ServiceDetailsStage />;
      case 3:
        return <LocationPriceStage />;
      default:
        return <PersonalInfoStage />;
    }
  };

  return (
    <ProfileSetupLayout
      role="artisan"
      art
      title="Setup Your Artisan Profile"
      desc="Help customers discover your services by telling us about your skills, service location, and experience. Build trust and start getting booked."
    >
      <div>{renderStage()}</div>
    </ProfileSetupLayout>
  );
};
