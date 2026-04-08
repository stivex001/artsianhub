import DashboardLayout from "@/components/shared/DashboardLayout";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AdminDashboardLayout = ({ children }: Props) => {
  return <DashboardLayout allowedRoles={["admin"]}>{children}</DashboardLayout>;
};

export default AdminDashboardLayout;
