"use client";

import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import CustomControlledMultiSelect from "@/components/controlledInputs/CustomControlledMultiSelect";
import TimeRangePicker from "@/components/controlledInputs/CustomeTimePicker";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useKYCStore } from "@/store/kycStore";
import React, { useEffect } from "react";
import { daysOptions } from "./data";
import { CustomButton } from "@/components/clickable/CustomButton";
import { steps } from "./KYC";

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
];

const AdditionalInformation = (props: Props) => {
  const { currentStep, formData, setFormData, nextStep, prevStep } =
    useKYCStore();

  const { control, handleSubmit, setValue } = useDynamicForm(fields, {
    availableHours: formData?.availableHours || "9:00 AM-5:00 PM",
    days: formData?.days || "",
  });

  useEffect(() => {
    if (formData) {
      setValue("availableHours", formData?.availableHours || "");
      setValue("days", formData?.days || "");
    }
  }, [formData, setValue]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      workAvailability: {
        days: data.days || [],
        availableHours: data.availableHours || "",
      },
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
        <div className="mt-8 flex items-center gap-5 justify-end">
          {currentStep > 0 && (
            <CustomButton
              type="button"
              onClick={prevStep}
              label="Next"
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
