"use client";

import CreateArtisanService from "@/components/Artisan/servicelist/CreateArtisanService";
import CreateServices from "@/components/Artisan/servicelist/CreateService";
import ServiceList from "@/components/Artisan/servicelist/ServiceList";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type TabKey = "servicelist" | "view" | "create";

const Portfolio = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("servicelist");

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
    router.push(`/admin/dashboard/portfolio?${current.toString()}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "servicelist":
        return <ServiceList />;
      // case "view":
      //   return <ViewServiceList />;
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
              activeTab === "servicelist" ? "border-b border-blue-600" : ""
            }`}
            onClick={() => handleTabChange("servicelist")}
          >
            Service list
          </button>
          {/* <button
            className={`pb-2 text-base text-secondary ${
              activeTab === "view" ? "border-b border-blue-600 " : ""
            }`}
            onClick={() => handleTabChange("view")}
          >
            View Services
          </button> */}
        </div>
        <button
          className={`pb-2 text-base text-secondary ${
            activeTab === "create" ? "border-b-2 border-blue-600 " : ""
          }`}
          onClick={() => handleTabChange("create")}
        >
          Create Services
        </button>
      </div>
      <Wrapper className="shadow-cardShadow px-3 py-8 border-white">
        <div>{renderTabContent()}</div>
      </Wrapper>
    </section>
  );
};

export default Portfolio;
