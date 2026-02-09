"use client";
import { useUser } from "@/api/crud/user";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ChangeProfilepics } from "@/components/controlledInputs/ChangeProfilepics";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledPhoneInput } from "@/components/controlledInputs/ControlledPhoneInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FormSkeletonLoader } from "@/components/loader/FormSkeletonLoader";

type Props = {};

const fields: Field[] = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "city", type: "text" },
  { name: "phoneNumber", type: "text" },
];

export const PersonalInfo = (props: Props) => {
  const { getCurrentUser, updateClientProfile } = useUser();
  const { data: user, refetch, isLoading } = getCurrentUser();
  const personalInfo = user?.data;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { control, handleSubmit, reset } = useDynamicForm(fields, {
    firstName: "",
    lastName: "",
    city: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (personalInfo) {
      reset({
        firstName: personalInfo.firstName || "",
        lastName: personalInfo.lastName || "",
        city: personalInfo.city || "",
        phoneNumber: personalInfo.phoneNumber || "",
      });
    }
  }, [personalInfo, reset]);

  const { mutate: updatePersonalInfo, isPending } = updateClientProfile;

  const handleEditProfileInfo = async (data: any) => {
    const formData = new FormData();

    try {
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("city", data.city);
      formData.append("phoneNumber", data.phoneNumber);

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

  if (isLoading) {
    return <FormSkeletonLoader />;
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditProfileInfo)}
      className="flex flex-col gap-6"
    >
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center sm:items-start gap-4 pb-6 border-b border-gray-100">
        <ChangeProfilepics
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          profileImageUrl={personalInfo?.profilePicture}
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Section: Basic Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-sm font-semibold text-paragrah uppercase tracking-wide">
              Basic Information
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
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
        </div>

        {/* Section: Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-secondary to-accent rounded-full" />
            <h3 className="text-sm font-semibold text-paragrah uppercase tracking-wide">
              Contact Information
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-start pt-4 border-t border-gray-100">
        <CustomButton
          type="submit"
          label="Save Changes"
          className="px-8 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          variant="primary"
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
