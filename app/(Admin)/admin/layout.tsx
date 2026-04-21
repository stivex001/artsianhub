import React, { ReactNode } from "react";

import ProtectedRoutes from "@/components/shared/ProtectedRoutes";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <ProtectedRoutes
      allowedRoles={["ADMIN", "SUPER_ADMIN"]}
      loginPath="/admin/auth/login"
    >
      {children}
    </ProtectedRoutes>
  );
};

export default AdminLayout;
