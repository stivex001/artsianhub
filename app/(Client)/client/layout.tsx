import ProtectedRoutes from "@/components/shared/ProtectedRoutes";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <ProtectedRoutes allowedRoles={["client"]}>{children}</ProtectedRoutes>
  );
};

export default ClientLayout;
