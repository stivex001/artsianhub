"use client";
import { useUser } from "@/api/crud/user";

import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { Descriptions } from "@/components/shared/Headings";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";
import ControlledRangeSelector from "@/components/controlledInputs/ControlledRangeSelector";
import { useArtisans } from "@/api/crud/artisans";
import { toast } from "sonner";

type Props = {};

const fields: Field[] = [
  {
    name: "primaryLocation",
    type: "text",
  },

  {
    name: "workDistanceKm",
    type: "text",
  },
  {
    name: "pricePerHour",
    type: "number",
  },
];

export const ArtisanLocationPriceInfo = (props: Props) => {
  const { updateArtisanProfile, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const personalInfo = profile?.data;

  const { control, handleSubmit } = useDynamicForm(fields, {
    primaryLocation: personalInfo?.primaryLocation,
    workDistanceKm: personalInfo?.workDistanceKm,
    pricePerHour: personalInfo?.pricePerHour,
  });

  const { mutate: updatePersonalInfo, isPending } = updateArtisanProfile;

  const handleEditProfileInfo = async (data: any) => {
    const formData = new FormData();

    try {
      // Append form values
      formData.append("primaryLocation", data.primaryLocation);
      formData.append("workDistanceKm", data.workDistanceKm);
      formData.append("pricePerHour", data.pricePerHour);

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
      <Descriptions
        title="Location & Price Details"
        desc="Where do you work and how much do you charge?"
      />

      <div className="flex flex-col gap-5">
        <ControlledInput
          name="primaryLocation"
          control={control}
          placeholder="Enter your location or region"
          type="text"
          label="Primary Location"
          variant="primary"
        />

        <ControlledRangeSelector
          name="workDistanceKm"
          label="Travel Distance"
          desc="How far are you willing to go for work?"
          control={control}
          type="range"
          minLength={0}
          maxLength={200}
        />
        <ControlledInput
          name="pricePerHour"
          control={control}
          placeholder="Enter your price"
          type="number"
          label="Starting Price"
          variant="primary"
          ShowHr
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
