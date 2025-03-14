import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArtisanLayout = ({ children }: Props) => {
  return <div className="">{children}</div>;
};

export default ArtisanLayout;
