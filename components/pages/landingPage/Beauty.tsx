"use client";

import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import {
  Brush,
  Hairdressers,
  Perfume,
  Soap,
} from "@/components/assets/icons/FeaturedIcons";
import beuty from "@/components/assets/images/beuty.png";
import { useRouter } from "next/navigation";

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

export const Beauty = (props: Props) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/auth/login");
  };

  return (
    <section className="py-20 bg-white">
      <FeaturedCard
        title="Beauty & Personal Care Artisans"
        subtitle="Beauty, skincare, and personal care artisans bring creativity and care to help you look and feel your best."
        categories={defaultCategories}
        featuredImage={beuty}
        backgroundColor="#FDF2F8"
        borderColor="#DB2777"
        buttonText="Explore Beauty & Personal Care Artisans"
        onButtonClick={() => handleButtonClick()}
        order
      />
    </section>
  );
};
