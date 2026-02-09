"use client";
import { useArtisans } from "@/api/crud/artisans";
import { renderStars } from "@/utils/RenderRatings";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  ratings: any;
  totalReview: any;
};

export const RatingOverview = ({ ratings, totalReview }: Props) => {
  const params = useParams();
  const id = params.id;
  const { getArtisanById } = useArtisans();
  const { data, isPending } = getArtisanById(`${id}`);

  const artisan = data?.data;
  const ratingData = ratings;

  const getRatingPercentage = (rating: number) => {
    const count = ratingData?.[rating] || 0;
    const totalReviews = typeof totalReview === "number" ? totalReview : 0;
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-paragrah mb-3">Ratings</h2>

      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
        {/* Average Rating */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-paragrah mb-2">
            {artisan?.averageRating}
          </div>
          <div className="mb-2">
            {renderStars(Math.floor(artisan?.averageRating ?? 0), "md")}
          </div>
          <div className="text-body text-sm font-medium">
            {totalReview} Ratings
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-paragrah">
                  {rating}
                </span>
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="w-40 bg-gray-200 rounded-xl h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-xl transition-all duration-300"
                  style={{ width: `${getRatingPercentage(rating)}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 w-8">
                {ratingData?.[rating] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
