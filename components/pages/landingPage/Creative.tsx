"use client"
import {
  ScissorsIcon,
  ShoeIcon,
  WeaverIcon,
} from "@/components/assets/icons/FeaturedIcons";
import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import tailor from "@/components/assets/images/tailor.png";
import { useRouter } from "next/navigation";

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

export const Creative = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/auth/login");
  };
  return (
    <section className="py-20 bg-white">
      <FeaturedCard
        title="Creative Artisans"
        subtitle="From hairdressers and tailors to event planners, our Creative Artisans shape everyday life with style, beauty, and imagination. Explore talents that bring ideas to life through fashion, design, and celebration."
        categories={defaultCategories}
        featuredImage={tailor}
        backgroundColor="#EFF6FF"
        borderColor="#2563EB"
        buttonText="Explore Creative Artisans"
        onButtonClick={() => handleButtonClick()}
        order
      />
    </section>
  );
};
