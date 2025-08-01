"use client";
import React from "react";
import ArtisanBreadCrumbs from "@/components/Artisan/portfolio/BreadCrumbs";
import Wrapper from "@/components/shared/Wrapper";
import { useParams } from "next/navigation";
import { ClientInfo } from "@/components/Artisan/manageAppointment/ClientInfo";
import { ClientDescription } from "@/components/Artisan/manageAppointment/ClientDescription";
import { useAppointments } from "@/api/crud/appointments";

type Props = {};

const AppointmentDetails = ({}: Props) => {
  const params = useParams();
  const id = params.id;

  const { getSingleBooking } = useAppointments();
  const { data: booking, isPending, refetch } = getSingleBooking(`${id}`);
  const appointment = booking?.data;

  return (
    <main className="flex flex-col gap-5">
      <ArtisanBreadCrumbs
        title="Appointment"
        url="/artisan/dashboard/manage-appointment"
        desc="Appointment Detail"
      />
      <Wrapper className=" ">
        <div className="flex flex-col lg:flex-row gap-8">
          <ClientInfo
            appointment={appointment}
            isPending={isPending}
            refetch={refetch}
            id={id}
          />

          <ClientDescription appointment={appointment} isPending={isPending} />
        </div>
      </Wrapper>
    </main>
  );
};

export default AppointmentDetails;
