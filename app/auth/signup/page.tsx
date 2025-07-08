import React, { Suspense } from "react";
import RegisterContent from "@/components/Artisan/auth/RegisterContent";

const Register = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
};

export default Register;
