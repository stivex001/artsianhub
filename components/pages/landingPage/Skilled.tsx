"use client";

import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import {
  Brush,
  Hairdressers,
  Perfume,
  Soap,
} from "@/components/assets/icons/FeaturedIcons";
import beuty from "@/components/assets/images/beuty.png";

type Props = {};

const defaultCategories: CategoryItem[] = [
  {
    id: "Hairdressers",
    title: "Hairdressers & Barbers",
    description: "Custom hair styling and grooming.",
    icon: <Hairdressers />,
  },
  {
    id: "Makeup",
    title: "Makeup Artists & Beauty Therapists",
    description: "Bridal, event makeup, and skincare treatments.",
    icon: <Brush />,
  },
  {
    id: "Perfume",
    title: "Perfume Makers",
    description: "Handmade and bespoke fragrances.",
    icon: <Perfume />,
  },
  {
    id: "Soap",
    title: "Soap & Skincare Artisans",
    description: "Natural and organic beauty products.",
    icon: <Soap />,
  },
  
];

export const Skilled = (props: Props) => {
  return (
    <section className="py-20 px-4 bg-white">
      <FeaturedCard
        title="Skilled Trades & Repair Artisans"
        subtitle="Beauty, skincare, and personal care artisans bring creativity and care to help you look and feel your best."
        categories={defaultCategories}
        featuredImage={beuty}
        backgroundColor="#F4F5F6"
        borderColor="#4B5563"
        buttonText="Explore Beauty & Personal Care Artisans"
        onButtonClick={() => console.log("Button clicked")}
        order
      />
    </section>
  );
};
