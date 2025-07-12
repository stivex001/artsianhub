import Image from "next/image";
import React from "react";

const mockReviews = [
  {
    id: 1,
    name: "Juhi Nivedita",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 5.0,
    date: "Sept. 7, 12:24pm",
    review:
      "Claire was incredibly professional. He fixed my leaking bathroom pipes within a few hours and cleaned up after the job. Pricing was fair and transparent. I'll definitely call him again!",
  },
  {
    id: 2,
    name: "George Wesley",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 5.0,
    date: "Sept. 7, 12:24pm",
    review:
      "Very responsive and did a great job installing my kitchen sink. Came a bit late, but he communicated ahead. Work quality is solid.",
  },
  {
    id: 3,
    name: "Adeola Tariq",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 5.0,
    date: "Sept. 7, 12:24pm",
    review:
      "I booked him for a complete plumbing job in a new building. He handled everything from pipe layout to final fixtures. Neat and reliable. Highly recommend.",
  },
  {
    id: 4,
    name: "Yasmine Sadie",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 5.0,
    date: "Sept. 7, 12:24pm",
    review:
      "Job was done eventually, but communication could have been better. Still, he knew what he was doing and the problem is fixed.",
  },
  {
    id: 5,
    name: "Eka Kundi",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    rating: 5.0,
    date: "Sept. 7, 12:24pm",
    review:
      "This is the third time I've worked with Claire. Always punctual, always delivers great results. Definitely one of the best on this platform.",
  },
];

type Props = {};

export const ReviewDetails = (props: Props) => {
  const reviews = mockReviews;
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Review</h2>

      <div className="space-y-5">
        {reviews?.map((review) => (
          <div key={review.id} className="sapce-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="text-sm text-gray-500 mb-3">
                    {review.date}
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
                  {review.rating}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
