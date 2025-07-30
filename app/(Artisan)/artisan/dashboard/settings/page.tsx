"use client";
import React, { useState } from "react";
import Security from "@/components/Artisan/settings/Security";
import Wrapper from "@/components/shared/Wrapper";
import { ProfileIcon } from "@/components/assets/icons/UsersIcon";
import {
  CalenderIcon,
  SecurityIcon,
} from "@/components/assets/icons/LinksIcon";
import { PersonalInfo } from "@/components/Client/settings/PersonalInfo";
import ArtisanAccountSetting from "@/components/Artisan/settings/ArtisanAccountSetting";
import KYC from "@/components/Artisan/settings/KYC";

type Props = {};

const tabs = [
  { id: "personal", label: "Account Settings", icon: ProfileIcon },
  { id: "kyc", label: "KYC", icon: CalenderIcon },
  { id: "security", label: "Password", icon: SecurityIcon },
  { id: "notification", label: "Notification", icon: SecurityIcon },
  { id: "billing", label: "Billings & Subscription", icon: SecurityIcon },
];

const ArtisanSettings = (props: Props) => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <ArtisanAccountSetting />;
      case "kyc":
        return <KYC />;
      case "security":
        return <Security />;

      default:
        return <PersonalInfo />;
    }
  };

  return (
    <Wrapper className="flex gap-5">
      <section className="w-[23%]  pr-5 border-r border-[#E4E5EA] min-h-[80vh]">
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full  flex items-center gap-3 px-4 py-[14px] rounded-2xl text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#1129A01A] text-primary"
                    : "text-body hover:bg-gray-100"
                }`}
              >
                {/* <Icon /> */}
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </section>
      <div className="w-[77%]">{renderTabContent()}</div>
    </Wrapper>
  );
};

export default ArtisanSettings;
