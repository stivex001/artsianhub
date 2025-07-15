"use client";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ChangeProfilepics } from "@/components/controlledInputs/ChangeProfilepics";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useState } from "react";
import { gender } from "../settings/data";
import { NextIcon } from "@/components/assets/icons/NavIcons";
import { useArtisanProfileStore } from "@/store/artisanProfileStore";
import AutoSearchLocation from "@/components/shared/AutoSearchLocation";

type Props = {};

const fields: Field[] = [
  {
    name: "firstName",
    type: "text",
    errorMessage: "First Name is required",
    isRequired: true,
  },

  {
    name: "lastName",
    type: "text",
    errorMessage: "Last Name is required",
    isRequired: true,
  },
  {
    name: "gender",
    type: "text",
    errorMessage: "Kindly select your ender",
    isRequired: true,
  },
  {
    name: "dateOfBirth",
    type: "date",
    errorMessage: "DOB is required",
    isRequired: true,
  },
];

export const PersonalInfoStage = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    setCurrentStep,
    personalInfo,
    markStepCompleted,
    updatePersonalInfo,
  } = useArtisanProfileStore();

  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      gender: personalInfo.gender,
      dateOfBirth: personalInfo.dateOfBirth,
    }
  );

  const { isValid } = formState;

  const handleCreateProfileInfo = () => {
    const formValues = getValues();

    updatePersonalInfo({
      ...formValues,
      profilePicture: selectedFile ?? personalInfo.profilePicture ?? null,
    });
    markStepCompleted("personalInfo");
    setCurrentStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateProfileInfo)}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-5">
        <ChangeProfilepics
          setSelectedFile={setSelectedFile}
          selectedFile={
            selectedFile ?? (personalInfo.profilePicture as File | null)
          }
          art
        />

        {/* <AutoSearchLocation /> */}
        <div className="grid lg:grid-cols-2 gap-5">
          <ControlledInput
            name="firstName"
            control={control}
            placeholder="Enter first name"
            type="text"
            label="First Name"
            variant="primary"
            rules={{ required: true }}
          />
          <ControlledInput
            name="lastName"
            control={control}
            placeholder="Enter last name"
            type="text"
            label="Last Name"
            variant="primary"
            rules={{ required: true }}
          />
        </div>

        <ControlledSelect
          name="gender"
          label="Select Gender"
          options={gender}
          control={control}
          variant="primary"
          placeholder="Select gender"
        />

        <ControlledInput
          name="dateOfBirth"
          control={control}
          placeholder=""
          type="date"
          label="Date of Birth"
          variant="primary"
          rules={{ required: true }}
        />
      </div>
      <div className="w-fit self-end">
        <CustomButton
          type="submit"
          disabled={!isValid}
          className="w-full rounded-[10px]"
          variant="primary"
          icon={NextIcon}
        >
          Next
        </CustomButton>
      </div>
    </form>
  );
};
