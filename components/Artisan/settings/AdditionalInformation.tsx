"use client";

import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useKYCStore } from "@/store/kycStore";
import React, { useEffect } from "react";

type Props = {};

const fields: Field[] = [
  {
    name: "serviceCategory",
    type: "text",
    errorMessage: "Service Category is required",
    isRequired: true,
  },
  {
    name: "professionalTitle",
    type: "text",
    errorMessage: "Title is required",
    isRequired: true,
  },
  {
    name: "servicePricing",
    type: "number",
    errorMessage: "Service Price is required",
    // isRequired: true,
  },
  {
    name: "yearsOfExperience",
    type: "number",
    errorMessage: "Service Year is required",
    // isRequired: true,
  },
  {
    name: "skillDescription",
    type: "text",
    errorMessage: "Description is required",
    isRequired: true,
  },
  {
    name: "portfolio",
    type: "file",
    errorMessage: "Portfolio is required",
    // isRequired: true,
  },
];

const AdditionalInformation = (props: Props) => {
  const { currentStep, formData, setFormData, nextStep, prevStep } =
    useKYCStore();

  const { control, handleSubmit, setValue } = useDynamicForm(fields, {
    serviceCategory: formData?.serviceCategory || "",
    professionalTitle: formData?.professionalTitle || "",
    servicePricing: formData?.servicePricing
      ? Number(formData?.servicePricing)
      : "",
    yearsOfExperience: formData?.yearsOfExperience
      ? Number(formData?.yearsOfExperience)
      : "",
  });

  useEffect(() => {
    if (formData) {
      setValue("serviceCategory", formData?.serviceCategory || "");
      setValue("professionalTitle", formData?.professionalTitle || "");
      setValue(
        "servicePricing",
        formData?.servicePricing ? Number(formData?.servicePricing) : ""
      );
    }
  }, [formData, setValue]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[40px] font-semibold">Additional Information</h1>
        <p className="text-base font-semibold">
          Get a job and grow your business
        </p>
      </div>
      <form className="mt-8 flex flex-col gap-7">
        <div>
          <h1 className="text-2xl font-semibold mb-5">Work Availability </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-base">Days</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-base">Hours</p>
              <ControlledInput
                name="hour"
                control={control}
                placeholder="1"
                type="number"
                label=" "
                variant="secondary"
                // rules={{ required: true }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdditionalInformation;
