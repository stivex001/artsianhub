import { Header } from "@/components/navigations/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  return (
    <div className="container">
      <Header />
      <div className="">{children}</div>
    </div>
  );
};

export default BaseLayout;
