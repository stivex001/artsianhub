import ControlledInput from "@/components/controlledInputs/ControlledInput";
import React from "react";

type Props = {
  control: any;
};

const EditProfile = ({ control }: Props) => {
  return (
    <div className=" w-[50%] mx-auto">
      <h1 className="text-sm font-semibold mb-5">
        Personal Information Update
      </h1>
      <div className="flex flex-col gap-3 max-w-[322px]">
        <ControlledInput
          name="name"
          control={control}
          placeholder=""
          type="text"
          label="Name"
          variant="tertiary"
        />
        <ControlledInput
          name="email"
          control={control}
          placeholder=""
          type="email"
          label="Email"
          variant="tertiary"
        />
        <ControlledInput
          name="phone"
          control={control}
          placeholder=""
          type="email"
          label="Phone Number"
          variant="tertiary"
        />
        <ControlledInput
          name="Specification"
          control={control}
          placeholder=""
          type="text"
          label="Specification"
          variant="tertiary"
        />
        <div className="flex flex-col lg:flex-row gap-5">
          <ControlledInput
            name="dob"
            control={control}
            placeholder=""
            type="text"
            label="Date of Birth"
            variant="tertiary"
          />
          <ControlledInput
            name="gender"
            control={control}
            placeholder=""
            type="text"
            label="Gender"
            variant="tertiary"
          />
        </div>
        <ControlledInput
          name="address"
          control={control}
          placeholder=""
          type="text"
          label="Residential Address"
          variant="tertiary"
        />
      </div>
    </div>
  );
};

export default EditProfile;
