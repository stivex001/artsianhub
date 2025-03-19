import { useKYCStore } from "@/store/kycStore";
import React from "react";
import { steps } from "./KYC";
import { CustomButton } from "@/components/clickable/CustomButton";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { CustomSelect } from "@/components/controlledInputs/CustomSelect";

type Props = {};

const fields: Field[] = [
  {
    name: "email",
    type: "email",
    errorMessage: "Email is required",
    // isRequired: true,
  },
  {
    name: "password",
    type: "text",
    errorMessage: "Password is required",
    // isRequired: true,
  },
];

export const ServiceProfileSetup = (props: Props) => {
  const { currentStep, formData, nextStep, prevStep } = useKYCStore();

  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted", data);
    nextStep();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[40px] font-semibold">Service Profile Setup</h1>
        <p className="text-base font-semibold">
          Secure Job and grow your Business
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid lg:grid-cols-2 gap-8">
          <CustomSelect
            name="service"
            control={control}
            label="Select Service Category"
            variant="primary"
            // rules={{ required: true }}
            options={[
              { value: "service1", label: "Service 1" },
              { value: "service2", label: "Service 2" },
              { value: "service3", label: "Service 3" },
            ]}
          />
          <ControlledInput
            name="file"
            control={control}
            placeholder="upload file"
            type="text"
            label="Upload"
            variant="primary"
            // rules={{ required: true }}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <ControlledInput
            name="price"
            control={control}
            placeholder="Enter Professional Title"
            type="text"
            label="Price "
            variant="primary"
            // rules={{ required: true }}
          />
          {/* <ControlledInput
            name="sdhdhdbh"
            control={control}
            placeholder="Enter"
            type="text"
            label="Add a Professional Title "
            variant="primary"
            rules={{ required: true }}
          /> */}
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
