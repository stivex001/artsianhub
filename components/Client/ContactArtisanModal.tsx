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
import { toast } from "sonner";
import { useAppointments } from "@/api/crud/appointments";
import { useRouter } from "next/navigation";
import { useNotification } from "@/api/crud/notification";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  item: GetSingleArtisan | any;
  mode?: string;
};

const fields: Field[] = [
  {
    name: "location",
    type: "text",
    errorMessage: "location is required",
    isRequired: true,
  },

  {
    name: "description",
    type: "text",
    errorMessage: "description is required",
    isRequired: true,
  },
  {
    name: "preferredDate",
    type: "date",
    errorMessage: "preferredDate is required",
  },
  {
    name: "preferredTime",
    type: "time",
    errorMessage: "preferredTime is required",
  },
  {
    name: "email",
    type: "email",
    errorMessage: "email is required",
  },
];

export const ContactArtisanModal = ({ item, isOpen, onClose, mode }: Props) => {
  const router = useRouter();
  const { files, setFiles } = useFileUpload(4);
  const { control, handleSubmit, formState, reset, setError, clearErrors } =
    useDynamicForm(fields, {});

  const { bookAppointment, getAllBookings } = useAppointments();
  const { getAllNotifications } = useNotification();
  const { refetch: notifyRefecth } = getAllNotifications();

  const { mutate: booking, isPending } = bookAppointment();
  const { refetch } = getAllBookings();

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("location", data?.location);
    formData.append("description", data?.description);
    formData.append("preferredDate", data?.preferredDate);
    formData.append("preferredTime", data?.preferredTime);
    formData.append(
      "artisanId",
      mode === "rebook" ? item?.artisanId?._id : item?.data?._id
    );
    formData.append("email", data?.email);

    files?.forEach((file: File) => {
      formData.append("images", file);
    });

    try {
      await booking(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Appointment Booked successfully");
          refetch();
          notifyRefecth();
          onClose();
          reset();
          setFiles([]);
          router.push(`/manage-jobs`);
        },
        onError: (error: any) => {
          console.error("Errorcreatingprofile:", error);
          toast.error(error?.message);
        },
      });
    } catch (error) {}
  };

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
            {mode === "rebook" ? (
              <h3 className="text-base font-bold text-paragrah ">{`Rebook ${item?.artisanId?.firstName} (${item?.artisanId?.professionalTitle}) `}</h3>
            ) : (
              <h3 className="text-base font-bold text-paragrah ">{`Contact ${item?.data?.firstName} (${item?.data?.professionalTitle}) `}</h3>
            )}

            <button onClick={onClose} className="">
              <X />
            </button>
          </div>
          <p className="text-sm text-body">
            Send a request to this artisan describing the service you need.
            They'll get back to you shortly to confirm availability.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                name="description"
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
                  name="preferredDate"
                  control={control}
                  placeholder="Select a convenient date"
                  type="date"
                  label="Preferred Date"
                  variant="primary"
                  rules={{ required: true }}
                />
                <ControlledInput
                  name="preferredTime"
                  control={control}
                  placeholder="Select a convenient date"
                  type="time"
                  label="Preferred Time"
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
                  // mode="small"
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
                isLoading={isPending}
                label={
                  mode === "rebook" ? "Continue to Confirm" : "Send Request"
                }
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
