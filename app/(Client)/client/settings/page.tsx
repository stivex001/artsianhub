"use client";

import React, { useState } from "react";
import { ProfileIcon } from "@/components/assets/icons/UsersIcon";
import { CalenderIcon, SecurityIcon } from "@/components/assets/icons/LinksIcon";
import { PersonalInfo } from "@/components/Client/settings/PersonalInfo";
import { Preference } from "@/components/Client/settings/Preference";
import { Security } from "@/components/Client/settings/Security";

const ClientSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Info", icon: ProfileIcon },
    { id: "preferences", label: "Preferences", icon: CalenderIcon },
    { id: "security", label: "Security", icon: SecurityIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo />;
      case "preferences":
        return <Preference />;
      case "security":
        return <Security />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-600 hover:text-primary"
              }`}
            >
              <Icon />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-4">{renderTabContent()}</div>
    </div>
  );
};

export default ClientSettings;
