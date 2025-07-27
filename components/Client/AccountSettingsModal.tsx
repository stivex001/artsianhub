import React, { useState } from "react";
import { BaseModal } from "../shared/BaseModal";
import {
  X,
  User,
  Settings,
  Shield,
  FileText,
  Camera,
  ChevronDown,
} from "lucide-react";

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AccountSettingsModal = ({ isOpen, onClose }: SettingsProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "0000 000 000",
    location: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "kyc", label: "KYC", icon: FileText },
  ];

  const renderPersonalInfo = () => (
    <div className="flex-1 p-8">
      {/* Profile Picture */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center overflow-hidden">
            <img
              src="/api/placeholder/96/96"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter first name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Enter last name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="flex">
            <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">+234</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location / City
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="Enter your location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Save Change
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInfo();
      case "preferences":
        return (
          <div className="flex-1 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preferences
            </h3>
            <p className="text-gray-600">
              Preferences settings will be implemented here.
            </p>
          </div>
        );
      case "security":
        return (
          <div className="flex-1 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security
            </h3>
            <p className="text-gray-600">
              Security settings will be implemented here.
            </p>
          </div>
        );
      case "kyc":
        return (
          <div className="flex-1 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC</h3>
            <p className="text-gray-600">
              KYC verification will be implemented here.
            </p>
          </div>
        );
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="p-0 bg-white border-none shadow-none !max-w-5xl !rounded-2xl overflow-hidden"
      title="Account Settings"
    >
      <div className="flex">
        <div className="w-48 bg-[#F9F9FB] border-r border-gray-200">
          {/* Navigation Tabs */}
          <div className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">{renderTabContent()}</div>
      </div>
    </BaseModal>
  );
};

export default AccountSettingsModal;
