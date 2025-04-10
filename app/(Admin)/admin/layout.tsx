import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return <div className="">{children}</div>;
};

export default AdminLayout;
