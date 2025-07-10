"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { ClientProfileSetup } from "./ClientProfileSetup";
import { ArtisanProfileSetup } from "./ArtisanProfileSetup";

type Props = {};

const ProfileSetupContent = (props: Props) => {
  const params = useSearchParams();
  const role = params.get("role");
  const client = role === "client";
  const artisan = role === "artisan";

  return (
    <>
      {client && <ClientProfileSetup />}
      {artisan && <ArtisanProfileSetup />}
    </>
  );
};

export default ProfileSetupContent;
