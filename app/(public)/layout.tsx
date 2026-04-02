import Footer from "@/components/navigations/Footer";
import { PublicHeader } from "@/components/navigations/PublicHeader";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return (
    <div className="">
      <PublicHeader />
      <div
        id="public-scroll-container"
        className="h-[calc(100vh-96px)] overflow-y-auto scrollbar-hidden"
      >
        {children}

        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
