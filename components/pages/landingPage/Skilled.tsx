"use client";

import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import {
  Brush,
  Hairdressers,
  Handymen,
  Mechanic,
  Perfume,
  Plumbers,
  Soap,
  Watchmakers,
} from "@/components/assets/icons/FeaturedIcons";
import carpenter from "@/components/assets/images/carpenter.png";
import { useRouter } from "next/navigation";

type Props = {};

const defaultCategories: CategoryItem[] = [
  {
    id: "Plumbers",
    title: "Plumbers & Electricians",
    description: "Home maintenance and repair specialists.",
    icon: <Plumbers />,
  },
  {
    id: "Mechanics",
    title: "Mechanics & Bicycle Repair Technicians",
    description: "Car and bike servicing experts.",
    icon: <Mechanic />,
  },
  {
    id: "Watchmakers",
    title: "Watchmakers & Clock Restorers",
    description: "Timepiece repair and restoration..",
    icon: <Watchmakers />,
  },
  {
    id: "Handymen",
    title: "Handymen & General Repair Specialists",
    description: "Home improvement and DIY professionals..",
    icon: <Handymen />,
  },
];

export const Skilled = (props: Props) => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/home/skilled-artisans");
  };

  return (
    <section className="py-20 bg-white">
      <FeaturedCard
        title="Pro Artisans"
        subtitle="Get skilled home repairs and services from expert trades people—plumbers, electricians, and mechanics."
        categories={defaultCategories}
        featuredImage={carpenter}
        backgroundColor="#F4F5F6"
        borderColor="#4B5563"
        buttonText="Explore Skilled Trades & Repair Artisans"
        onButtonClick={() => handleButtonClick()}
      />
    </section>
  );
};
