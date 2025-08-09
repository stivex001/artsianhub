"use client";
import React, { Suspense } from "react";
import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import ClientSignUp from "@/components/Artisan/auth/ClientSignUp";
import { useSearchParams } from "next/navigation";
import { AuthTitle } from "@/components/auth/AuthTitle";
import custauth from "@/components/assets/images/SignCustomers.png";
import artisanauth from "@/components/assets/images/SignArtisans.png";

const RegisterContent = () => {
  const params = useSearchParams();
  const role = params.get("role");
  const client = role === "client";

  return (
    <AuthLayout
      authImg={client ? custauth : artisanauth}
      title={
        client ? "Welcome to ArtisansHub" : "Join ArtisansHub and Get Connected"
      }
      desc={
        client
          ? "Connect with skilled artisans and grow your business with our trusted platform"
          : "Join the professional artisan community"
      }
    >
      <div className="flex flex-col gap-10">
        <AuthTitle
          title="Create an Account"
          desc="Enter your email and password"
        />
        <ClientSignUp role={role} />
      </div>
    </AuthLayout>
  );
};

export default RegisterContent;
