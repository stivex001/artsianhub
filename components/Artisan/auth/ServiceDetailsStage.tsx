"use client";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";
import { BackIcon, NextIcon } from "@/components/assets/icons/NavIcons";
import { useArtisanProfileStore } from "@/store/artisanProfileStore";
import { useCategories } from "@/api/crud/categories";
import { gender } from "../settings/data";

type Props = {};

const fields: Field[] = [
  {
    name: "professionalTitle",
    type: "text",
    errorMessage: "Professional Title is required",
    isRequired: true,
  },

  {
    name: "skillDescription",
    type: "text",
    errorMessage: "skillDescription is required",
    isRequired: true,
  },
  {
    name: "serviceCategory",
    type: "text",
    errorMessage: "Kindly select Category",
    isRequired: false,
  },
];

export const ServiceDetailsStage = (props: Props) => {
  const { getAllCategories } = useCategories();

  const {
    setCurrentStep,
    serviceDetails,
    markStepCompleted,
    updateServiceDetails,
  } = useArtisanProfileStore();

  const { data: category } = getAllCategories();

  const categoryOptions = Array.isArray(category)
    ? category.map((cat) => ({
        id: cat._id,
        value: cat._id,
        label: cat.name,
      }))
    : [];

  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {
      serviceCategory: serviceDetails.serviceCategory,
      professionalTitle: serviceDetails.professionalTitle,
      skillDescription: serviceDetails.skillDescription,
    }
  );

  const { isValid, errors } = formState;

  const handleCreateServiceDetails = () => {
    const formValues = getValues();

    updateServiceDetails({
      ...formValues,
    });
    markStepCompleted("serviceDetails");
    setCurrentStep(3);
  };

  const handleGoBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-paragrah">Service Details</h1>
        <p className="text-sm text-body">What do you do best?</p>
      </div>
      <form
        onSubmit={handleSubmit(handleCreateServiceDetails)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <ControlledSelect
            name="serviceCategory"
            label="Service Category"
            options={gender}
            control={control}
            variant="primary"
            placeholder="Select Service Category"
            rules={{ required: false }}
          />
          <ControlledInput
            name="professionalTitle"
            control={control}
            placeholder="Add professional title"
            type="text"
            label="Professional title"
            variant="primary"
            rules={{ required: true }}
          />
          <ControlledInput
            name="skillDescription"
            control={control}
            placeholder="Tell us about your skill, experience, or what makes you stand out..."
            type="text"
            label="Describe Your Skills & Experience"
            variant="primary"
            rules={{ required: true }}
            isTextArea
          />
        </div>
        <div className="flex items-center justify-end gap-5">
          <CustomButton
            type="button"
            className="w-fit rounded-[10px]"
            variant="transparent"
            icon={BackIcon}
            label="Back"
            onClick={handleGoBack}
          />

          <CustomButton
            type="submit"
            disabled={!isValid}
            className="w-fit rounded-[10px]"
            variant="primary"
            icon={NextIcon}
          >
            Next
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
