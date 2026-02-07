import { Header } from "@/components/navigations/Header";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SettingsLayout = ({ children }: Props) => {
  return (
    <div className="bg-[#f9f9fb]">
      <Header
        brandlogo
        className="!bg-[#f9f9fb] fixed top-0 left-0 right-0 z-50"
        logoHref="/"
      />
      <div className="pt-28">
        <div className="min-h-screen flex flex-col gap-5 ">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
