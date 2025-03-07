import { Category } from "@/types/category";
import Image from "next/image";
import React from "react";

type CategoryProps = {
  item: Category;
};

export const CategoryCard = ({ item }: CategoryProps) => {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex items-center justify-center shadow-cardShadow rounded-[10px]">
        <Image src={item?.image} alt="category" width={216} height={324} className="w-full rounded-[10px] px-3" />
      </div>
      <p className="text-sm text-black font-[300px] font-[family-name:var(--font-josefin-sans)]">{item?.desc}</p>
    </div>
  );
};
