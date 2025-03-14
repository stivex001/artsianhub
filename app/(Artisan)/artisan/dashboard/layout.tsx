import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ArtisanLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <div>sidebar</div>
      <div>{children}</div>
    </div>
  );
};
