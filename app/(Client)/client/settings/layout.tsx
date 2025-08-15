import { ClientNav } from "@/components/Client/ClientNav";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SettingsLayout = ({ children }: Props) => {
  return (
    <div className="bg-[#f9f9fb]">
      <ClientNav brandlogo className="!bg-primary" />
      <div className="pt-24">
        <div className="min-h-screen flex flex-col gap-5 ">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
