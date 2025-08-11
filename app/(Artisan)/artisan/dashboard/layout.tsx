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
      <div className="flex  min-h-screen w-full h-full overflow-x-clip">
        <Sidebar />
        <div className="w-full lg:w-[80%] bg-[#f9f9fb] rounded-[10px]">
          <AdminHeader />
          <div className="px-4 lg:px-8  rounded-b-[10px] py-5 overflow-y-auto no-scrollbar scrollbar-hidden">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default ArtisanDashboardLayout;
