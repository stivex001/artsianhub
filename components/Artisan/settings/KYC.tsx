import Wrapper from "@/components/shared/Wrapper";
import { useKYCStore } from "@/store/kycStore";
import React from "react";
import { ServiceProfileSetup } from "./ServiceProfileSetup";
import Verification from "./Verification";

export const steps = [
  <ServiceProfileSetup />,
  <Verification />,
  "Additional Information",
];

const KYC = () => {
  const { currentStep } = useKYCStore();

  return (
    <Wrapper className="py-6">
      <div className="border-b border-[#5691D1] px-7">
        <h1 className="text-xl font-semibold pb-4">KYC Upload</h1>
      </div>
      <section className="py-9 px-12">
        <div>{steps[currentStep]}</div>
      </section>
    </Wrapper>
  );
};

export default KYC;
