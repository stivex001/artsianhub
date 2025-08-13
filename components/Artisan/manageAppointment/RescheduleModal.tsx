"use client";

import { useAppointments } from "@/api/crud/appointments";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { BaseModal } from "@/components/shared/BaseModal";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: any;
  refetch: () => void;
  notifyRefecth: () => void;
};

const fields: Field[] = [
  {
    name: "reason",
    type: "text",
    errorMessage: "",
    isRequired: true,
  },

  {
    name: "newDate",
    type: "date",
    errorMessage: "newDate is required",
  },
  {
    name: "newTime",
    type: "time",
    errorMessage: "newTime is required",
  },
];

export const RescheduleModal = ({
  isOpen,
  onClose,
  id,
  refetch,
  notifyRefecth,
}: ScheduleModalProps) => {
  const { updateBookingResponse } = useAppointments();

  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {}
  );

  const { isValid } = formState;

  const { isPending: updatePending, mutate: updateRes } = updateBookingResponse(
    `${id}`
  );

  const onSubmit = async (data: any) => {
    if (!id) {
      toast.error("Invalid Service selected");
      return;
    }

    const payload = {
      ...data,
      status: `Rescheduled`,
      reschedule: {
        newDate: data.newDate,
        newTime: data.newTime,
      },
    };

    await updateRes(payload, {
      onSuccess: (response: any) => {
        console.log(response, "res");
        toast.success(response?.message);
        refetch();
        notifyRefecth();
        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.message);
      },
    });
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
            <h3 className="text-base font-bold text-paragrah ">
              Reschedule Request
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-[#F9F9FB] rounded-[32px] transition-colors"
            >
              <X />
            </button>
          </div>
          <p className="text-sm text-body">
            Select a new date and time for this service. The artisan will be
            notified and must approve the change.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 w-full">
              <ControlledInput
                name="newDate"
                control={control}
                placeholder="Select new date"
                type="date"
                label="New Date"
                variant="primary"
                rules={{ required: true }}
              />
              <ControlledInput
                name="newTime"
                control={control}
                placeholder="Select new time"
                type="time"
                label="New Time"
                variant="primary"
                rules={{ required: true }}
              />
              <ControlledInput
                name="reason"
                control={control}
                placeholder="Write a short reason for reschedule"
                type="text"
                label="Reason for Reschedule"
                variant="primary"
                rules={{ required: true }}
                isTextArea
              />
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
                disabled={!isValid}
                isLoading={updatePending}
                label="Submit New Time"
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
