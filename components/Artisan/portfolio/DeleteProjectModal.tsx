import { useServices } from "@/apis/crud/services";
import { DeleteIcon } from "@/components/assets/icons/ModalIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import { CustomModal } from "@/components/modals/CustomModal";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: any;
  refetch: () => void;
};

export const DeleteProjectModal = ({
  isOpen,
  onClose,
  id,
  refetch,
}: DeleteModalProps) => {
  const router = useRouter()
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
          refetch();
          onClose();
          router.push("/artisan/dashboard/portfolio");
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
          Delete This Project?
        </h1>
        <p className="text-sm text-body">
          Are you sure you want to delete this project? Once deleted, it cannot
          be recovered.
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
          label={`Delete Project`}
          className="flex-1 rounded-xl bg-error hover:bg-error/90"
          variant="primary"
          onClick={onSubmit}
        />
      </div>
    </CustomModal>
  );
};
