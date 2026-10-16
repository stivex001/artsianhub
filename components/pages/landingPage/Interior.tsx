"use client";

import { CategoryItem, FeaturedCard } from "@/components/shared/FeaturedCard";
import {
 
  Glass,
  Hammer,
  Metal,
  Potters,
  Upholsterers,
} from "@/components/assets/icons/FeaturedIcons";
import int from "@/components/assets/images/int.png";
import { useRouter } from "next/navigation";

type Props = {};

const defaultCategories: CategoryItem[] = [
  {
    id: "Carpenters",
    title: "Carpenters & Woodworkers",
    description: "Custom furniture, cabinetry, and woodcraft.",
    icon: <Hammer />,
  },
  {
    id: "Blacksmiths",
    title: "Blacksmiths & Metalworkers",
    description: "Hand-forged tools, gates, and sculptures.",
    icon: <Metal />,
  },
  {
    id: "Potters",
    title: "Potters & Ceramic Artists",
    description: "Handmade pottery, tableware, and sculptures.",
    icon: <Potters />,
  },
  {
    id: "Glassblowers",
    title: "Glassblowers & Stained Glass Artists",
    description: "Decorative and functional glass art.",
    icon: <Glass />,
  },
   {
    id: "Upholsterers",
    title: "Upholsterers",
    description: "Custom furniture restoration and fabric work.",
    icon: <Upholsterers />,
  },
];

export const Interior = (props: Props) => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/auth/login");
  };

  return (
    <section className="py-20 bg-white">
      <FeaturedCard
        title="Home & Interior Artisans"
        subtitle="Transform your living space with custom woodwork,furniture, and unique home art from skilled artisans."
        categories={defaultCategories}
        featuredImage={int}
        backgroundColor="#ECFDF5"
        borderColor="#059669"
        buttonText="Explore Home & Interior Artisans"
        onButtonClick={() => handleButtonClick()}
      />
    </section>
  );
};
