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
import CustomLocation from "@/components/controlledInputs/CustomLocation";
import CreatableSelectComponent from "@/components/controlledInputs/CreatableSelect";
import { useUser } from "@/api/crud/user";
import { toast } from "sonner";

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
  const { currentStep, formData, setFormData, nextStep, prevStep } =
    useKYCStore();

  const { control, handleSubmit, setValue, formState } = useDynamicForm(fields, {
    availableHours: formData?.availableHours || "9:00 AM-5:00 PM",
    days: formData?.days || "",
    languagesSpoken: formData?.languagesSpoken || [],
  });

  const {errors} = formState

  console.log(errors, "formerror")

  useEffect(() => {
    if (formData) {
      setValue("availableHours", formData?.availableHours || "");
      setValue("days", formData?.days || "");
      setValue("languagesSpoken", formData?.languagesSpoken || []);
    }
  }, [formData, setValue]);

  const { createArtisanProfile } = useUser();
  const { mutate: createProfile, isPending } = createArtisanProfile;

  const onSubmit = (data: any) => {
    console.log(data, "data__");
    const formattedData = {
      ...data,
      workAvailability: {
        days: data.days || [],
        availableHours: data.availableHours || "",
      },
      serviceArea: { type: "Point", coordinates: [-0.1278, 51.5074] },
    };
  
    const formData = new FormData();
    
    formData.append("workAvailability", JSON.stringify({
      days: Array.isArray(data.days) ? data.days : data.days.split(",").map(d => d.trim()),
      availableHours: data.availableHours || "",
    }));
  
    formData.append("serviceArea", JSON.stringify({
      type: "Point",
      coordinates: [-0.1278, 51.5074], // You may need to update dynamically
    }));
  
    formData.append("serviceCategory", data?.serviceCategory);
    formData.append("professionalTitle", data?.professionalTitle);
    formData.append("servicePricing", data?.servicePricing?.toString());
    formData.append("skillDescription", data?.skillDescription);
    formData.append("yearsOfExperience", data?.yearsOfExperience?.toString());
    formData.append("professionalCertifications", data?.professionalCertifications);
    data.governmentIssuedID?.forEach((file: string) => formData.append("governmentIssuedID", file));
    data.portfolio?.forEach((file: string) => formData.append("portfolio", file));
    data.proofOfAddress?.forEach((file: string) => formData.append("proofOfAddress", file));
  
    try {
      createProfile(formData , {
        onSuccess: (response:any) => {
          console.log(response)
          toast.success(response)
        },
        onError: (error: any) => {
          console.error("Errorcreatingprofile:", error);
          toast.error(error?.message)
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  
    setFormData({
      ...formData,
      ...formattedData,
    });
    
    // console.log("Formatted Data:", formattedData);
    // nextStep();
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

          <CustomButton
            type="submit"
            label="Submit"
            className="bg-secondary text-white w-[100px]"
            isLoading={isPending}
          />
        </div>
      </form>
    </div>
  );
};

export default AdditionalInformation;
