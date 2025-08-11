import React, { ReactNode } from "react";

import ProtectedRoutes from "@/components/shared/ProtectedRoutes";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <ProtectedRoutes allowedRoles={["artisan"]}>{children}</ProtectedRoutes>
  );
};

export default AdminLayout;
