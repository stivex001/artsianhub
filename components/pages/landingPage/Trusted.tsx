import { TrustedIcon } from "@/components/assets/icons/SvgIcons";
import React from "react";

type Props = {};

export const Trusted = (props: Props) => {
  return (
    <div className="mb-6 bg-grayish  rounded-full py-2 px-4 flex items-center gap-2">
      <TrustedIcon />
      <p className="text-white text-sm">
        {" "}
        Trusted by 10,000+ Artisans Worldwide
      </p>
    </div>
  );
};
