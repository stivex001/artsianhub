import { useAppointments } from "@/api/crud/appointments";
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
  refetch: () => void;
};

export const AcceptJobModal = ({
  isOpen,
  onClose,
  id,
  refetch,
}: AcceptModalProps) => {
  const router = useRouter();
  const { updateBookingResponse } = useAppointments();

  const { isPending: updatePending, mutate: updateRes } =
    updateBookingResponse<{ status: string }>(`${id}`);

  const handleBookingResponse = async () => {
    if (!id) {
      toast.error("Invalid Service selected");
      return;
    }

    const payload = {
      status: "Accepted",
    };

    try {
      await updateRes(payload, {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.message);
          refetch();
          onClose();
          router.push("/artisan/dashboard/manage-appointment");
        },
        onError: (error: any) => {
          toast.error(error?.message || "Something went wrong");
        },
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to accept appointment");
    }
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
          isLoading={updatePending}
          label={`Accept Job`}
          className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
          variant="primary"
          onClick={handleBookingResponse}
        />
      </div>
    </CustomModal>
  );
};
