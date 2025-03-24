import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  desc?: string;
  className?: string;
};

export const AuthLayout = ({ children, title, desc, className }: Props) => {
  return (
    <section
      className={`flex items-center justify-center py-8 mt-24 ${className}`}
    >
      <div className="lg:w-7/12 flex justify-between w-11/12 h-screen rounded-[10px]">
        <section className="bg-hero bg-cover bg-no-repeat object-top w-1/2 h-full sm:block hidden rounded-l-[10px] ">
          <h1 className="text-[40px] font-bold text-white max-w-[270px] mx-auto pt-14">
            {title}
          </h1>
          <p className="text-sm font-[300] text-white max-w-[270px] mx-auto">
            {desc}
          </p>
        </section>
        <section className="relative w-full lg:w-1/2  flex  justify-center bg-white shadow-dropShadow rounded-[10px]">
          {children}
        </section>
      </div>
    </section>
  );
};
