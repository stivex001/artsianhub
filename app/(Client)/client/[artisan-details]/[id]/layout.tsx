import { ClientNav } from "@/components/Client/ClientNav";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DetailsLayout = ({ children }: Props) => {
  return (
    <div className="">
      <ClientNav brandlogo />
      <div className="mt-24 max-w-7xl mx-auto px-5">{children}</div>
    </div>
  );
};

export default DetailsLayout;
