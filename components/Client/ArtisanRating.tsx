"use client";
import React from "react";
import { RatingOverview } from "./RatingOverview";
import { ReviewDetails } from "./ReviewDetails";
import { useAppointments } from "@/api/crud/appointments";
import { RatingOverviewSkeleton } from "./reviews/RatingOverviewSkeleton";
import { ReviewDetailsSkeleton } from "./reviews/ReviewDetailsSkeleton";

type Props = {
  artisanId?: string;
};

export const ArtisanRating = ({ artisanId }: Props) => {
  const { getArtisanReview } = useAppointments();
  const { data, isPending } = getArtisanReview(`${artisanId}`);

  const reviewData = data?.data?.reviews;
  const ratings = data?.data?.ratings;
  const totalReview = data?.data?.totalReviews;

  return (
    <div className="flex flex-col gap-6">
      {isPending ? (
        <RatingOverviewSkeleton />
      ) : (
        <RatingOverview ratings={ratings} totalReview={totalReview} />
      )}

      {isPending ? (
        <ReviewDetailsSkeleton />
      ) : (
        <ReviewDetails reviewData={reviewData} />
      )}
    </div>
  );
};
