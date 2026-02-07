"use client";

import { useAppointments } from "@/api/crud/appointments";
import { ReviewIcon } from "@/components/assets/icons/ModalIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { CustomModal } from "@/components/modals/CustomModal";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { Star, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: any;
  name: string;
  artisanId: any;
  notifyRefecth: () => void;
};

const fields: Field[] = [
  {
    name: "comment",
    type: "text",
    errorMessage: "",
    isRequired: true,
  },
];

export const ReviewModal = ({
  isOpen,
  onClose,
  id,
  name,
  artisanId,
  notifyRefecth,
}: ReviewModalProps) => {
  const { leaveReview, getArtisanReview } = useAppointments();
  const [rating, setRating] = useState<number>(0);
  const [ratingError, setRatingError] = useState<string | null>(null);

  const { control, handleSubmit, formState, getValues } = useDynamicForm(
    fields,
    {},
  );

  const { isValid } = formState;
  const { refetch } = getArtisanReview(`${artisanId}`);

  const { isPending: updatePending, mutate: createReview } = leaveReview;

  const onSubmit = async (data: any) => {
    if (!rating) {
      setRatingError("Rating is required");
      return;
    }
    const payload = {
      ...data,
      appointmentId: id,
      rating,
    };

    await createReview(payload, {
      onSuccess: (response: any) => {
        console.log(response, "res");
        toast.success(response?.message);
        refetch();
        notifyRefecth();
        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.data?.error);
      },
    });
  };
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} icon={<ReviewIcon />}>
      <div>
        <h1 className="font-bold text-xl text-paragrah mb-1">Leave a Review</h1>
        <p className="text-sm text-body">
          How was your experience with {name}? Your feedback helps improve our
          service.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 w-full">
            <ControlledInput
              name="comment"
              control={control}
              placeholder="Leave a review..."
              type="text"
              label="Review"
              variant="primary"
              rules={{ required: true }}
              isTextArea
            />
            <div className="space-y-1">
              <h1 className="text-left text-sm font-medium text-paragrah capitalize">
                Rate
              </h1>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5]?.map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 cursor-pointer ${
                      i <= rating ? "text-[#FFD700]" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setRating(i);
                      setRatingError(null);
                    }}
                    fill={i <= rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              {ratingError && (
                <p className="text-red-500 text-sm mt-2">{ratingError}</p>
              )}
            </div>
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
              label="Submit Review"
              className="w-fit rounded-xl"
              variant="primary"
            />
          </div>
        </div>
      </form>
    </CustomModal>
  );
};
