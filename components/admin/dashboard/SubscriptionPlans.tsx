import { Details } from "@/components/shared/Details";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

export const SubscriptionPlans = (props: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl text-primary pb-2">Subscription Plan</h1>
      <Wrapper className="px-5 py-8 bg-secondary">
        <div className="px-7 my-5 grid md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-y-12">
          <Details
            className="bg-[#DFE8D1] text-primary"
            title="Tier 1"
            count="1000"
          />
          <Details
            className="bg-[#BDD3AC] text-primary"
            title="Tier 2"
            count="900"
          />{" "}
          <Details
            className="bg-[#C2CD6C] text-primary"
            title="Tier 3"
            count="50"
          />{" "}
          <Details
            className="bg-[#C2E86B] text-primary"
            title="Tier 4"
            count="500"
          />{" "}
        </div>
      </Wrapper>
    </div>
  );
};
