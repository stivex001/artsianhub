"use client";

import { CustomButton } from "@/components/clickable/CustomButton";
import React, { useState } from "react";
import pics from "@/components/assets/images/artisan.png";
import Image from "next/image";

const imageData = Array.from({ length: 4 }).map(() => ({ img: pics }));

const ArtisanPictures = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-7">
      <CustomButton
        label="Image to be displayed on the website"
        className="rounded-[10px] h-14 bg-secondary text-white text-lg"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {imageData.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`overflow-hidden cursor-pointer `}
          >
            <div className=" h-[132px]">
              <Image
                src={item.img}
                alt="artisan"
                width={110}
                height={132}
                className="rounded-[10px] w-full h-full object-cover"
              />
            </div>
            <div className=" flex items-center justify-end">
              <CustomButton label="Change Upload" className="rounded-[10px] h-3 !text-[5px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisanPictures;
