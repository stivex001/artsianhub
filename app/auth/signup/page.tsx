"use client";
import React, { Suspense } from "react";
import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import ClientSignUp from "@/components/Artisan/auth/ClientSignUp";
import { useParams } from "next/navigation";
import { AuthTitle } from "@/components/auth/AuthTitle";
import custauth from "@/components/assets/images/SignCustomers.png";

const Register = () => {
  const searchParams = useParams();

  return (
    <AuthLayout
      authImg={custauth}
      title="Welcome to ArtisanHub"
      desc="Connect with skilled artisans and grow your business with our trusted platform"
    >
      <div className="flex flex-col gap-10">
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
