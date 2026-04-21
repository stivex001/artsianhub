"use client";

import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import { Descriptions } from "@/components/shared/Headings";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";
import { useCategories } from "@/apis/crud/categories";
import { useArtisans } from "@/apis/crud/artisans";
import { toast } from "sonner";
import { useCategorySelector } from "@/hooks/useCategorySelector";

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
    name: "subCategories",
    type: "multiselect",
  },
];

export const ArtisanServiceInfo = (props: Props) => {
  const { subCategoryOptions } = useCategorySelector();
  const { updateArtisanProfile, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const personalInfo = profile?.data;

  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {
      subCategories:
        personalInfo?.subCategories?.map((cat: any) => cat?._id) || [],
      professionalTitle: personalInfo?.professionalTitle,
      skillDescription: personalInfo?.skillDescription,
    },
  );

  const { mutate: updatePersonalInfo, isPending } = updateArtisanProfile;

  const handleEditProfileInfo = async (data: any) => {
    const formData = new FormData();

    const safeServiceCategory = Array.isArray(data?.subCategories)
      ? data.subCategories
      : typeof data?.subCategories === "string"
        ? data.subCategories.split(",")
        : [];

    try {
      // Append form values
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
      <Descriptions title="Service Details" desc="What do you do best?" />

      <div className="flex flex-col gap-5">
        <ControlledSelect
          name="subCategories"
          label="Service Category"
          options={subCategoryOptions}
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
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
