"use client";
import React from "react";
import ArtisanBreadCrumbs from "@/components/Artisan/portfolio/BreadCrumbs";
import Wrapper from "@/components/shared/Wrapper";
import Image from "next/image";
import { useParams } from "next/navigation";
import { sampleData } from "@/components/Artisan/manageAppointment/data";
import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MapImage } from "@/components/assets/icons/MapIcon";
import { ClientInfo } from "@/components/Artisan/manageAppointment/ClientInfo";
import { ClientDescription } from "@/components/Artisan/manageAppointment/ClientDescription";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-orange-100 text-orange-600";
    case "accepted":
      return "bg-green-100 text-green-600";
    case "declined":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

type Props = {
  appointment?: {
    artisan: {
      name: string;
      profileImage: string;
      location: string;
    };
    status: string;
    description: string;
    preferredDateTime: string;
    location: string;
    attachedImages: string[];
    mapUrl?: string;
  };
};

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
