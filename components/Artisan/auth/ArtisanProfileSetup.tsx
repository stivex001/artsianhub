import React from "react";
import ProfileSetupLayout from "./ProfieSetupLayout";

type Props = {};

export const ArtisanProfileSetup = (props: Props) => {
  return (
    <ProfileSetupLayout
      title="Setup Your Artisan Profile"
      desc="Help customers discover your services by telling us about your skills, service location, and experience. Build trust and start getting booked."
    >
      <form>
        <div className="flex flex-col gap-5">profile</div>
      </form>
    </ProfileSetupLayout>
  );
};
