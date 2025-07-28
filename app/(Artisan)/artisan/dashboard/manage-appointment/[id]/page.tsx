"use client";
import React from "react";
import ArtisanBreadCrumbs from "@/components/Artisan/portfolio/BreadCrumbs";
import Wrapper from "@/components/shared/Wrapper";
import { useParams } from "next/navigation";
import { sampleData } from "@/components/Artisan/manageAppointment/data";
import { ClientInfo } from "@/components/Artisan/manageAppointment/ClientInfo";
import { ClientDescription } from "@/components/Artisan/manageAppointment/ClientDescription";

type Props = {};

const AppointmentDetails = ({}: Props) => {
  const params = useParams();
  const id = params.id;
  const appointment = sampleData?.find((art) => String(art?.id) === String(id));

  return (
    <main className="flex flex-col gap-5">
      <ArtisanBreadCrumbs
        title="Appointment"
        url="/artisan/dashboard/manage-appointment"
        desc="Appointment Detail"
      />
      <Wrapper className=" ">
        <div className="flex flex-col lg:flex-row gap-8">
          <ClientInfo appointment={appointment} />

          <ClientDescription appointment={appointment} />
        </div>
      </Wrapper>
    </main>
  );
};

export default AppointmentDetails;
