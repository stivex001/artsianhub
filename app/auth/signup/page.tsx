"use client";
import React, { Suspense } from "react";
import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import ClientSignUp from "@/components/Artisan/auth/ClientSignUp";
import { useParams } from "next/navigation";

const Register = () => {
  const searchParams = useParams();

  return (
    <AuthLayout>
      <div className="w-11/12 lg:w-[600px] mx-auto px-3 lg:px-8 pt-3 pb-8 bg-white">
        <div>
          <h1 className="font-semibold text-xl text-center ">
            Create your Account
          </h1>
          <p className="text-body text-sm">Enter your email and password</p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientSignUp />
        </Suspense>
      </div>
    </AuthLayout>
  );
};

export default Register;
