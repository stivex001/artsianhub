import React, { ReactNode } from "react";

import ProtectedRoutes from "@/components/shared/ProtectedRoutes";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return <ProtectedRoutes allowedRoles={["admin"]}>{children}</ProtectedRoutes>;
};

export default AdminLayout;
