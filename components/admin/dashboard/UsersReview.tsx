import { Details } from "@/components/shared/Details";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

export const UserReview = (props: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl text-primary pb-2">Users</h1>
      <Wrapper className="px-5 py-8 bg-secondary">
        <div className="px-7 my-5 grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-y-12">
          <Details
            className="bg-[#D9D9D9] text-primary"
            title="Artisans"
            count="1000"
          />
          <Details
            className="bg-[#1F873B]"
            title="Active Artisans"
            count="900"
          />{" "}
          <Details
            className="bg-[#D09B9B]"
            title="Inactive Artisans"
            count="50"
          />{" "}
          <Details
            className="bg-[#AE2525]"
            title="Deactivated Artisans"
            count="50"
          />{" "}
        </div>
      </Wrapper>
    </div>
  );
};
