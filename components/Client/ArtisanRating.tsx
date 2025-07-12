import React from "react";
import { RatingOverview } from "./RatingOverview";
import { ReviewDetails } from "./ReviewDetails";



type Props = {
  artisanId?: string;
};

export const ArtisanRating = ({ artisanId }: Props) => {
  

  return (
    <div className="flex flex-col gap-6">
      <RatingOverview />

      <ReviewDetails />
    </div>
  );
};
