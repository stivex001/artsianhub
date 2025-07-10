import ProfileSetupContent from "@/components/Artisan/auth/ProfileSetupContent";
import React, { Suspense } from "react";

type Props = {};

const ProfileSetup = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileSetupContent />
    </Suspense>
  );
};

export default ProfileSetup;
