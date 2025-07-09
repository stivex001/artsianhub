import ProfileSetupLayout from "@/components/Artisan/auth/ProfieSetupLayout";
import React from "react";

type Props = {};

const ProfileSetup = (props: Props) => {
  return (
    <ProfileSetupLayout
      title="Let’s Personalize Your Experience"
      desc="Add a few details to help us connect you with the right artisans near you. This only takes a minute."
    >
      <form>
        <div className="flex flex-col gap-5">profile</div>
      </form>
    </ProfileSetupLayout>
  );
};

export default ProfileSetup;
