import { Header } from "@/components/navigations/Header";
import BreadCrumbs from "@/components/navigations/BreadCrumbs";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DetailsLayout = ({ children }: Props) => {
  return (
    <div className="">
      <Header brandlogo className="!bg-white fixed top-0 left-0 right-0 z-50" logoHref="/client" />
      <div className="mt-20 max-w-7xl mx-auto px-5">
        <div className="min-h-screen flex flex-col gap-4 ">
          <BreadCrumbs />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DetailsLayout;
