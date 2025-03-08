import React from "react";
import { motion } from "framer-motion";
import { ServiceData } from "../data/dummy";
import Image, { StaticImageData } from "next/image";

type Props = {
  sub: any;
  title: string;
  icon: StaticImageData;
};

export const SubNavContents = ({ sub, icon, title }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute left-40 top-10 bg-white shadow-dropShadow rounded-[20px] p-8 z-50 w-[500px] flex flex-col gap-5"
    >
      <div className="flex items-center gap-3 ml-5">
        <div className="w-5 h-5">
          <Image src={icon} alt="icon" className="w-full h-full object-cover" />
        </div>
        <span className="text-sm text-black font-[family-name:var(--font-josefin-sans)] ">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {sub?.map((item: any, idx: number) => (
          <p
            key={idx}
            className=" text-sm text-primary font-[family-name:var(--font-josefin-sans)] "
          >
            {item?.name}
            <span className="ml-3 text-sm text-black font-[family-name:var(--font-josefin-sans)] ">
              {item?.desc}
            </span>
          </p>
        ))}
      </div>
    </motion.div>
  );
};
