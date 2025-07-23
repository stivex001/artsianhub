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

type DeclineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: any;
  refetch?: () => void;
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
  const { deleteService } = useServices();

  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {}
  );

  const { mutate: deleteSer, isPending } = deleteService(`${id}`);

  const onSubmit = async () => {
    if (!id) {
      toast.error("Invalid Service selected");
      return;
    }

    await deleteSer(
      { id: id },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.message);
          // refetch();
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      }
    );
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
          name="gender"
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
            //   disabled={!isValid}
            isLoading={isPending}
            label={`Decline Job`}
            className="flex-1 rounded-xl bg-error hover:bg-error/90"
            variant="primary"
          />
        </div>
      </form>
    </CustomModal>
  );
};
