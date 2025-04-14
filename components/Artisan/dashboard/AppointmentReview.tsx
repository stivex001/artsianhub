"use client";

import { useArtisans } from "@/api/crud/artisans";
import { Details } from "@/components/shared/Details";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

export const AppointmentReview = (props: Props) => {
  const { getBookingCount } = useArtisans();

  const { data: total_appointments, isLoading } = getBookingCount();

  const counts = total_appointments?.counts;

  return (
    <Wrapper className="py-6">
      <div className="border-b border-[#5691D1] px-7">
        <h1 className="text-xl font-semibold pb-4">Appointment Review</h1>
      </div>
      <div className="px-7 my-5 grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-y-12">
        <Details
          className="bg-[#5691D1]"
          title="Total No of Appointment"
          count={counts?.total}
        />
        <Details
          className="bg-[#1F873B]"
          title="Accepted Appointment"
          count={counts?.accepted}
        />{" "}
        <Details
          className="bg-[#AE2525]"
          title="Declined Appointment"
          count={counts?.declined}
        />{" "}
        <Details
          className="bg-primary"
          title="Completed Appointment"
          count={counts?.completed}
        />{" "}
        {/* <Details
          className="bg-primary"
          title="Appointment Revenue"
          count="4000$"
        /> */}
      </div>
      <div className="flex justify-center mt-4 lg:mt-12">
        <div className="w-full px-7 md:px-0 md:w-1/4">
          <Details
            className="bg-[#e94c4c]"
            title="Pending Appointment"
            count={counts?.pending}
          />
        </div>
      </div>
    </Wrapper>
  );
};
