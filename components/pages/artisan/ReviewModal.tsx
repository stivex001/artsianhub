"use client";
import React from "react";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArtisanDetails, ReviewData, useArtisans } from "@/api/crud/artisans";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
  selectedArtisan: ArtisanDetails;
};

const fields: Field[] = [
  {
    name: "customerName",
    type: "text",
    errorMessage: "Name is required",
  },
  {
    name: "rating",
    type: "number",
    errorMessage: "Rating is required",
  },
  {
    name: "testimonial",
    type: "text",
    errorMessage: "Message is required",
  },
];

export const ReviewModal = ({ onClose, selectedArtisan }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useDynamicForm<ReviewData>(fields, {
    customerName: "",
    testimonial: "",
    rating: 0,
  });

  const rating = watch("rating");

  console.log(errors, "errr");

  const { leaveReview } = useArtisans();
  const { isPending, mutateAsync } = leaveReview(`${selectedArtisan?.user?._id}`);

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
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
                    i <= Number(rating) ? "text-primary" : "text-white"
                  }`}
                  onClick={() => setValue("rating", i)}
                  fill={i <= Number(rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <CustomButton label="Submit" isLoading={isPending} />
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-2">{errors.rating.message}</p>
          )}
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};
