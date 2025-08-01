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

type DeclineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: any;
  refetch: () => void;
  user: string;
};

const fields: Field[] = [
  {
    name: "reason",
    type: "text",
    errorMessage: "",
    isRequired: true,
  },
];

export const CancelModal = ({
  isOpen,
  onClose,
  id,
  refetch,
  user,
}: DeclineModalProps) => {
  const router = useRouter();
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
      status: `Cancelled (${user})`,
    };

    await updateRes(payload, {
      onSuccess: (response: any) => {
        console.log(response, "res");
        toast.success(response?.message);
        refetch();
        onClose();
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
          Cancel This Appointment?
        </h1>
        <p className="text-sm text-body">
          Are you sure you want to cancel this request? The artisan hasn’t
          responded yet.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <ControlledSelect
          name="reason"
          label="Reason for Canceling Request"
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
            label={`Cancel Request`}
            className="flex-1 rounded-xl bg-error hover:bg-error/90"
            variant="primary"
          />
        </div>
      </form>
    </CustomModal>
  );
};
