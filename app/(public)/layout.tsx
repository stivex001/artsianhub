import Footer from "@/components/navigations/Footer";
import { Header } from "@/components/navigations/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return (
    <div className="">
      <Header />
      <div className="h-[calc(100vh-96px)] overflow-y-auto scrollbar-hidden">
        {children}

        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
