"use client";

import React from "react";

type Tab = {
  label: string;
  value: string;
};

type FilterTabsProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex flex-wrap gap-6 text-base text-blue-500 px-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`pb-2 border-b-2 transition-colors text-base ${
            activeTab === tab.value
              ? "border-blue-500 text-blue-500"
              : "border-transparent hover:text-blue-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
