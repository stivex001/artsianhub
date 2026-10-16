import type { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const AdminAuthLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default AdminAuthLayout;
