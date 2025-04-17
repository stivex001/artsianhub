import { Details } from "@/components/shared/Details";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {
  appointmentsCount: any;
};

export const ArtisanActivities = ({ appointmentsCount }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl text-primary pb-2">Artisan Activities</h1>
      <Wrapper className="px-5 py-8 bg-secondary">
        <div className="px-7 my-5 grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-y-12">
          <Details
            className="bg-[#B1C7D2] text-primary"
            title="Appointments"
            count={appointmentsCount?.totalAppointments}
          />
          <Details
            className="bg-[#B1C7D2] text-primary"
            title="Accepted Appointment"
            count={appointmentsCount?.acceptedAppointments}
          />{" "}
          <Details
            className="bg-[#B1D2CC] text-primary"
            title="Decline Artisans"
            count={appointmentsCount?.declinedAppointments}
          />{" "}
          <Details
            className="bg-[#C7D2B1] text-primary"
            title="Completed Appointment"
            count={appointmentsCount?.completedAppointments}
          />{" "}
        </div>
      </Wrapper>
    </div>
  );
};
