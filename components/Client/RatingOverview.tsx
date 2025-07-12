import React from "react";

// Mock data - replace with actual data
const mockRatingData = {
  averageRating: 4.7,
  totalRatings: 267,
  ratingBreakdown: {
    5: 180,
    4: 60,
    3: 15,
    2: 8,
    1: 4,
  },
};

const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`${starSize} ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          } fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

type Props = {};

export const RatingOverview = (props: Props) => {
  const ratingData = mockRatingData;

  const getRatingPercentage = (rating: number) => {
    const count =
      ratingData.ratingBreakdown[
        rating as keyof typeof ratingData.ratingBreakdown
      ];
    return (count / ratingData.totalRatings) * 100;
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-paragrah mb-3">Ratings</h2>

      <div className="flex items-center gap-5 md:gap-8">
        {/* Average Rating */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-paragrah mb-2">
            {ratingData?.averageRating}
          </div>
          <div className="mb-2">
            {renderStars(Math.floor(ratingData.averageRating), "md")}
          </div>
          <div className="text-body text-sm font-medium">
            {ratingData.totalRatings} Ratings
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
                {
                  ratingData.ratingBreakdown[
                    rating as keyof typeof ratingData.ratingBreakdown
                  ]
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
