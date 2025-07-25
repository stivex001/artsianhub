"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MapIcon } from "../assets/icons/UsersIcon";
import { PortfolioModal } from "./PortfolioModal";
import { usePathname, useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

type Props = {
  item: any;
  showDate?: boolean;
  artisanId?: string;
};

export const PortfolioCard = ({ item, showDate, artisanId }: Props) => {
  const pathname = usePathname();

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const artisanPage = pathname.startsWith("/artisan");
  const clientPage = pathname.startsWith("/client");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile && clientPage) {
      router.push(
        `/client/artisan-details/portfolio-details?artisanId=${artisanId}&id=${item?._id}`
      );
    } else if (artisanPage) {
      router.push(`/artisan/dashboard/portfolio/${item?._id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-white  rounded-2xl py-4 px-2.5 overflow-hidden hover:shadow-shadowHover transition-shadow duration-200 flex flex-col gap-3 cursor-pointer"
      >
        <div className="aspect-video bg-gray-100 rounded-xl relative overflow-hidden">
          <Image
            src={item?.photos?.[0]?.url}
            alt={item?.title}
            width={262}
            height={200}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300"
          />
        </div>

        <div className="">
          <h3 className="text-base font-bold text-paragrah mb-2 line-clamp-2">
            {item?.title}
          </h3>

          <div className="flex  mb-2">
            <MapIcon />
            <span className="w-[90%] text-body text-sm font-medium">
              {item?.location}
            </span>
          </div>
          <p className="text-[#667185] text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {item?.serviceType?.map((service: any) => (
              <span
                key={service?._id}
                className="px-3 py-1.5 bg-[#1129A00D] text-body rounded-[20px] text-xs font-medium"
              >
                {service?.name}
              </span>
            ))}
          </div>
          {showDate && (
            <div className="flex items-center justify-end">
              <p className="text-sm text-[#667185]">{formatDate(item?.date)}</p>
            </div>
          )}
        </div>
        <PortfolioModal item={item} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
};
