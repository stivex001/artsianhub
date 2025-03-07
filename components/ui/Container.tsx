import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`max-w-screen-xl sm:w-[80%] w-[90%] mx-auto  ${className}`}>
      {children}
    </div>
  );
};

export default Container;
