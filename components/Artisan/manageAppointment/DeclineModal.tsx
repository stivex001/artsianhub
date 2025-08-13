import { useServices } from "@/api/crud/services";
import { DeleteIcon } from "@/components/assets/icons/ModalIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import { CustomModal } from "@/components/modals/CustomModal";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { reason } from "../settings/data";
import { useAppointments } from "@/api/crud/appointments";
import { useNotification } from "@/api/crud/notification";

type DeclineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: any;
  refetch: () => void;
};

const fields: Field[] = [
  {
    name: "reason",
    type: "text",
    errorMessage: "",
    isRequired: true,
  },
];

export const DeclineModal = ({
  isOpen,
  onClose,
  id,
  refetch,
}: DeclineModalProps) => {
  const router = useRouter();
  const { updateBookingResponse } = useAppointments();
  const { getAllNotifications } = useNotification();
  const { refetch: notifyRefecth } = getAllNotifications();

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
      status: "Declined",
    };

    await updateRes(payload, {
      onSuccess: (response: any) => {
        console.log(response, "res");
        toast.success(response?.message);
        refetch();
        notifyRefecth();
        onClose();
        router.push("/artisan/dashboard/manage-appointment");
      },
      onError: (error: any) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} icon={<DeleteIcon />}>
      <div>
        <h1 className="font-bold text-xl text-paragrah mb-1">
          Are you sure you want to decline this request?
        </h1>
        <p className="text-sm text-body">
          Declining this appointment will notify the customer, and you won’t be
          able to take this job later. If you're unavailable, please select a
          reason.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <ControlledSelect
          name="reason"
          label="Reason for Declining"
          options={reason}
          control={control}
          variant="primary"
          placeholder="Select a reason"
        />
        <div className="w-full flex items-center gap-5 ">
          <CustomButton
            type="button"
            label="Cancel"
            onClick={onClose}
            className="flex-1 rounded-xl"
            variant="transparent"
          />
          <CustomButton
            type="submit"
            disabled={!isValid}
            isLoading={updatePending}
            label={`Decline Job`}
            className="flex-1 rounded-xl bg-error hover:bg-error/90"
            variant="primary"
          />
        </div>
      </form>
    </CustomModal>
  );
};
