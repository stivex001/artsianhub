import { Category } from "@/types/category";
import Image from "next/image";
import React from "react";

type CategoryProps = {
  item: any;
};

export const CategoryCard = ({ item }: CategoryProps) => {
  console.log(item, "item__");

  return (
    <div className=" flex flex-col gap-4">
      <div className=" w-[272px] h-[375px] flex items-center justify-center shadow-cardShadow rounded-[10px]">
        <div className="relative w-full h-full">
          <Image
            src={item?.image}
            alt="category"
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
        </div>
      </div>
      {/* <p className="text-[10px] lg:text-sm text-black font-light ">{item?.desc}</p> */}
    </div>
  );
};
