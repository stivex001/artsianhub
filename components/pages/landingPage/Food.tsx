"use client";

import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import {
  CakeIcon,
  CholateIcon,
  FishMonger,
  ForkIcon,
  ScissorsIcon,
  ShoeIcon,
  WeaverIcon,
} from "@/components/assets/icons/FeaturedIcons";
import cook from "@/components/assets/images/cook.png";

type Props = {};

const defaultCategories: CategoryItem[] = [
  {
    id: "chefs",
    title: "Chefs & Caterers",
    description: "Private dining, event catering, and meal prep services.",
    icon: <ForkIcon />,
  },
  {
    id: "bakers",
    title: "Bakers & Pastry Chefs",
    description: "Handmade cakes, pastries, and artisanal bread.",
    icon: <CakeIcon />,
  },
  {
    id: "Chocolatiers",
    title: "Chocolatiers",
    description: "Craft chocolate makers and confectioners.",
    icon: <CholateIcon />,
  },
  {
    id: "Butchers",
    title: "Butchers & Fishmongers",
    description: "Specialist meat and seafood preparation.",
    icon: <FishMonger />,
  },
   {
    id: "Cheesemakers",
    title: "Cheesemakers",
    description: "Traditional and modern dairy artisans.",
    icon: <WeaverIcon />,
  },
];

export const Food = (props: Props) => {
  return (
    <section className="py-20 px-4 bg-white">
      <FeaturedCard
        title="Food & Culinary Artisans"
        subtitle="Bring flavor to your events or home with our skilled food artisans who specialize in culinary creations."
        categories={defaultCategories}
        featuredImage={cook}
        backgroundColor="#FFFBEB"
        borderColor="#D97706"
        buttonText="Explore Food & Culinary Artisans"
        onButtonClick={() => console.log("Button clicked")}
        order
      />
    </section>
  );
};
