import { Descriptions } from "@/components/shared/Headings";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KYC from "@/components/Artisan/settings/KYC";
import AppointmentDetails from "@/components/Artisan/AppointmentDetails";

type Props = {};

const AppintmentDetails = (props: Props) => {
  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Appointment" />
      <p className="text-2xl">
        <span className="font-[200]">Manage Appointment</span> / Appointment
      </p>
      <Tabs defaultValue="Appointment" className="w-full flex justify-start">
        <TabsList className="w-full justify-start  bg-secondary h-14 rounded-[10px] mb-5">
          <div className="flex items-center gap-12">
            <TabsTrigger
              value="Appointment"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-white text-sm py-4 px-12"
            >
              Appointment Details
            </TabsTrigger>
            {/* <TabsTrigger
              value="Transaction"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-white text-sm py-4 px-12"
            >
              Transaction Details
            </TabsTrigger> */}
          </div>
        </TabsList>
        <TabsContent value="Appointment">
          <AppointmentDetails />
        </TabsContent>
        <TabsContent value="Transaction">
          <KYC />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AppintmentDetails;
