import React, { Suspense } from "react";
import OtpContent from "@/components/Artisan/auth/Otp";

type Props = {};

const OTP = (props: Props) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <OtpContent />
    </Suspense>
  );
};

export default OTP;
