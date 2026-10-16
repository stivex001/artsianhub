"use client";
import React, { useState } from "react";
import Security from "@/components/Artisan/settings/Security";
import ArtisanAccountSetting from "@/components/Artisan/settings/ArtisanAccountSetting";
import KYC from "@/components/Artisan/settings/KYC";
import { UserCircle2, ShieldCheck, KeyRound, ChevronRight } from "lucide-react";

const tabs = [
  {
    id: "personal",
    label: "Account Settings",
    sublabel: "Profile, services & availability",
    icon: UserCircle2,
  },
  {
    id: "kyc",
    label: "KYC Verification",
    sublabel: "Identity & trust documents",
    icon: ShieldCheck,
  },
  {
    id: "security",
    label: "Password",
    sublabel: "Update your credentials",
    icon: KeyRound,
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

const ArtisanSettings = () => {
  const [activeTab, setActiveTab] = useState<TabId>("personal");

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <ArtisanAccountSetting />;
      case "kyc":
        return <KYC />;
      case "security":
        return <Security />;
    }
  };

  const activeTabData = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-[#02198B] via-[#1e3a8a] to-[#F0C422]" />
        <div className="px-6 py-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-[#02198B]">Settings</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your professional profile and account preferences
          </p>
        </div>
      </div>

      {/* ── Split layout ─────────────────────────────────────────── */}
      <div className="flex gap-5 items-start">
        {/* Sidebar nav */}
        <aside className="w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-3 pt-4">
              <p className="px-3 pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Preferences
              </p>

              <nav className="flex flex-col gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                        isActive
                          ? "bg-[#02198B]/[0.06]"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Icon box */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isActive
                            ? "bg-[#02198B] text-white shadow-sm"
                            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-semibold leading-tight ${
                            isActive ? "text-[#02198B]" : "text-gray-700"
                          }`}
                        >
                          {tab.label}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                          {tab.sublabel}
                        </p>
                      </div>

                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#F0C422] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Bottom hint card */}
              <div className="mt-4 mx-1 mb-1 p-3 rounded-xl bg-gradient-to-br from-[#02198B]/[0.04] to-[#F0C422]/[0.07] border border-[#02198B]/[0.06]">
                <p className="text-xs font-semibold text-[#02198B] mb-0.5">
                  Profile Visibility
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  A complete profile attracts more clients and bookings.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Content header */}
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#02198B]/[0.06] flex items-center justify-center shrink-0">
                <activeTabData.icon className="w-4 h-4 text-[#02198B]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {activeTabData.label}
                </p>
                <p className="text-xs text-gray-400">{activeTabData.sublabel}</p>
              </div>
            </div>

            {/* Tab content */}
            <div className="p-6">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanSettings;
