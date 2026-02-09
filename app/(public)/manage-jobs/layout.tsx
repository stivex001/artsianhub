import { Header } from "@/components/navigations/Header";
import { Descriptions } from "@/components/shared/Headings";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ManageJobLayout = ({ children }: Props) => {
  return (
    <div className="bg-[#f9f9fb]">
      <Header
        brandlogo
        className="!bg-[#f9f9fb] fixed top-0 left-0 right-0 z-50"
        logoHref="/"
      />
      <div className="pt-5 max-w-7xl mx-auto px-5">
        <div className="min-h-screen flex flex-col gap-5 ">
          <Descriptions
            title="Manage Jobs"
            desc="View all your service requests — from upcoming appointments to completed jobs and past history."
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default ManageJobLayout;
