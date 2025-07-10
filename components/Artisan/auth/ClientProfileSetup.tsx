"use client";
import React, { useState } from "react";
import ProfileSetupLayout from "./ProfieSetupLayout";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { AuthUser } from "@/components/api/type";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Camera } from "lucide-react";
import { CameraIcon, NoImageIcon } from "@/components/assets/icons/SvgIcons";

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
    name: "location",
    type: "text",
    errorMessage: "location is required",
  },
];

export const ClientProfileSetup = (props: Props) => {
  const { control, handleSubmit, formState, watch, setError, clearErrors } =
    useDynamicForm<AuthUser>(fields, {});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
    profilePhoto: null as File | null,
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }));
    }
  };

  const handleCreateProfile = () => {
    // Handle form submission
    console.log("Form data:", formData);
  };

  return (
    <ProfileSetupLayout
      title="Let’s Personalize Your Experience"
      desc="Add a few details to help us connect you with the right artisans near you. This only takes a minute."
    >
      <div className="lg:hidden mb-10">
        <h1 className=" font-bold text-2xl mb-2">{`Let’s Personalize Your Experience`}</h1>
        <p className="text-sm text-body">
          Add a few details to help us connect you with the right artisans near
          you. This only takes a minute.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleCreateProfile)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2 bg-[#F9F9FB] w-[148px] p-6">
            <label className="text-sm font-medium text-gray-700 self-start">
              Profile Photo
            </label>
            <div className="relative">
              <div className="w-24 h-24 rounded-full  flex items-center justify-center overflow-hidden">
                {formData.profilePhoto ? (
                  <img
                    src={URL.createObjectURL(formData.profilePhoto)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className="mt-6">
                      <NoImageIcon />
                    </div>
                  </div>
                )}
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
              >
                <CameraIcon />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          </div>
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
          <ControlledInput
            name="location"
            control={control}
            placeholder="Enter your location"
            type="text"
            label="Location / City"
            variant="primary"
            rules={{ required: true }}
          />
        </div>
        <div className="w-fit self-end">
          <CustomButton
            type="submit"
            // disabled={!isValid}
            // isLoading={isPending}
            label="Submit"
            className="w-full rounded-[10px]"
            variant="primary"
          />
        </div>
      </form>
    </ProfileSetupLayout>
  );
};
