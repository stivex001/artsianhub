"use client";

import { CustomButton } from "@/components/clickable/CustomButton";
import { ChangeProfilepics } from "@/components/controlledInputs/ChangeProfilepics";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useEffect, useState } from "react";
import { gender } from "./data";
import { useArtisans } from "@/apis/crud/artisans";
import { toast } from "sonner";
import { User } from "lucide-react";

type Props = {};

const fields: Field[] = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "gender", type: "text" },
  { name: "dateOfBirth", type: "date" },
];

export const ArtisanPersonalInfo = (props: Props) => {
  const { updateArtisanProfile, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const personalInfo = profile?.data;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { control, handleSubmit, reset } = useDynamicForm(fields, {
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
        city: personalInfo?.city || "",
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
      {/* ── Photo banner ─────────────────────────────────────────── */}
      <div className="flex items-start gap-5 p-5 rounded-2xl bg-gray-50/70 border border-gray-100">
        <div className="shrink-0">
          <ChangeProfilepics
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            profileImageUrl={personalInfo?.profilePicture}
            art
          />
        </div>
        <div className="flex-1 pt-2 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#02198B]/[0.07] flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-[#02198B]" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Professional Photo
            </h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            Your photo appears on your public profile and helps clients
            recognise you at a glance.
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F0C422]" />
            <p className="text-xs text-gray-400">
              JPG or PNG · Max 3 MB · Min 250×250 px
            </p>
          </div>
        </div>
      </div>

      {/* ── Personal details ─────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3.5 rounded-full bg-[#02198B]" />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Personal Details
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
          <ControlledSelect
            name="gender"
            label="Gender"
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

      {/* ── Save footer ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Updates reflect on your public profile
        </p>
        <CustomButton
          type="submit"
          label="Save Changes"
          className="rounded-xl"
          variant="primary"
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
