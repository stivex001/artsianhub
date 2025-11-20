import ProfileSetupContent from "@/components/Artisan/auth/ProfileSetupContent";
import { Loader } from "@/components/Loader";
import React, { Suspense } from "react";

const ProfileSetup = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ProfileSetupContent />
    </Suspense>
  );
};

export default ProfileSetup;
