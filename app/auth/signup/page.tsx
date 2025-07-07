"use client";
import React, { Suspense } from "react";
import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import ClientSignUp from "@/components/Artisan/auth/ClientSignUp";
import { useParams } from "next/navigation";
import { AuthTitle } from "@/components/auth/AuthTitle";

const Register = () => {
  const searchParams = useParams();

  return (
    <AuthLayout>
      <div className="w-full lg:w-[516px] mx-auto px-4  bg-white flex flex-col gap-10">
        <AuthTitle
          title="Create an Account"
          desc="Enter your email and password"
        />
        <Suspense fallback={<div>Loading...</div>}>
          <ClientSignUp />
        </Suspense>
      </div>
    </AuthLayout>
  );
};

export default Register;
