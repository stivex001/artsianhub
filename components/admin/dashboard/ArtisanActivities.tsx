import { Details } from "@/components/shared/Details";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

export const ArtisanActivities = (props: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl text-primary pb-2">Artisan Activities</h1>
      <Wrapper className="px-5 py-8 bg-secondary">
        <div className="px-7 my-5 grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-y-12">
          <Details
            className="bg-[#B1C7D2] text-primary"
            title="Appointments"
            count="1000"
          />
          <Details
            className="bg-[#B1C7D2] text-primary"
            title="Accepted Appointment"
            count="900"
          />{" "}
          <Details
            className="bg-[#B1D2CC] text-primary"
            title="Decline Artisans"
            count="50"
          />{" "}
          <Details
            className="bg-[#C7D2B1] text-primary"
            title="Completed Appointment"
            count="500"
          />{" "}
        </div>
      </Wrapper>
    </div>
  );
};
