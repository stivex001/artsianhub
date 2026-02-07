import { TrustedIcon } from "@/components/assets/icons/SvgIcons";
import React from "react";

type Props = {};

export const Trusted = (props: Props) => {
  return (
    <div className="mb-6 bg-grayish  rounded-full py-2 px-4 flex items-center gap-2">
      {/* <TrustedIcon /> */}
      <p className="text-white text-base font-bold">       
        More visibility. More clients. More orders.
      </p>
    </div>
  );
};
