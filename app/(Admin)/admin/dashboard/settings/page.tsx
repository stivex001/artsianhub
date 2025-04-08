import { Descriptions } from "@/components/shared/Headings";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "@/components/Artisan/settings/Profile";
import KYC from "@/components/Artisan/settings/KYC";
import Security from "@/components/Artisan/settings/Security";

type Props = {};

const Settings = (props: Props) => {
  return (
    <section className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-4">
        <Descriptions title="Settings" />
        <Tabs defaultValue="Profile" className="w-full flex justify-start">
          <TabsList className="w-full justify-start  bg-secondary h-14 rounded-[10px] mb-5">
            <div className="flex items-center gap-12">
              <TabsTrigger
                value="Profile"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-white text-sm py-4 px-12"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="kyc"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-white text-sm py-4 px-12"
              >
                KYC
              </TabsTrigger>
              <TabsTrigger
                value="Security"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-white text-sm py-4 px-12"
              >
                Security
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="Profile">
            <Profile />
          </TabsContent>
          <TabsContent value="kyc">
            <KYC />
          </TabsContent>
          <TabsContent value="Security">
            <Security />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Settings;
