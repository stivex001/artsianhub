import { AdminHeader } from "@/components/navigations/AdminHeader";
import Sidebar from "@/components/navigations/Sidebar";
import ProtectedRoutes from "@/components/shared/ProtectedRoutes";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArtisanDashboardLayout = ({ children }: Props) => {
  return (
    <ProtectedRoutes allowedRoles={["artisan"]}>
      <div className="flex bg-primary min-h-screen w-full h-full overflow-x-clip">
        <Sidebar />
        <div className="w-full lg:w-[82%] rounded-[10px] px-5 py-5">
          <AdminHeader />
          <div className=" px-[18px] lg:px-8 bg-white rounded-b-[10px] py-5 overflow-y-auto no-scrollbar scrollbar-hidden">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default ArtisanDashboardLayout;
