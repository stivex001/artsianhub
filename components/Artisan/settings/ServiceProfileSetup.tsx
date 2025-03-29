import { useKYCStore } from "@/store/kycStore";
import React, { useEffect } from "react";
import { steps } from "./KYC";
import { CustomButton } from "@/components/clickable/CustomButton";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import { useCategories } from "@/api/crud/categories";
import {
  ControlledFileUpload,
  FileWithPreview,
} from "@/components/controlledInputs/ControlledFileUpload";

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
  {
    name: "portfolio",
    type: "file",
    errorMessage: "Portfolio is required",
    isRequired: true,
  },
];

export const ServiceProfileSetup = (props: Props) => {
  const { getAllCategories } = useCategories();
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

  const { data: category } = getAllCategories();

  const categoryOptions = Array.isArray(category)
    ? category?.map((cat) => ({
        id: cat._id,
        value: cat._id,
        label: cat.name,
      }))
    : [];

  useEffect(() => {
    if (categoryOptions.length > 0) {
      setValue("serviceCategory", categoryOptions[0].value);
    }
  }, [categoryOptions, setValue]);

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
        <h1 className="text-[40px] font-semibold">Service Profile Setup</h1>
        <p className="text-base font-semibold">
          Secure Job and grow your Business
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid lg:grid-cols-2 gap-8">
          <ControlledSelect
            name="serviceCategory"
            control={control}
            label="Select Service Category"
            variant="tertiary"
            className="h-14 "
            rules={{ required: true }}
            options={categoryOptions}
          />
          <ControlledFileUpload
            name="portfolio"
            control={control}
            label="Upload a Portfolio or Work Samples"
            // rules={{ required: true }}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <ControlledInput
            name="professionalTitle"
            control={control}
            placeholder="Enter Professional Title"
            type="text"
            label="Add a Professional Title "
            variant="secondary"
            rules={{ required: true }}
          />
          <div className="flex items-center gap-10">
            <ControlledInput
              name="servicePricing"
              control={control}
              placeholder="100"
              type="number"
              label="Set Service Pricing  "
              variant="secondary"
              rules={{ required: true }}
            />
            <ControlledInput
              name="yearsOfExperience"
              control={control}
              placeholder="10"
              type="number"
              label="Service Year "
              variant="secondary"
              rules={{ required: true }}
            />
          </div>
          <ControlledInput
            name="skillDescription"
            control={control}
            type="text"
            label="Describe their Skills & Experience. "
            variant="secondary"
            rules={{ required: true }}
            isTextArea
            rows={7}
          />
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
