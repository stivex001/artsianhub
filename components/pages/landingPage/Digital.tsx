"use client";

import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import {
  Code,
  Graphic,
  SocialContent,
  UX,
} from "@/components/assets/icons/FeaturedIcons";
import digital from "@/components/assets/images/digital.png";
import { useRouter } from "next/navigation";

type Props = {};

const defaultCategories: CategoryItem[] = [
  {
    id: "Graphic",
    title: "Graphic Designers & Illustrators",
    description: "Branding, logos, and digital art.",
    icon: <Graphic />,
  },
  {
    id: "Web",
    title: "Web Designers & Developers",
    description: "Custom websites and eCommerce stores.",
    icon: <Code />,
  },
  {
    id: "UX",
    title: "UI/UX Designers",
    description: "User experience and app interface design.",
    icon: <UX />,
  },
  {
    id: "Content",
    title: "Content Creators & Social Media Managers",
    description: "Digital marketing, branding, and online engagement.",
    icon: <SocialContent />,
  },
];

export const Digital = (props: Props) => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/auth/login");
  };

  return (
    <section className="py-20 bg-white">
      <FeaturedCard
        title="Digital & Creative Artisans"
        subtitle="From branding to web design, our digital artisans specialize in creating engaging and functional online experiences."
        categories={defaultCategories}
        featuredImage={digital}
        backgroundColor="#EFF6FF"
        borderColor="#2563EB"
        buttonText="Explore Digital & Creative Artisans"
        onButtonClick={() => handleButtonClick()}
        order
      />
    </section>
  );
};
