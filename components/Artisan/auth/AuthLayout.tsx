import Image from "next/image";
import React, { ReactNode } from "react";
import custauth from "@/components/assets/images/cusauth.png"

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="p-6 flex min-h-screen items-center justify-center">
      <div className="hidden lg:block flex-1">
        <Image src={custauth} alt="bg" />
      </div>
      <section className="flex-1">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
