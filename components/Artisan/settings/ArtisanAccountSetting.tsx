"use client";
import React, { useState } from "react";
import { ArtisanPersonalInfo } from "./Profile";
import { ArtisanServiceInfo } from "./ArtisanServiceInfo";
import { ArtisanLocationPriceInfo } from "./ArtisanLocationPriceInfo";
import { WorkingHours } from "./WorkingHours";

const tabs = [
  { key: "personal", label: "Personal Info" },
  { key: "service", label: "Service Details" },
  { key: "location", label: "Location & Price" },
  { key: "working", label: "Working Hours" },
];

const ArtisanAccountSetting = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <ArtisanPersonalInfo />;
      case "service":
        return <ArtisanServiceInfo />;
      case "location":
        return <ArtisanLocationPriceInfo />;
      case "working":
        return <WorkingHours />;
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col gap-8">
      {/* ── Sub-tab pill navigation ─────────────────────────────── */}
      <div className="flex gap-1 bg-gray-100/80 rounded-xl p-1 w-fit flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-white text-[#02198B] shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{renderTabContent()}</div>
    </section>
  );
};

export default ArtisanAccountSetting;
