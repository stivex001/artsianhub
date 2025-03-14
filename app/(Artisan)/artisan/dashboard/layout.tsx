import Sidebar from "@/components/navigations/Sidebar";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArtisanDashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex bg-primary min-h-screen w-full h-full overflow-x-clip">
      <Sidebar />
      <div className="w-full lg:w-[82%] bg-white my-5 mx-5 rounded-[10px] px-10">
        <div>Header</div>
        <div className="  mt-7 px-[18px] lg:px-8 py-4 overflow-y-auto no-scrollbar scrollbar-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboardLayout;
