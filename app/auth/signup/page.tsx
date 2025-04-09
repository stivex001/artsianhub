"use client";

import React, { useMemo } from "react";
import ArtisanAuthLayout from "@/components/Artisan/auth/ArtisanAuthLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientSignUp from "@/components/Artisan/auth/ClientSignUp";
import ArtisanSignUp from "@/components/Artisan/auth/ArtisanSignUp";
import { useSearchParams } from "next/navigation";

const ArtisanRegister = () => {
  const params = useSearchParams();
  const artisan = params.get("artisan");

  // Determine tab based on query param
  const activeTab = useMemo(() => {
    return artisan == "true" ? "Artisan" : "client";
  }, [artisan]);

  return (
    <ArtisanAuthLayout>
      <div className="w-11/12 lg:w-[600px] mx-auto px-3 lg:px-8 pt-3 pb-8 bg-white shadow-dropShadow rounded-[10px]">
        <h1 className="font-semibold text-xl text-center ">
          Create your Account
        </h1>

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
            <ClientSignUp />
          </TabsContent>
          <TabsContent value="Artisan" className="w-full">
            <ArtisanSignUp />
          </TabsContent>
        </Tabs>
      </div>
    </ArtisanAuthLayout>
  );
};

export default ArtisanRegister;
