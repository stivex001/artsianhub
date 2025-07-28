"use client";
import React, { useState } from "react";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArtisanDetails, useArtisans } from "@/api/crud/artisans";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { ReviewData, useAppointments } from "@/api/crud/appointments";

type Props = {
  onClose: () => void;
  selectedArtisan: ArtisanDetails;
};

const fields: Field[] = [
  {
    name: "customerName",
    type: "text",
  },
  {
    name: "testimonial",
    type: "text",
    errorMessage: "Message is required",
  },
];

export const ReviewModal = ({ onClose, selectedArtisan }: Props) => {
  const { currentUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useDynamicForm<ReviewData>(fields, {
    customerName: `${currentUser?.firstName} ${currentUser?.lastName}`,
    testimonial: "",
  });

  const [rating, setRating] = useState<number>(0);
  const [ratingError, setRatingError] = useState<string | null>(null);

  const { getAllArtisan, getArtisanRating } = useArtisans();
  const { leaveReview } = useAppointments();
  const { isPending, mutateAsync } = leaveReview(`${selectedArtisan}`);

  const { refetch } = getAllArtisan();
  const { refetch: ratingFetch } = getArtisanRating('');

  const onSubmit = async (data: any) => {
    if (!rating) {
      setRatingError("Rating is required");
      return;
    }

    const payload = {
      ...data,
      rating,
    };

    try {
      await mutateAsync(payload, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          refetch();
          ratingFetch();
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#D9D9D9] w-[350px] lg:w-[600px] p-8 rounded-lg relative shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 rounded-md text-gray-700"
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mb-2">
              {errors.customerName.message}
            </p>
          )}

          <textarea
            placeholder="Testimonial..."
            className="w-full p-3 mb-4 h-28 rounded-md text-gray-700 resize-none"
            {...register("testimonial")}
          />
          {errors.testimonial && (
            <p className="text-red-500 text-sm mb-2">
              {errors?.testimonial?.message}
            </p>
          )}

          <div className="flex justify-between items-center">
            <h1 className="text-blue-800 font-semibold text-lg">Rate</h1>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5]?.map((i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${
                    i <= rating ? "text-[#FFD700]" : "text-white"
                  }`}
                  onClick={() => {
                    setRating(i);
                    setRatingError(null);
                  }}
                  fill={i <= rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <CustomButton type="submit" label="Submit" isLoading={isPending} />
          </div>
          {ratingError && (
            <p className="text-red-500 text-sm mt-2">{ratingError}</p>
          )}
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};
