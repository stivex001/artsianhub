"use client";

import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import {
  ScissorsIcon,
  ShoeIcon,
  WeaverIcon,
} from "@/components/assets/icons/FeaturedIcons";
import tailor from "@/components/assets/images/tailor.png";
import { useRouter } from "next/navigation";

type Props = {};

const defaultCategories: CategoryItem[] = [
  {
    id: "tailors",
    title: "Tailors & Dressmakers",
    description: "Custom clothing, alterations, and bespoke fashion.",
    icon: <ScissorsIcon />,
  },
  {
    id: "shoemakers",
    title: "Shoemakers & Leatherworkers",
    description: "Handmade shoes, bags, and accessories.",
    icon: <ShoeIcon />,
  },
  {
    id: "weavers",
    title: "Weavers & Textile Designers",
    description: "Handwoven fabrics, scarves, and upholstery.",
    icon: <WeaverIcon />,
  },
  {
    id: "embroidery",
    title: "Embroidery Artists",
    description: "Custom embroidery for clothing and decor.",
    icon: <WeaverIcon />,
  },
];

export const Fashion = (props: Props) => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/auth/login");
  };

  return (
    <section id="categories" className="py-20  bg-white">
      <FeaturedCard
        title="Fashion & Textile Artisans"
        subtitle="Explore top-tier fashion and textile artisans who specialize in custom designs, alterations, and more."
        categories={defaultCategories}
        featuredImage={tailor}
        backgroundColor="#FFFBEB"
        borderColor="#D97706"
        buttonText="Explore Fashion & Textile Artisans"
        onButtonClick={() => handleButtonClick()}
      />
    </section>
  );
};
