import ProfileSetupContent from "@/components/Artisan/auth/ProfileSetupContent";
import { Loader } from "@/components/Loader";
import React, { Suspense } from "react";

type Props = {};

const ProfileSetup = (props: Props) => {
  return (
    <Suspense fallback={<Loader />}>
      <ProfileSetupContent />
    </Suspense>
  );
};

export default ProfileSetup;
