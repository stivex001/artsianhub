import DashboardLayout from "@/components/shared/DashboardLayout";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArtisanDashboardLayout = ({ children }: Props) => {
  return <DashboardLayout allowedRoles={["artisan"]}>{children}</DashboardLayout>;
};

export default ArtisanDashboardLayout;
