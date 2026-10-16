import React, { Suspense } from "react";
import OtpPage from "@/components/Artisan/auth/OtpPage";
import { Loader } from "@/components/Loader";

type Props = {};

const VerifyEmail = (props: Props) => {
  return (
    <Suspense fallback={<Loader />}>
      <OtpPage />
    </Suspense>
  );
};

export default VerifyEmail;
