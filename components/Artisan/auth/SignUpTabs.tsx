"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientSignUp from "@/components/Artisan/auth/ClientSignUp";
import ArtisanSignUp from "@/components/Artisan/auth/ArtisanSignUp";

const SignUpTabs = () => {
  const [activeTab, setActiveTab] = useState<"client" | "Artisan">("client");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const artisan = searchParams.get("artisan");
    console.log(artisan, "artstsys");

    setActiveTab(artisan == "true" ? "Artisan" : "client");
  }, []);

  return (
    <Tabs
      defaultValue={activeTab}
      className="w-full flex items-center justify-center gap-6 mt-5"
    >
      <TabsList>
        <TabsTrigger
          value="client"
          className="w-full flex items-start justify-start text-sm text-[#3D3D3D] font-semibold data-[state=active]:bg-secondary data-[state=active]:text-white rounded-2xl px-4 py-3 h-10 "
        >
          As a Client
        </TabsTrigger>
        <TabsTrigger
          value="Artisan"
          className="w-full flex items-start justify-start text-sm text-[#3D3D3D] font-semibold data-[state=active]:bg-secondary data-[state=active]:text-white rounded-2xl px-4 py-3 h-10 "
        >
          As an Artisan
        </TabsTrigger>
      </TabsList>

      <TabsContent value="client" className="w-full">
        <ClientSignUp role="client" />
      </TabsContent>
      <TabsContent value="Artisan" className="w-full">
        <ArtisanSignUp />
      </TabsContent>
    </Tabs>
  );
};

export default SignUpTabs;
