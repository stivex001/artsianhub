import { Header } from "@/components/navigations/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  return (
    <div className="">
      <Header />
      <div className="h-[calc(100vh-96px)] overflow-y-auto scrollbar-hidden">{children}</div>
    </div>
  );
};

export default BaseLayout;
