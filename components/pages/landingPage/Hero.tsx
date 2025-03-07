import React from "react";

type Props = {};

export const Hero = (props: Props) => {
  return (
    <div className="relative bg-hero bg-cover bg-center bg-no-repeat aspect-[3/2] flex flex-col items-center justify-center ">
      <div className="flex flex-col justify-between">
        <h1 className="text-6xl text-white font-[300px] font-[family-name:var(--font-josefin-sans)]">
          find and Hire Skilled Artisans
        </h1>
        <div className=" bg-secondary rounded-[20px] px-6 py-3 text-white shadow-dropShadow mt-14 flex flex-col gap-5">
          <h1 className="text-sm font-bold font-[family-name:var(--font-josefin-sans)] ">
            Find Artisans Close to your Area
          </h1>
          <div className="flex items-center justify-between">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </div>
      <h1 className="absolute bottom-16 z-50 text-5xl text-white font-[family-name:var(--font-josefin-sans)]">Uncover</h1>
    </div>
  );
};
