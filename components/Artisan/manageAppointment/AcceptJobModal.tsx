import { useServices } from "@/api/crud/services";
import { ConfirmIcon, DeleteIcon } from "@/components/assets/icons/ModalIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import { CustomModal } from "@/components/modals/CustomModal";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type AcceptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: any;
  refetch?: () => void;
};

export const AcceptJobModal = ({
  isOpen,
  onClose,
  id,
  refetch,
}: AcceptModalProps) => {
  const router = useRouter();
  const { deleteService } = useServices();

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
          router.push("/artisan/dashboard/manage-appointment");
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} icon={<ConfirmIcon />}>
      <div>
        <h1 className="font-bold text-xl text-paragrah mb-1">
          Accept This Appointment?
        </h1>
        <p className="text-sm text-body">
          Confirm that you’re available for this job at the requested date,
          time, and location. The customer will be notified once you accept.
        </p>
      </div>
      <div className="w-full flex items-center gap-5 ">
        <CustomButton
          type="button"
          label="Cancel"
          onClick={onClose}
          className="flex-1 rounded-xl"
          variant="transparent"
        />
        <CustomButton
          type="button"
          //   disabled={!isValid}
          isLoading={isPending}
          label={`Accept Job`}
          className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
          variant="primary"
          onClick={onSubmit}
        />
      </div>
    </CustomModal>
  );
};
