import React, { Suspense } from "react";
import ArtisanAuthLayout from "@/components/Artisan/auth/ArtisanAuthLayout";
import SignUpTabs from "@/components/Artisan/auth/SignUpTabs";

const ArtisanRegister = () => {
  return (
    <ArtisanAuthLayout>
      <div className="w-11/12 lg:w-[600px] mx-auto px-3 lg:px-8 pt-3 pb-8 bg-white shadow-dropShadow rounded-[10px]">
        <h1 className="font-semibold text-xl text-center ">
          Create your Account
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpTabs />
        </Suspense>
      </div>
    </ArtisanAuthLayout>
  );
};

export default ArtisanRegister;
