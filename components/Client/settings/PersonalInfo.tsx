"use client";
import { useUser } from "@/api/crud/user";

import { CustomButton } from "@/components/clickable/CustomButton";
import { ChangeProfilepics } from "@/components/controlledInputs/ChangeProfilepics";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledPhoneInput } from "@/components/controlledInputs/ControlledPhoneInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useState } from "react";

type Props = {};

const fields: Field[] = [
  {
    name: "firstName",
    type: "text",
  },

  {
    name: "lastName",
    type: "text",
  },

  {
    name: "city",
    type: "text",
  },
  {
    name: "phoneNumber",
    type: "text",
  },
];

export const PersonalInfo = (props: Props) => {
  const { getCurrentUser } = useUser();
  const { data: user } = getCurrentUser();
  const personalInfo = user?.data;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {
      firstName: personalInfo?.firstName,
      lastName: personalInfo?.lastName,
      city: personalInfo?.location,
      phoneNumber: personalInfo?.phoneNumber,
    }
  );

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
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-5">
        <ChangeProfilepics
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />

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
        <ControlledPhoneInput
          label="Phone Number"
          name="phoneNumber"
          control={control}
        />
        <ControlledInput
          name="primaryLocation"
          control={control}
          placeholder="Enter your location or region"
          type="text"
          label="Primary Location"
          variant="primary"
          rules={{ required: true }}
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
