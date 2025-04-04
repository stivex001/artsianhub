import OTPPage from "@/components/Artisan/auth/OtpPage";
import React, { Suspense } from "react";

type Props = {};

const OTP = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPPage />
    </Suspense>
  );
};

export default OTP;
