"use client";
import { CustomButton } from "@/components/clickable/CustomButton";
import {
  ControlledFileUpload,
  FileWithPreview,
} from "@/components/controlledInputs/ControlledFileUpload";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useKYCStore } from "@/store/kycStore";
import React from "react";
import { steps } from "./KYC";

type Props = {};
const fields: Field[] = [
  {
    name: "governmentIssuedID",
    type: "file",
    errorMessage: "Government Issued ID is required",
    isRequired: true,
  },
  {
    name: "proofOfAddress",
    type: "file",
    errorMessage: "Proof Of Address is required",
    isRequired: true,
  },
  {
    name: "professionalCertifications",
    type: "file",
    errorMessage: "Professional Certifications is required",
    isRequired: true,
  },
  {
    name: "yearsOfExperience",
    type: "number",
    errorMessage: "Service Year is required",
    isRequired: true,
  },
  {
    name: "skillDescription",
    type: "text",
    errorMessage: "Description is required",
    isRequired: true,
  },
];

const Verification = (props: Props) => {
  const { currentStep, formData, setFormData, nextStep, prevStep } =
    useKYCStore();

  console.log(formData, "formdata");
  const { control, handleSubmit, setValue } = useDynamicForm(fields, {
    serviceCategory: formData?.serviceCategory || "",
    professionalTitle: formData?.professionalTitle || "",
    servicePricing: formData?.servicePricing || "",
    yearsOfExperience: formData?.yearsOfExperience || "",
    skillDescription: formData?.skillDescription || "",
    portfolio: formData?.portfolio?.[0] || "",
  });

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      portfolio: data?.portfolio?.map((file: FileWithPreview) => file?.preview),
    };

    setFormData({
      ...formData,
      ...formattedData,
    });
    console.log("Formatted Data:", formattedData);
    nextStep();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[40px] font-semibold">
          Verification & Trust Building
        </h1>
        <p className="text-base font-semibold">
          Secure Job and grow your Business
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 mt-20"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <ControlledFileUpload
            name="governmentIssuedID"
            control={control}
            label="Upload Government-Issued ID (for identity verification)"
            // rules={{ required: true }}
          />
          <ControlledFileUpload
            name="proofOfAddress"
            control={control}
            label="Proof of Address(Recent utility bill of official correspondence)."
            // rules={{ required: true }}
          />
        </div>
        <div className="w-1/2">
          <ControlledFileUpload
            name="professionalCertifications"
            control={control}
            label="Provide any Professional Certifications (if available)*"
            // rules={{ required: true }}
          />
        </div>
        <div className="w-1/2">
          <ControlledFileUpload
            name="portfolio"
            control={control}
            label="Add Customer References or Testimonials (if applicable)*."
          />
        </div>

        <div className="mt-8 flex items-center gap-5 justify-end">
          {currentStep > 0 && (
            <CustomButton
              type="button"
              onClick={prevStep}
              label="Back"
              className="bg-gray-300 text-white w-[100px]"
            />
          )}

          {currentStep < steps.length - 1 && (
            <CustomButton
              type="submit"
              label="Next"
              className="bg-secondary text-white w-[100px]"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Verification;
