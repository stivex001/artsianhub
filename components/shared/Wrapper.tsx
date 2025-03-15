import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Wrapper = ({ children, className }: Props) => {
  return <div className={`border border-[#5691D1] rounded-[10px] ${className}`}>{children}</div>;
};

export default Wrapper;
