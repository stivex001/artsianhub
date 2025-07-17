import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Wrapper = ({ children, className }: Props) => {
  return <div className={`bg-white p-5 rounded-2xl ${className}`}>{children}</div>;
};

export default Wrapper;
