"use client";
import { Descriptions } from "@/components/shared/Headings";
import { TabComponent } from "@/components/shared/TabComponent";
import React, { useState } from "react";
import { ArtisanPersonalInfo } from "./Profile";
import KYC from "./KYC";
import Security from "./Security";

type Props = {};

const tabs = [
  { key: "personal", label: "Personal Info" },
  { key: "service", label: "Service Details" },
  { key: "location", label: "Location & Price Details" },
  { key: "working", label: "Working Days and Hours" },
];

const ArtisanAccountSetting = (props: Props) => {
  const [activeTab, setActiveTab] = useState("personal");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <ArtisanPersonalInfo />;
      case "service":
        return <KYC />;
      case "location":
        return <Security />;
      case "working":
        return <Security />;
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <Descriptions
          title="Account Settings"
          desc="Manage your personal details, services, documents, and preferences. You can update them anytime."
        />

        <TabComponent
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      <div>{renderTabContent()}</div>
    </section>
  );
};

export default ArtisanAccountSetting;
