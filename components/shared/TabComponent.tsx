interface TabProps {
  tabs: Array<{
    key: string;
    label: string;
    count?: number;
  }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabComponent: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="bg-[#F9F9FB] p-1 rounded-2xl w-fit">
      <nav className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`whitespace-nowrap py-2 px-3  font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.key
                ? "bg-white rounded-xl text-paragrah"
                : "border-transparent text-[#667185] hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
            {/* {tab.count !== undefined && (
              <span
                className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.key
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {tab.count}
              </span>
            )} */}
          </button>
        ))}
      </nav>
    </div>
  );
};
