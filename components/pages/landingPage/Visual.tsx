"use client";

import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import {
  Calligraphers,
  Painters,
  Photographers,
  Sculptors,
  Tattoo,
} from "@/components/assets/icons/FeaturedIcons";
import visual from "@/components/assets/images/visual.png";

type Props = {};

const defaultCategories: CategoryItem[] = [
  {
    id: "Painters",
    title: "Custom artwork, portraits, and murals.",
    description: "Custom hair styling and grooming.",
    icon: <Painters />,
  },
  {
    id: "Sculptors",
    title: "Sculptors",
    description: "Clay, metal, stone, and mixed-media sculptures.",
    icon: <Sculptors />,
  },
  {
    id: "Calligraphers",
    title: "Calligraphers & Lettering Artists",
    description: "Custom signage, wedding invites, and typography art.",
    icon: <Calligraphers />,
  },
  {
    id: "Photographers",
    title: "Photographers & Videographers",
    description: "Portraits, event coverage, and commercial media.",
    icon: <Photographers />,
  },
  {
    id: "Tattoo",
    title: "Tattoo Artists",
    description: "Custom ink designs and body art.",
    icon: <Tattoo />,
  },
];

export const Visual = (props: Props) => {
  return (
    <section className="py-20 px-4 bg-white">
      <FeaturedCard
        title="Visual & Performing Arts Artisans"
        subtitle="Custom artwork, sculpture, photography, and tattoo artistry, all created by talented and passionate artists."
        categories={defaultCategories}
        featuredImage={visual}
        backgroundColor="#FAF5FF"
        borderColor="#9333EA"
        buttonText="Explore Visual & Performing Arts Artisans"
        onButtonClick={() => console.log("Button clicked")}
      />
    </section>
  );
};
