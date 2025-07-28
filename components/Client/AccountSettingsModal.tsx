"use client";

import React, { useState } from "react";
import { BaseModal } from "../shared/BaseModal";

import { PersonalInfo } from "./settings/PersonalInfo";
import { ProfileIcon } from "../assets/icons/UsersIcon";
import { CalenderIcon, SecurityIcon } from "../assets/icons/LinksIcon";
import { Preference } from "./settings/Preference";
import { Security } from "./settings/Security";

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AccountSettingsModal = ({ isOpen, onClose }: SettingsProps) => {
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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="p-0 bg-white border-none shadow-none !max-w-5xl !rounded-2xl overflow-hidden !max-h-[600px]"
      title="Account Settings"
    >
      <div  className="flex pb-4">
        <div className="w-64 bg-[#F9F9FB]  rounded-xl p-2  ">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full  flex items-center gap-3 p-3  rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#1129A01A] text-primary"
                      : "text-body hover:bg-gray-100"
                  }`}
                >
                  <Icon />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 px-5 py-1 bg-white">{renderTabContent()}</div>
      </div>
    </BaseModal>
  );
};

export default AccountSettingsModal;
