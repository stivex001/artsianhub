"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MapIcon } from "../assets/icons/UsersIcon";
import { PortfolioModal } from "./PortfolioModal";

type Props = {
  item: any;
};

export const PortfolioCard = ({ item }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        onClick={openModal}
        className="bg-white rounded-2xl py-4 px-2.5 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 cursor-pointer"
      >
        <div className="aspect-video bg-gray-100 rounded-xl relative overflow-hidden">
          <Image
            src={item?.images?.[0]}
            alt={item?.title}
            //   layout="fill"
            width={262}
            height={200}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300"
          />
        </div>

        <div className="">
          <h3 className="text-base font-bold text-paragrah mb-2 line-clamp-2">
            {item?.title}
          </h3>

          <div className="flex items-center mb-2">
            <MapIcon />
            <span className="text-body text-sm font-medium">
              {item?.location}
            </span>
          </div>
          <p className="text-[#667185] text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {item?.services?.map((service: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-[#1129A00D] text-body rounded-[20px] text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        <PortfolioModal item={item} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
};
