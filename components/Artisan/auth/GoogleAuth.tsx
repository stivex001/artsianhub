import { Google } from "@/components/assets/icons/Google";
import React from "react";

type Props = {};

export const GoogleAuth = (props: Props) => {
  return (
    <div className="my-2 flex flex-col gap-6">
      <div className="w-full flex items-center justify-center">
        <div className="w-full relative h-[0px] border "></div>
        <p className="absolute bg-white px-3 text-zinc-800 text-sm font-normal ">
          or
        </p>
      </div>
      <button className="w-full h-[44px] rounded-xl py-3  bg-milky flex items-center justify-center gap-2">
        <Google />
        <span className="text-sm font-medium text-paragrah">
          Continue with Google
        </span>
      </button>
    </div>
  );
};
