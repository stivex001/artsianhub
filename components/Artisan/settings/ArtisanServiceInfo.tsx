"use client";

import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";
import { useArtisans } from "@/apis/crud/artisans";
import { toast } from "sonner";
import { useCategorySelector } from "@/hooks/useCategorySelector";
import { Briefcase } from "lucide-react";

type Props = {};

const fields: Field[] = [
  { name: "professionalTitle", type: "text" },
  { name: "skillDescription", type: "text" },
  { name: "subCategories", type: "multiselect" },
];

export const ArtisanServiceInfo = (props: Props) => {
  const { subCategoryOptions } = useCategorySelector();
  const { updateArtisanProfile, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const personalInfo = profile?.data;

  const { control, handleSubmit } = useDynamicForm(fields, {
    subCategories:
      personalInfo?.subCategories?.map((cat: any) => cat?._id) || [],
    professionalTitle: personalInfo?.professionalTitle,
    skillDescription: personalInfo?.skillDescription,
  });

  const { mutate: updatePersonalInfo, isPending } = updateArtisanProfile;

  const handleEditProfileInfo = async (data: any) => {
    const formData = new FormData();

    const safeServiceCategory = Array.isArray(data?.subCategories)
      ? data.subCategories
      : typeof data?.subCategories === "string"
        ? data.subCategories.split(",")
        : [];

    try {
      formData.append("professionalTitle", data.professionalTitle);
      formData.append("skillDescription", data.skillDescription);
      formData.append("subCategories", JSON.stringify(safeServiceCategory));

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
      {/* ── Service info banner ──────────────────────────────────── */}
      <div className="flex items-start gap-3 px-4 py-4 rounded-xl bg-gradient-to-r from-[#02198B]/[0.04] to-[#F0C422]/[0.04] border border-[#02198B]/[0.07]">
        <div className="w-7 h-7 rounded-lg bg-[#02198B]/[0.08] flex items-center justify-center shrink-0 mt-0.5">
          <Briefcase className="w-3.5 h-3.5 text-[#02198B]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Your Trade Identity
          </p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Define your specialty and expertise so clients can find and book you
            for the right jobs.
          </p>
        </div>
      </div>

      {/* ── Categories section ───────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3.5 rounded-full bg-[#02198B]" />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Specialisation
          </p>
        </div>
        <ControlledSelect
          name="subCategories"
          label="Service Categories"
          options={subCategoryOptions}
          control={control}
          variant="primary"
          placeholder="Select all that apply"
          multi
        />
        <ControlledInput
          name="professionalTitle"
          control={control}
          placeholder="e.g. Master Electrician, Senior Plumber"
          type="text"
          label="Professional Title"
          variant="primary"
        />
      </div>

      {/* ── Bio section ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3.5 rounded-full bg-[#02198B]" />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Your Story
          </p>
        </div>
        <ControlledInput
          name="skillDescription"
          control={control}
          placeholder="Tell clients about your skills, experience, and what makes you stand out…"
          type="text"
          label="Skills & Experience"
          variant="primary"
          isTextArea
          rows={5}
        />
      </div>

      {/* ── Save footer ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          A detailed profile wins more bookings
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
