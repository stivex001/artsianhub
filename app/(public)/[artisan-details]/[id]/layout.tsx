import BreadCrumbs from "@/components/navigations/BreadCrumbs";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DetailsLayout = ({ children }: Props) => {
  return (
    <div className="">
      <div className="mt-20 max-w-7xl mx-auto px-5">
       {children}
        <div className="min-h-screen flex flex-col gap-4 ">
          {/* <BreadCrumbs /> */}
          {/* {children} */}
        </div>
      </div>
    </div>
  );
};

export default DetailsLayout;
