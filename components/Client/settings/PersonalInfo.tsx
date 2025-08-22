"use client";
import { useUser } from "@/api/crud/user";

import { CustomButton } from "@/components/clickable/CustomButton";
import { ChangeProfilepics } from "@/components/controlledInputs/ChangeProfilepics";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledPhoneInput } from "@/components/controlledInputs/ControlledPhoneInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useState } from "react";
import { toast } from "sonner";

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
  const { getCurrentUser, updateClientProfile } = useUser();
  const { data: user, refetch } = getCurrentUser();
  const personalInfo = user?.data;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {
      firstName: personalInfo?.firstName,
      lastName: personalInfo?.lastName,
      city: personalInfo?.city,
      phoneNumber: personalInfo?.phoneNumber,
    }
  );

  const { mutate: updatePersonalInfo, isPending } = updateClientProfile;

  const handleEditProfileInfo = async (data: any) => {
    const formData = new FormData();

    try {
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("city", data.city);
      formData.append("phoneNumber", data.phoneNumber);

      // Append image file or fallback to current profilePicture
      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      } else if (personalInfo?.profilePicture) {
        formData.append("profilePicture", personalInfo.profilePicture);
      }

      updatePersonalInfo(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Profile Updated Successfully");
          refetch();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Something went wrong");
          console.error("Update Profile Error:", error);
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected Error:", error);
    }
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
          profileImageUrl={personalInfo?.profilePicture}
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
          name="city"
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
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
