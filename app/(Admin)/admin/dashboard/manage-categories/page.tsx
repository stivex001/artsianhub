"use client";
import { Descriptions } from "@/components/shared/Headings";
import React, { useEffect, useState } from "react";
import Categories from "@/components/admin/category/Categories";
import ViewCategories from "@/components/admin/category/ViewCategories";
import Wrapper from "@/components/shared/Wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import CreateCategories from "@/components/admin/category/CreateCategories";

type TabKey = "categories" | "view" | "create";

const ManageCategories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("categories");

  useEffect(() => {
    const tab = searchParams.get("tab") as TabKey;
    if (tab) {
      setActiveTab(tab);
    }
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
    <section className="flex flex-col">
      <Descriptions title="Manage Categories " className="font-normal" />

      <div className="flex items-center justify-between gap-6 mt-10 mb-2.5 px-3">
        <div className="flex items-center gap-4">
          <button
            className={`pb-2 text-base text-secondary ${
              activeTab === "categories" ? "border-b border-blue-600" : ""
            }`}
            onClick={() => handleTabChange("categories")}
          >
            Categories
          </button>
          <button
            className={`pb-2 text-base text-secondary ${
              activeTab === "view" ? "border-b border-blue-600 " : ""
            }`}
            onClick={() => handleTabChange("view")}
          >
            View Categories
          </button>
        </div>
        <button
          className={`pb-2 text-base text-secondary ${
            activeTab === "create" ? "border-b-2 border-blue-600 " : ""
          }`}
          onClick={() => handleTabChange("create")}
        >
          Create Categories
        </button>
      </div>
      <Wrapper className="shadow-cardShadow px-3 py-8 border-white">
        <div>{renderTabContent()}</div>
      </Wrapper>
    </section>
  );
};

export default ManageCategories;
