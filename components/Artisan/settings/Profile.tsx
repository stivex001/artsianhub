"use client";


import { CustomButton } from "@/components/clickable/CustomButton";
import { ChangeProfilepics } from "@/components/controlledInputs/ChangeProfilepics";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import { Descriptions } from "@/components/shared/Headings";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useEffect, useState } from "react";
import { gender } from "./data";
import { ControlledPhoneInput } from "@/components/controlledInputs/ControlledPhoneInput";
import { useArtisans } from "@/api/crud/artisans";
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
    name: "gender",
    type: "text",
  },
  // {
  //   name: "phoneNumber",
  //   type: "string",
  // },
  {
    name: "dateOfBirth",
    type: "date",
  },
];

export const ArtisanPersonalInfo = (props: Props) => {
  const { updateArtisanProfile, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const personalInfo = profile?.data;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { control, handleSubmit,reset } = useDynamicForm(fields, {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    phoneNumber: "",
  });

   useEffect(() => {
      if (personalInfo) {
        reset({
          firstName: personalInfo?.firstName || "",
          lastName: personalInfo?.lastName || "",
          gender: personalInfo?.gender || "",
          dateOfBirth: personalInfo?.dateOfBirth || "",
          city: personalInfo?.location || "",
          phoneNumber: personalInfo?.phoneNumber || "",
        });
      }
    }, [personalInfo, reset]);

  const { mutate: updatePersonalInfo, isPending } = updateArtisanProfile;

  const handleEditProfileInfo = async (data: any) => {
    const formData = new FormData();

    try {
    
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("gender", data.gender);
      // formData.append("phoneNumber", data.phoneNumber);
      formData.append("dateOfBirth", data.dateOfBirth);

     
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
      className="flex flex-col gap-8"
    >
      <Descriptions title="Personal Info" desc="Let's get to know you" />

      <div className="flex gap-5">
        <div className="h-fit">
          <ChangeProfilepics
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            profileImageUrl={personalInfo?.profilePicture}
            art
          />
        </div>
        <div className="flex flex-col gap-5">
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
          {/* <ControlledPhoneInput
            label="Phone Number"
            name="phoneNumber"
            control={control}
          /> */}
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
          />
        </div>
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
