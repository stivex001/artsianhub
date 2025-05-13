import { Star } from "lucide-react";

type ratingProps = {
  rating: any;
};

export const RenderRatings = ({ rating }: ratingProps) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={`w-6 h-6  ${
        i <= rating ? "text-[#FFD700]" : "text-white"
      }`}
      fill={i <= rating ? "currentColor" : "none"}
    />
  ));
};
