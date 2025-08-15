import React from "react";
import { Users, Award, Heart } from "lucide-react";
import {
  AwardIcon,
  CommunityPeople,
  PassionIcon,
} from "@/components/assets/icons/UsersIcon";

type CardItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const cardData: CardItem[] = [
  {
    icon: CommunityPeople,
    title: "Community First",
    description:
      "We believe in building strong communities by connecting skilled artisans with customers who value quality craftsmanship.",
  },
  {
    icon: AwardIcon,
    title: "Quality Excellence",
    description:
      "Every artisan on our platform is carefully vetted to ensure they meet our high standards of quality and professionalism.",
  },
  {
    icon: PassionIcon,
    title: "Passion Driven",
    description:
      "We're passionate about preserving traditional crafts while embracing modern innovation and technology.",
  },
];

export const OtherDetails = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <Icon />
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">
                {title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
