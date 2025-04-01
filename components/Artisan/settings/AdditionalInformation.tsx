"use client";

import CustomControlledMultiSelect from "@/components/controlledInputs/CustomControlledMultiSelect";
import TimeRangePicker from "@/components/controlledInputs/CustomeTimePicker";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useKYCStore } from "@/store/kycStore";
import React, { useEffect } from "react";
import { daysOptions } from "./data";
import { CustomButton } from "@/components/clickable/CustomButton";
import { steps } from "./KYC";
import CreatableSelectComponent from "@/components/controlledInputs/CreatableSelect";


type Props = {};

const fields: Field[] = [
  {
    name: "workAvailability",
    type: "text",
    errorMessage: "workAvailability is required",
    isRequired: true,
  },

  {
    name: "days",
    type: "multiselect",
    errorMessage: "Work Days is required",
    // isRequired: true,
  },
  {
    name: "availableHours",
    type: "text",
    errorMessage: "Available Time is required",
    // isRequired: true,
  },
  {
    name: "workAvailability",
    type: "text",
    errorMessage: "Available Time is required",
    // isRequired: true,
  },
  // {
  //   name: "serviceArea",
  //   type: "text",
  //   errorMessage: "Service Area Time is required",
  //   // isRequired: true,
  // },
  {
    name: "languagesSpoken",
    type: "multiselect",
    errorMessage: "Languages Spoken Time is required",
    // isRequired: true,
  },
];

const AdditionalInformation = (props: Props) => {
  const { currentStep, kycFormData, setkycFormData, nextStep, prevStep } =
    useKYCStore();

  const { control, handleSubmit, setValue } = useDynamicForm(fields, {
    availableHours: kycFormData?.availableHours || "9:00 AM-5:00 PM",
    days: kycFormData?.days || "",
    languagesSpoken: kycFormData?.languagesSpoken || [],
  });

  useEffect(() => {
    if (kycFormData) {
      setValue("availableHours", kycFormData?.availableHours || "");
      setValue("days", kycFormData?.days || "");
      setValue("languagesSpoken", kycFormData?.languagesSpoken || []);
    }
  }, [kycFormData, setValue]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      workAvailability: {
        days: data.days || [],
        availableHours: data.availableHours || "",
      },
      serviceArea: { type: "Point", coordinates: [-0.1278, 51.5074] },
    };

    setkycFormData({
      ...kycFormData,
      ...formattedData,
    });

    nextStep();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[40px] font-semibold">Additional Information</h1>
        <p className="text-base font-semibold">
          Get a job and grow your business
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-7"
      >
        <div>
          <h1 className="text-2xl font-semibold mb-5">Work Availability </h1>
          <div className="grid lg:grid-cols-2 gap-8">
            <CustomControlledMultiSelect
              name="days"
              label="Days"
              // rules={{ required: true }}
              placeholder=""
              control={control}
              options={daysOptions}
            />
            <TimeRangePicker
              name="availableHours"
              label="Available Hours"
              control={control}
            />
          </div>
        </div>
        {/* <div className="w-1/2">
          <h1 className="text-2xl font-semibold mb-5">
            Service Area:{" "}
            <span className="text-sm">
              (Geographical region or distance willing to cover)
            </span>{" "}
          </h1>
          <CustomLocation />
        </div> */}
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold mb-5">
            Select your language:
            <span className="text-sm">
              (To match clients with preferred language needs)
            </span>{" "}
          </h1>
          <CreatableSelectComponent
            name="languagesSpoken"
            control={control}
            label=""
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

export default AdditionalInformation;
