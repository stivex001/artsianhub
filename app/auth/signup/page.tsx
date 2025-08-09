import React, { Suspense } from "react";
import RegisterContent from "@/components/Artisan/auth/RegisterContent";
import { Loader } from "@/components/Loader";

const Register = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RegisterContent />
    </Suspense>
  );
};

export default Register;
