import DashboardLayout from "@/components/shared/DashboardLayout";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AdminDashboardLayout = ({ children }: Props) => {
  return (
    <DashboardLayout
      allowedRoles={["ADMIN", "SUPER_ADMIN"]}
      loginPath="/admin/auth/login"
    >
      {children}
    </DashboardLayout>
  );
};

export default AdminDashboardLayout;
