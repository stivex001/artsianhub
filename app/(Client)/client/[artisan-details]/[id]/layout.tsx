import { ClientNav } from "@/components/Client/ClientNav";
import BreadCrumbs from "@/components/navigations/BreadCrumbs";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DetailsLayout = ({ children }: Props) => {
  return (
    <div className="">
      <ClientNav brandlogo />
      <div className="mt-24 max-w-7xl mx-auto px-5">
        <div className="min-h-screen flex flex-col gap-4 ">
          <BreadCrumbs />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DetailsLayout;
