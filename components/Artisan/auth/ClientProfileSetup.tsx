"use client";
import React, { useState } from "react";
import ProfileSetupLayout from "./ProfieSetupLayout";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { AuthUser } from "@/components/api/type";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ChangeProfilepics } from "@/components/controlledInputs/ChangeProfilepics";
import { CustomModal } from "@/components/modals/CustomModal";
import { ConfirmIcon } from "@/components/assets/icons/ModalIcon";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { control, handleSubmit, formState } =
    useDynamicForm<AuthUser>(fields, {});

  const handleCreateProfile = (data: any) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profilePhoto", selectedFile);
    }

    console.log("Form data:", data);
    setOpenModal(true);
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
          <ChangeProfilepics
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
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
      <CustomModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        icon={<ConfirmIcon />}
      >
        <div>
          <h1 className="text-paragrah font-bold text-xl">
            You're All Set, Stephen!
          </h1>
          <p className="text-sm text-body">
            You can now explore artisans around you, request services, and
            manage your appointments — all from your dashboard.
          </p>
        </div>
        <CustomButton
          type="button"
          label="Go to Dashboard"
          className="w-full rounded-xl"
          variant="primary"
          onClick={() => router.push(`/client`)}
        />
      </CustomModal>
    </ProfileSetupLayout>
  );
};
