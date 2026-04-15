import React, { ReactNode } from "react";

// Public admin auth layout — no route protection applied
const AdminAuthLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default AdminAuthLayout;
