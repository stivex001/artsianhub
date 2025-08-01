"use client";

import CustomControlledMultiSelect from "@/components/controlledInputs/CustomControlledMultiSelect";
import TimeRangePicker from "@/components/controlledInputs/CustomeTimePicker";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useKYCStore } from "@/store/kycStore";
import React, { useEffect } from "react";
import { daysOptions } from "./data";
import { CustomButton } from "@/components/clickable/CustomButton";
import CreatableSelectComponent from "@/components/controlledInputs/CreatableSelect";
import CustomLocation from "@/components/controlledInputs/CustomLocation";
import Location from "@/components/controlledInputs/Location";

export interface GeometryType {
  _id?: string;
  address: string;
  lat: string;
  long: string;
}
export interface LocationType {
  _id: string;
  name?: string;
  type?: string;
  geometry?: GeometryType;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

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
  const { currentStep, kycFormData, setKYCFormData, nextStep, prevStep } =
    useKYCStore();

  const { control, handleSubmit } = useDynamicForm(fields, {});

  const initialLocationDefaults: LocationType = {
    _id: "",
    name: "",
    geometry: {
      address: "",
      lat: "",
      long: "",
    },
  };

  console.log(kycFormData, "kycFormDataadditi___");

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      workAvailability: {
        days: data.days || [],
        availableHours: data.availableHours || "",
      },
      serviceArea: { type: "Point", coordinates: [-0.1278, 51.5074] },
    };

    setKYCFormData({
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
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold mb-5">
            Service Area:{" "}
            <span className="text-sm">
              (Geographical region or distance willing to cover)
            </span>{" "}
          </h1>
          <Location defaultValues={initialLocationDefaults} />
        </div>
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

          {/* {currentStep < steps.length - 1 && (
            <CustomButton
              type="submit"
              label="Next"
              className="bg-secondary text-white w-[100px]"
            />
          )} */}
        </div>
      </form>
    </div>
  );
};

export default AdditionalInformation;
