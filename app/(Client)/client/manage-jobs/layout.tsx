import { ClientNav } from "@/components/Client/ClientNav";
import BreadCrumbs from "@/components/navigations/BreadCrumbs";
import { Descriptions } from "@/components/shared/Headings";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ManageJobLayout = ({ children }: Props) => {
  return (
    <div className="bg-[#f9f9fb]">
      <ClientNav brandlogo className="!bg-[#f9f9fb]" />
      <div className="pt-24 max-w-7xl mx-auto px-5">
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
