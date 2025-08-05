import { useAppointments } from "@/api/crud/appointments";
import { ConfirmIcon } from "@/components/assets/icons/ModalIcon";
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
  status: string;
};

export const AcceptJobModal = ({
  isOpen,
  onClose,
  id,
  refetch,
  status = "Accepted",
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
      status,
    };

    try {
      await updateRes(payload, {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.message);
          refetch();
          onClose();
          // router.push("/artisan/dashboard/manage-appointment");
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
          {status === "Accepted"
            ? "Accept This Appointment?"
            : status === "Completed"
            ? "Job Completed?"
            : "Are You Ready to Start This Job?"}
        </h1>
        <p className="text-sm text-body">
          {status === "Pending" &&
            "Confirm that you’re available for this job at the requested date, time, and location. The customer will be notified once you accept."}
          {status === "Completed" && "Confirm that you have completed this job"}
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
          label={`${status === "Completed" ? "Complete Job" : "Accept Job"} `}
          className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
          variant="primary"
          onClick={handleBookingResponse}
        />
      </div>
    </CustomModal>
  );
};
