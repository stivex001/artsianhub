import { Header } from "@/components/navigations/Header";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SettingsLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#f9f9fb] to-[#fef9f0]">
      <Header
        brandlogo
        className="!bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-gray-100/50 shadow-sm"
        logoHref="/"
      />

      {/* Spacer for fixed header */}
      <div className="h-[20px]" />

      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h1 className="text-2xl md:text-3xl font-bold text-paragrah">
              Account Settings
            </h1>
          </div>
          <p className="text-sm md:text-base text-[#667185] ml-[18px]">
            Manage your profile, preferences, and security settings
          </p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
