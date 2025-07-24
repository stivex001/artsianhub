"use client";

import React from "react";
import { BaseModal } from "../shared/BaseModal";
import { X } from "lucide-react";
import { Field } from "@/schemas/dynamicSchema";
import ControlledInput from "../controlledInputs/ControlledInput";
import { CustomButton } from "../clickable/CustomButton";
import useDynamicForm from "@/hooks/useDynamicForm";
import { GetSingleArtisan } from "@/api/crud/artisans";
import { useFileUpload } from "@/hooks/useFileUpload";
import { FileUpload } from "../controlledInputs/FileUploads";
import { Label } from "../ui/label";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  item: GetSingleArtisan;
};

const fields: Field[] = [
  {
    name: "email",
    type: "email",
    errorMessage: "Email is required",
    isRequired: true,
  },

  {
    name: "password",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
  {
    name: "confirmPassword",
    type: "text",
    errorMessage: "Password is required",
  },
];

export const ContactArtisanModal = ({ item, isOpen, onClose }: Props) => {
  const { files, setFiles } = useFileUpload(4);
  const { control, handleSubmit, formState, watch, setError, clearErrors } =
    useDynamicForm(fields, {});

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="p-8 bg-white !rounded-2xl overflow-y-auto no-scrollbar !max-h-[90vh] border-none shadow-none !max-w-[600px]"
    >
      <section
        className=" w-full  flex flex-col gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex justify-between mb-1">
            <h3 className="text-base font-bold text-paragrah ">{`Contact Claire (${item?.professionalTitle}) `}</h3>
            <button onClick={onClose} className="">
              <X />
            </button>
          </div>
          <p className="text-sm text-body">
            Send a request to this artisan describing the service you need.
            They'll get back to you shortly to confirm availability.
          </p>
        </div>

        <form>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 w-full">
              <ControlledInput
                name="location"
                control={control}
                placeholder="Enter the job location"
                type="text"
                label="Your Location"
                variant="primary"
                rules={{ required: true }}
              />
              <ControlledInput
                name="location"
                control={control}
                placeholder="Give a short description of the issue or task you’d like help with"
                type="text"
                label="Describe the Work"
                variant="primary"
                rules={{ required: true }}
                isTextArea
              />
              <div className="grid grid-cols lg:grid-cols-2 gap-5">
                <ControlledInput
                  name="date"
                  control={control}
                  placeholder="Select a convenient date"
                  type="date"
                  label="Preferred Date and Time"
                  variant="primary"
                  rules={{ required: true }}
                />
                <ControlledInput
                  name="date"
                  control={control}
                  placeholder="Select a convenient date"
                  type="time"
                  label="Preferred Date and Time"
                  variant="primary"
                  rules={{ required: true }}
                />
              </div>
              <ControlledInput
                name="email"
                control={control}
                placeholder="Enter email for the artisan to reach you"
                type="email"
                label="Your Contact Info"
                variant="primary"
                rules={{ required: true }}
              />
              <div className="sapce-1">
                <Label
                  className={`text-sm font-medium text-paragrah capitalize`}
                >
                  Attachment Photos{" "}
                  <span className="font-medium text-[#667185]">(Optional)</span>
                </Label>

                <FileUpload
                  files={files}
                  onFilesChange={setFiles}
                  maxFiles={4}
                />
              </div>
            </div>
            <div className="flex items-center gap-5 justify-end">
              <CustomButton
                type="button"
                label="Cancel"
                onClick={onClose}
                className="w-fit rounded-xl"
                variant="transparent"
              />
              <CustomButton
                type="submit"
                //   disabled={!isValid}
                //   isLoading={isPending}
                label="Send Request"
                className="w-fit rounded-xl"
                variant="primary"
              />
            </div>
          </div>
        </form>
      </section>
    </BaseModal>
  );
};
