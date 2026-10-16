import ResetPasswordContent from "@/components/Artisan/auth/ResetPasswordContent";
import { Loader } from "@/components/Loader";
import React, { Suspense } from "react";

type Props = {};

const ResetPassword = (props: Props) => {
  return (
    <Suspense fallback={<Loader />}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
