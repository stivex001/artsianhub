"use client";

import React, { useState } from "react";
import { ProfileIcon } from "@/components/assets/icons/UsersIcon";
import {
  CalenderIcon,
  SecurityIcon,
} from "@/components/assets/icons/LinksIcon";
import { PersonalInfo } from "@/components/Client/settings/PersonalInfo";
import { Preference } from "@/components/Client/settings/Preference";
import { Security } from "@/components/Client/settings/Security";

const ClientSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    {
      id: "personal",
      label: "Personal Info",
      icon: ProfileIcon,
      description: "Update your profile details",
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: CalenderIcon,
      description: "Customize your experience",
    },
    {
      id: "security",
      label: "Security",
      icon: SecurityIcon,
      description: "Manage account security",
    },
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
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Navigation - Desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-[104px] bg-white rounded-2xl shadow-shadowo border border-gray-100/50 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-paragrah">
              Settings Menu
            </h2>
          </div>
          <nav className="p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group mb-1 last:mb-0 ${
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-primary/5 shadow-sm"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`mt-0.5 p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    <Icon />
                  </div>
                  <div>
                    <span
                      className={`block text-sm font-medium transition-colors ${
                        isActive
                          ? "text-primary"
                          : "text-paragrah group-hover:text-primary"
                      }`}
                    >
                      {tab.label}
                    </span>
                    <span className="text-xs text-[#667185]">
                      {tab.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden bg-white rounded-2xl shadow-shadowo border border-gray-100/50 p-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-darkBlue text-white shadow-md shadow-primary/20"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl shadow-shadowo border border-gray-100/50 overflow-hidden">
          {/* Content Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/50">
            <div className="flex items-center gap-3">
              {(() => {
                const currentTab = tabs.find((t) => t.id === activeTab);
                const Icon = currentTab?.icon || ProfileIcon;
                return (
                  <>
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-paragrah">
                        {currentTab?.label}
                      </h2>
                      <p className="text-sm text-[#667185]">
                        {currentTab?.description}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 animate-fade-in" key={activeTab}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;
