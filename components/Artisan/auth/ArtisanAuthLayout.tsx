import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArtisanAuthLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-10/12 lg:w-7/12 mx-auto min-h-screen mt-3">
      <section className="w-full my-24 bg-hero bg-center bg-cover bg-no-repeat object-left-top lg:object-top h-full rounded-[10px] flex py-9 justify-center ">
        {children}
      </section>
    </div>
  );
};

export default ArtisanAuthLayout;
