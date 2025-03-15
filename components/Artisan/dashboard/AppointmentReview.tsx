import { Details } from "@/components/shared/Details";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

export const AppointmentReview = (props: Props) => {
  return (
    <Wrapper className="py-6">
      <div className="border-b border-[#5691D1] px-7">
        <h1 className="text-xl font-semibold pb-4">Appointment Review</h1>
      </div>
      <div className="px-7 my-5 grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-y-12">
        <Details
          className="bg-[#5691D1]"
          title="Total No of Appointment"
          count="50"
        />
        <Details
          className="bg-[#1F873B]"
          title="Accepted Appointment"
          count="50"
        />{" "}
        <Details
          className="bg-[#AE2525]"
          title="Declined Appointment"
          count="50"
        />{" "}
        <Details
          className="bg-primary"
          title="Completed Appointment"
          count="50"
        />{" "}
        {/* <Details
          className="bg-primary"
          title="Appointment Revenue"
          count="4000$"
        /> */}
      </div>
      <div className="flex justify-center mt-4 lg:mt-12">
        <div className="md:w-1/4">
          <Details
            className="bg-primary"
            title="Appointment Revenue"
            count="$400,000"
          />
        </div>
      </div>
    </Wrapper>
  );
};
