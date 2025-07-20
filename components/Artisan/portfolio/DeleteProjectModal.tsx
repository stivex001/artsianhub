import { DeleteIcon } from "@/components/assets/icons/ModalIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import { CustomModal } from "@/components/modals/CustomModal";
import React from "react";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: any;
};

export const DeleteProjectModal = ({ isOpen, onClose }: DeleteModalProps) => {
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
          type="submit"
          //   disabled={!isValid}
          //   isLoading={isPending}
          label={`Delete Project`}
          className="flex-1 rounded-xl bg-error hover:bg-error/90"
          variant="primary"
        />
      </div>
    </CustomModal>
  );
};
