import React, { ReactNode, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Wrapper = ({ children, className, ...props }: Props) => {
  return (
    <div className={`bg-white p-5 rounded-2xl ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

export default Wrapper;
