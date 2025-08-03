import React from "react";
import { CustomButton } from "@/components/clickable/CustomButton";

type Props = {
  status: string;
  onCancel?: () => void;
  onReschedule?: () => void;
  onMarkNoShow?: () => void;
  onMarkCompleted?: () => void;
};

export const JobActionButtons = ({
  status,
  onCancel,
  onReschedule,
  onMarkNoShow,
  onMarkCompleted,
}: Props) => {
  const actions: React.ReactNode[] = [];

  if (status === "Pending" || status === "Accepted") {
    actions.push(
      <CustomButton
        key="cancel"
        label="Cancel Request"
        type="button"
        className="w-fit"
        variant={status === "Accepted" ? "transparent" : "primary"}
        onClick={onCancel}
      />
    );
  }

  if (status === "Accepted") {
    actions.push(
      <CustomButton
        key="reschedule"
        label="Reschedule Request"
        type="button"
        className="w-fit"
        onClick={onReschedule}
      />
    );
  }

   if (status === "Declined" || status === "cancelled") {
    actions.push(
      <CustomButton
        key="reschedule"
        label="Book Another Artisan"
        type="button"
        className="w-fit"
        onClick={onReschedule}
      />
    );
  }

  if (status === "inprogress") {
    actions.push(
      <CustomButton
        key="no-show"
        label="Mark as No Show"
        type="button"
        className="w-fit"
        variant="transparent"
        onClick={onMarkNoShow}
      />,
      <CustomButton
        key="complete"
        label="Mark as Completed"
        type="button"
        className="w-fit"
        variant="primary"
        onClick={onMarkCompleted}
      />
    );
    
  }

   if (status === "completed") {
    actions.push(
      <CustomButton
        key="rebook"
        label="Rebook Artisan"
        type="button"
        className="w-fit"
        variant="transparent"
        onClick={onReschedule}
      />,
      <CustomButton
        key="review"
        label="Leave a Review"
        type="button"
        className="w-fit"
        variant="primary"
        onClick={onMarkCompleted}
      />
    );
    
  }

  return (
    <div className="flex items-center justify-end gap-5">
      {actions}
    </div>
  );
};
