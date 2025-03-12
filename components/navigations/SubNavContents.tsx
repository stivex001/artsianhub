"use client";
import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  sub: any;
  title: string;
  icon: StaticImageData;
  onClose: (value: boolean) => void;
};

export const SubNavContents = ({ sub, icon, title, onClose }: Props) => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/services`);
    onClose(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute left-40 top-10 bg-white shadow-dropShadow rounded-[20px] p-8 z-50 w-[500px] flex flex-col gap-5"
    >
      <div className="flex items-center gap-3 ml-5">
        <div className="w-6 h-6">
          <Image src={icon} alt="icon" className="w-full h-full object-cover" />
        </div>
        <span className="text-sm text-black  ">{title}</span>
      </div>
      <div className="flex flex-col gap-3">
        {sub?.map((item: any, idx: number) => (
          <p
            onClick={() => handleClick(item.name)}
            key={idx}
            className=" text-sm text-primary"
          >
            {item?.name}
            <span className="ml-3 text-sm text-black">{item?.desc}</span>
          </p>
        ))}
      </div>
    </motion.div>
  );
};
