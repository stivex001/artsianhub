import React, { ReactNode } from "react";

import ProtectedRoutes from "@/components/shared/ProtectedRoutes";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <ProtectedRoutes
      allowedRoles={["admin", "SUPER_ADMIN"]}
      loginPath="/admin/auth/login"
    >
      {children}
    </ProtectedRoutes>
  );
};

export default AdminLayout;
