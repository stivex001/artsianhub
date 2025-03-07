import React from "react";
import image1 from "@/components/assets/images/buy.png";
import image2 from "@/components/assets/images/bar.png";
import image3 from "@/components/assets/images/makup.png";
import image4 from "@/components/assets/images/mascara.png";
import image5 from "@/components/assets/images/iMac.png";
import image6 from "@/components/assets/images/Drawing.png";
import image7 from "@/components/assets/images/Hammer.png";
import image8 from "@/components/assets/images/cart.png";
import Image from "next/image";

type Props = {};

const data = [
  { id: 1, icon: image1 },
  { id: 2, icon: image2 },
  { id: 3, icon: image3 },
  { id: 4, icon: image4 },
  { id: 5, icon: image5 },
  { id: 6, icon: image6 },
  { id: 7, icon: image7 },
  { id: 8, icon: image8 },
];

export const Arts = (props: Props) => {
  return (
    <div className="w-9/12 mx-auto flex items-center gap-8 sticky z-40 -mt-8">
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-white w-[100px] h-[100px] rounded-[10px] flex items-center justify-center"
          >
            <Image
              src={item.icon}
              alt="icon"
              className="w-[60px] h-[60px] object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};
