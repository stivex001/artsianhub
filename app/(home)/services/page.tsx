import { ServiceCategory } from "@/components/pages/landingPage/services/ServiceCategory";
import { Headings } from "@/components/shared/Headings";
import React from "react";
import Design from "@/components/assets/images/bro.png";
import { Category } from "@/types/category";
import { CategoryCard } from "@/components/shared/CategoryCard";

type Props = {};

const fashionData: Category[] = [
  {
    id: 1,
    desc: "Graphic Designers & Illustrators – Branding, logos, and digital art.",
    image: Design,
  },
  {
    id: 2,
    desc: "Web Designers & Developers – Custom websites and eCommerce stores.",
    image: Design,
  },
  {
    id: 3,
    desc: "UI/UX Designers – User experience and app interface design",
    image: Design,
  },
  {
    id: 4,
    desc: "Content Creators & Social Media Managers – Digital marketing, branding, and online engagement",
    image: Design,
  },
  {
    id: 5,
    desc: "Content Creators & Social Media Managers – Digital marketing, branding, and online engagement",
    image: Design,
  },
];

const Service = (props: Props) => {
  return (
    <div className="bg-service bg-cover bg-top  w-full min-h-screen mt-24 pt-4 pb-20">
      <ServiceCategory />
      <div className="mt-14 flex flex-col gap-14">
        <Headings
          title="Fashion &Textile Artisans"
          className="text-center font-[300] text-5xl"
        />
        <div className="flex flex-col gap-7">
          <h2 className="text-2xl font-[300] text-center">
            Tailors & Dressmakers – Custom clothing, alterations, and bespoke
            fashion.
          </h2>
          <div className="w-full px-5 lg:w-9/12 mx-auto grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-6 lg:gap-8">
            {fashionData?.map((item) => (
              <CategoryCard key={item?.id} item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <h2 className="text-2xl font-[300] text-center">
            Tailors & Dressmakers – Custom clothing, alterations, and bespoke
            fashion.
          </h2>
          <div className="w-full px-5 lg:w-9/12 mx-auto grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-6 lg:gap-8">
            {fashionData?.map((item) => (
              <CategoryCard key={item?.id} item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <h2 className="text-2xl font-[300] text-center">
            Tailors & Dressmakers – Custom clothing, alterations, and bespoke
            fashion.
          </h2>
          <div className="w-full px-5 lg:w-9/12 mx-auto grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-6 lg:gap-8">
            {fashionData?.map((item) => (
              <CategoryCard key={item?.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
