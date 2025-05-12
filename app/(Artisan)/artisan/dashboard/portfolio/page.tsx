"use client";

import CreateArtisanService from "@/components/Artisan/servicelist/CreateArtisanService";
import ServiceList from "@/components/Artisan/servicelist/ServiceList";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type TabKey = "services" | "view" | "create";
const Portfolio = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("services");

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
    router.push(`/artisan/dashboard/portfolio?${current.toString()}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "services":
        return <ServiceList />;
      case "create":
        return <CreateArtisanService />;
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col">
      <Descriptions
        title="Service List"
        desc="Portfolio Showing Casing Previous work "
      />
      <div className="flex items-center justify-between gap-6 mt-10 mb-2.5 px-3">
        <div className="flex items-center gap-4">
          <button
            className={`pb-2 text-base text-secondary ${
              activeTab === "services" ? "border-b border-blue-600" : ""
            }`}
            onClick={() => handleTabChange("services")}
          >
            Service List
          </button>
        </div>
        <button
          className={`pb-2 text-base text-secondary ${
            activeTab === "create" ? "border-b-2 border-blue-600 " : ""
          }`}
          onClick={() => handleTabChange("create")}
        >
          Create Service
        </button>
      </div>
      <Wrapper className="shadow-cardShadow px-3 py-8 border-white">
        <div>{renderTabContent()}</div>
      </Wrapper>
    </section>
  );
};

export default Portfolio;
