"use client";
import React, { useState } from "react";
import { useArtisanProfileStore } from "@/store/artisanProfileStore";
import { CustomButton } from "@/components/clickable/CustomButton";
import { BackIcon } from "@/components/assets/icons/NavIcons";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import ControlledRangeSelector from "@/components/controlledInputs/ControlledRangeSelector";
import { useUser } from "@/api/crud/user";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { CustomModal } from "@/components/modals/CustomModal";
import { ConfirmIcon } from "@/components/assets/icons/ModalIcon";
import { useRouter } from "next/navigation";

type Props = {};

const fields: Field[] = [
  {
    name: "primaryLocation",
    type: "text",
    errorMessage: "Location is required",
    isRequired: true,
  },

  {
    name: "workDistanceKm",
    type: "text",
    errorMessage: "Work Distance is required",
    isRequired: true,
  },
  {
    name: "pricePerHour",
    type: "number",
    errorMessage: "Price per hour is required",
    isRequired: true,
  },
];

export const LocationPriceStage = (props: Props) => {
  const router = useRouter();
  const {
    setCurrentStep,
    personalInfo,
    serviceDetails,
    resetProfile,
    markStepCompleted,
  } = useArtisanProfileStore();
  const [firstName, setFirstName] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {}
  );
  console.log(serviceDetails, "serviceDetails");
  

  const { isValid } = formState;

  const { createArtisanProfile } = useUser();
  const { mutate: createProfile, isPending } = createArtisanProfile;

  const { setCurrentUser } = useAuthStore();

  const handleSubmitProfile = async (data: any) => {
    const formData = new FormData();
    try {
      if (personalInfo?.profilePicture) {
        formData.append("profilePicture", personalInfo.profilePicture);
      }

      formData.append("firstName", personalInfo?.firstName);
      formData.append("lastName", personalInfo?.lastName);
      formData.append("gender", personalInfo?.gender);
      formData.append("dateOfBirth", personalInfo?.dateOfBirth);
      formData.append("professionalTitle", serviceDetails?.professionalTitle);
      formData.append("skillDescription", serviceDetails?.skillDescription);
      formData.append("serviceCategory", JSON.stringify(serviceDetails?.serviceCategory));
      formData.append("primaryLocation", data?.primaryLocation);
      formData.append("workDistanceKm", data?.workDistanceKm);
      formData.append("pricePerHour", data?.pricePerHour);

      createProfile(formData, {
        onSuccess: (response: any) => {
          const user = response?.data;
          if (user) {
            setCurrentUser(user);
          }
          setFirstName(personalInfo?.firstName);
          markStepCompleted("locationPriceDetails");
          setCurrentStep(3);
          setOpenModal(true);
          resetProfile();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Something went wrong");
          console.error("Create Profile Error:", error);
        },
      });
    } catch (error) {}
  };

  const handleGoBack = () => {
    setCurrentStep(2);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-paragrah">
          Location & Price Details
        </h1>
        <p className="text-sm text-body">
          Where do you work and how much do you charge?
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitProfile)}
        className="flex flex-col gap-5"
      >
        <ControlledInput
          name="primaryLocation"
          control={control}
          placeholder="Enter your location or region"
          type="text"
          label="Primary Location"
          variant="primary"
          rules={{ required: true }}
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
          rules={{ required: true }}
          ShowHr
        />
        <div className="flex items-center justify-end gap-5">
          <CustomButton
            type="button"
            className="w-fit rounded-[10px]"
            variant="transparent"
            icon={BackIcon}
            label="Back"
            onClick={handleGoBack}
          />

          <CustomButton
            type="submit"
            disabled={!isValid}
            isLoading={isPending}
            className="w-fit rounded-[10px]"
            variant="primary"
            label="Submit Profile"
          />
        </div>
      </form>
      <CustomModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        icon={<ConfirmIcon />}
      >
        <div>
          <h1 className="text-paragrah font-bold text-xl">
            Welcome to MensayHub, {firstName}!
          </h1>
          <p className="text-sm text-body">
            Your profile is now live. Start receiving job requests, managing
            your services, and building your portfolio from your dashboard.
          </p>
        </div>
        <CustomButton
          type="button"
          label="Proceed"
          className="w-full rounded-xl"
          variant="primary"
          onClick={() => router.push(`/artisan/dashboard`)}
        />
      </CustomModal>
    </div>
  );
};
