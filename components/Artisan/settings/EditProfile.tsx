import { gender } from "@/app/auth/signup/page";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import React from "react";

type Props = {
  control: any;
  isEditing: boolean;
};

const EditProfile = ({ control, isEditing }: Props) => {
  return (
    <div className="w-[50%] mx-auto">
      <h1 className="text-sm font-semibold mb-5">
        Personal Information Update
      </h1>
      <div className="flex flex-col gap-3 max-w-[322px]">
        <ControlledInput
          name="firstName"
          control={control}
          type="text"
          label="First Name"
          variant="tertiary"
          readOnly={!isEditing}
        />
        <ControlledInput
          name="lastName"
          control={control}
          type="text"
          label="Last Name"
          variant="tertiary"
          readOnly={!isEditing}
        />
        <ControlledInput
          name="email"
          control={control}
          type="email"
          label="Email"
          variant="tertiary"
          readOnly={!isEditing}
        />
        <ControlledInput
          name="phoneNumber"
          control={control}
          type="text"
          label="Phone Number"
          variant="tertiary"
          readOnly={!isEditing}
        />
        <ControlledInput
          name="specialization"
          control={control}
          type="text"
          label="Specialization"
          variant="tertiary"
          readOnly={!isEditing}
        />
        <div className="flex flex-col lg:flex-row gap-5">
          <ControlledInput
            name="dateOfBirth"
            control={control}
            type="date"
            label="Date of Birth"
            variant="tertiary"
            readOnly={!isEditing}
          />
          <div className="w-full">
            <ControlledSelect
              name="gender"
              label="Gender"
              options={gender}
              control={control}
              variant="tertiary"
              className="h-12"
              
            />
          </div>
        </div>
        <ControlledInput
          name="residentialAddress"
          control={control}
          type="text"
          label="Residential Address"
          variant="tertiary"
          readOnly={!isEditing}
        />
      </div>
    </div>
  );
};

export default EditProfile;
