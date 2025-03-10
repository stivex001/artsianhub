import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <section className="flex items-center justify-center py-8">
      <div className="lg:w-7/12 flex justify-between w-11/12 h-[75vh] rounded-[10px]">
        <section className="bg-hero bg-cover  object-right-top bg-no-repeat w-1/2 h-full sm:block hidden rounded-l-[10px] ">
          {/* <Image src={img} alt="hero" className="h-full  object-center bg-center" /> */}
        </section>
        <section className="w-1/2 h-full flex items-center justify-center bg-white shadow-dropShadow rounded-[10px]">
          {children}
        </section>
      </div>
    </section>
  );
};
