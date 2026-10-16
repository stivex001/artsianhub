import BreadCrumbs from "@/components/navigations/BreadCrumbs";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DetailsLayout = ({ children }: Props) => {
  return (
    <div className="">
      <div className="my-5 max-w-7xl mx-auto px-5">
        <BreadCrumbs />
        {children}
        {/* <div className="min-h-screen flex flex-col gap-4 ">
          {children}
        </div> */}
      </div>
    </div>
  );
};

export default DetailsLayout;
