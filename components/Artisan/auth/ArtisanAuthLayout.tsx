import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArtisanAuthLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-7/12 mx-auto min-h-screen">
      <section className="w-full my-24 bg-hero bg-cover bg-no-repeat object-top h-full rounded-[10px] flex py-9 justify-center ">
        {children}
      </section>
    </div>
  );
};

export default ArtisanAuthLayout;
