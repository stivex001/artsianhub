"use client";

import React, { ReactNode } from "react";
import Sidebar from "@/components/navigations/Sidebar";
import { AdminHeader } from "@/components/navigations/AdminHeader";
import ProtectedRoutes from "@/components/shared/ProtectedRoutes";

type Props = {
  children: ReactNode;
  allowedRoles: string[];
  loginPath?: string;
};

const DashboardLayout = ({ children, allowedRoles, loginPath }: Props) => {
  return (
    <ProtectedRoutes allowedRoles={allowedRoles} loginPath={loginPath}>
      <div className="flex min-h-screen w-full h-full overflow-x-clip">
        <Sidebar />
        <div className="w-full lg:w-[80%] bg-[#f9f9fb] rounded-[10px]">
          <AdminHeader />
          <div className="px-4 lg:px-8 rounded-b-[10px] py-5 overflow-y-auto no-scrollbar scrollbar-hidden">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default DashboardLayout;
