"use client";

import React, { useEffect, useState } from "react";
import Categories from "@/components/admin/category/Categories";
import ViewCategories from "@/components/admin/category/ViewCategories";
import CreateCategories from "@/components/admin/category/CreateCategories";
import Wrapper from "@/components/shared/Wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Eye, Plus } from "lucide-react";

type TabKey = "categories" | "view" | "create";

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "categories", label: "Categories", icon: LayoutGrid },
  { key: "view", label: "View All", icon: Eye },
  { key: "create", label: "Create New", icon: Plus },
];

const ManageCategories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("categories");

  useEffect(() => {
    const tab = searchParams.get("tab") as TabKey;
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("tab", tab);
    router.push(`/admin/dashboard/manage-categories?${current.toString()}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "categories":
        return <Categories />;
      case "view":
        return <ViewCategories />;
      case "create":
        return <CreateCategories />;
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Manage Categories</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Organise and manage service categories on the platform
        </p>
      </div>

      {/* ── Tab bar ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm w-fit">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === key
                ? "bg-primary text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <Wrapper className="shadow-sm border border-gray-100">
        {renderTabContent()}
      </Wrapper>
    </section>
  );
};

export default ManageCategories;
