import ProtectedRoutes from "@/components/shared/ProtectedRoutes";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    // <ProtectedRoutes allowedRoles={["client"]}>{children}</ProtectedRoutes>
    <div>{children}</div>
  );
};

export default ClientLayout;
