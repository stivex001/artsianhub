import React from "react";
import { RatingOverview } from "./RatingOverview";
import { ReviewDetails } from "./ReviewDetails";
import { useAppointments } from "@/api/crud/appointments";

type Props = {
  artisanId?: string;
};

export const ArtisanRating = ({ artisanId }: Props) => {
  const { getArtisanReview } = useAppointments();
  const { data, isPending } = getArtisanReview(`${artisanId}`);

  const reviewData = data?.data
  console.log(reviewData, "review")
  return (
    <div className="flex flex-col gap-6">
      <RatingOverview />

      <ReviewDetails reviewData={reviewData} />
    </div>
  );
};
