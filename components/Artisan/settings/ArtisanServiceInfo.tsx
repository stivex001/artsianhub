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
import { useArtisans } from "@/api/crud/artisans";
import { toast } from "sonner";

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
    name: "serviceCategories",
    type: "multiselect",
  },
];

export const ArtisanServiceInfo = (props: Props) => {
  const { updateArtisanProfile, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const personalInfo = profile?.data;

  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {
      serviceCategories: personalInfo?.serviceCategories,
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

  const { mutate: updatePersonalInfo, isPending } = updateArtisanProfile(
    `${personalInfo?.userId?._id}`
  );

  const handleEditProfileInfo = async (data: any) => {
    const formData = new FormData();

     const safeServicategory = Array.isArray(data?.serviceType)
      ? data.serviceCategories
      : typeof data?.serviceCategories === "string"
      ? data.serviceCategories.split(",")
      : [];

    try {
      // Append form values
      formData.append("professionalTitle", data.professionalTitle);
      formData.append("skillDescription", data.skillDescription);

    formData.append("serviceCategories", JSON.stringify(safeServicategory))

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
          name="serviceCategories"
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
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
