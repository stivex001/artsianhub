"use client";
import { useUser } from "@/api/crud/user";

import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import { Descriptions } from "@/components/shared/Headings";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";
import { useCategories } from "@/api/crud/categories";

type Props = {};

const fields: Field[] = [
  {
    name: "professionalTitle",
    type: "text",
  },

  {
    name: "skillDescription",
    type: "text",
  },
  {
    name: "serviceCategory",
    type: "multiselect",
  },
];

export const ArtisanServiceInfo = (props: Props) => {
  const { getCurrentUser } = useUser();
  const { data: user } = getCurrentUser();
  const personalInfo = user?.data;

  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {
      serviceCategory: personalInfo?.serviceCategory,
      professionalTitle: personalInfo?.professionalTitle,
      skillDescription: personalInfo?.skillDescription,
    }
  );

  const { getAllCategories } = useCategories();

  const { data: category } = getAllCategories();

  const categoryOptions = Array.isArray(category)
    ? category?.map((cat) => ({
        id: cat?._id,
        value: cat?._id,
        label: cat?.name,
      }))
    : [];

  const handleEditProfileInfo = () => {
    const formValues = getValues();

    // updatePersonalInfo({
    //   ...formValues,
    //   profilePicture: selectedFile ?? personalInfo?.profilePicture ?? null,
    // });
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditProfileInfo)}
      className="flex flex-col gap-8"
    >
      <Descriptions title="Service Details" desc="What do you do best?" />

      <div className="flex flex-col gap-5">
        <ControlledSelect
          name="serviceCategory"
          label="Service Category"
          options={categoryOptions}
          control={control}
          variant="primary"
          placeholder="Select Service Category"
          multi
        />
        <ControlledInput
          name="professionalTitle"
          control={control}
          placeholder="Add professional title"
          type="text"
          label="Professional title"
          variant="primary"
        />
        <ControlledInput
          name="skillDescription"
          control={control}
          placeholder="Tell us about your skill, experience, or what makes you stand out..."
          type="text"
          label="Describe Your Skills & Experience"
          variant="primary"
          isTextArea
        />
      </div>
      <div className="w-fit">
        <CustomButton
          type="submit"
          label="Save Changes"
          className="w-full rounded-[10px]"
          variant="primary"
        />
      </div>
    </form>
  );
};
