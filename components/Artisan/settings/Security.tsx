import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { Descriptions } from "@/components/shared/Headings";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";

type Props = {};

const fields: Field[] = [
  {
    name: "password",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
  {
    name: "newPassword",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
];

const Security = (props: Props) => {
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  return (
    <form className="flex flex-col gap-10">
      <Descriptions
        title="Account Settings"
        desc="Manage your personal details, services, documents, and preferences. You can update them anytime."
      />
      <div className="space-y-6 w-1/2">
        <div className="flex flex-col gap-5">
          <ControlledInput
            name="password"
            control={control}
            placeholder="Enter old password"
            type="password"
            label="Old Password"
            variant="primary"
            rules={{ required: true }}
          />
          <ControlledInput
            name="newPassword"
            control={control}
            placeholder="Enter new password"
            type="password"
            label="New Password"
            variant="primary"
            rules={{ required: true }}
          />
        </div>
        <div className="w-fit">
          <CustomButton
            type="submit"
            label="Save Password"
            className="w-full rounded-xl"
            variant="primary"
          />
        </div>
      </div>
    </form>
  );
};

export default Security;
