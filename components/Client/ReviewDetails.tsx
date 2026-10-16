"use client";
import { ReviewInfo } from "@/apis/crud/appointments";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import React from "react";

type Props = {
  reviewData: any;
};

export const ReviewDetails = ({ reviewData }: Props) => {
  const reviews = reviewData;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Review</h2>

      {!reviews || reviews.length === 0 ? (
        <div className="text-gray-500 text-sm">No reviews yet.</div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review: ReviewInfo) => (
            <div key={review?._id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                    {review?.client?.profilePicture ? (
                      <Image
                        src={review?.client?.profilePicture}
                        alt="client"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-base font-bold text-gray-600">
                        {review?.client?.firstName?.charAt(0)?.toUpperCase()}
                        {review?.client?.lastName?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review?.client?.firstName} {review?.client?.lastName}
                    </h4>
                    <div className="text-sm text-gray-500 mb-3">
                      {formatDate(review?.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {review?.rating}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review?.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
