import Wrapper from "@/components/shared/Wrapper";
import { useKYCStore } from "@/store/kycStore";
import React from "react";

const steps = [
  "Service Profile Setup",
  "Verification & Trust Building",
  "Additional Information",
];

const KYC = () => {
  const { currentStep, nextStep, prevStep } = useKYCStore();

  return (
    <Wrapper className="py-6">
      <div className="border-b border-[#5691D1] px-7">
        <h1 className="text-xl font-semibold pb-4">KYC Upload</h1>
      </div>
      <section className="py-9 px-12">
        <div>{steps[currentStep]}</div>

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Back
            </button>
          )}

          {currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

export default KYC;
