import { CustomButton } from "@/components/clickable/CustomButton";
import React, { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

type Props = {};

export const Security = (props: Props) => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-paragrah mb-2">
            Change Password
          </h3>
          <p className="text-sm text-[#667185]">
            Update your password regularly to keep your account secure
          </p>
        </div>
        <CustomButton
          onClick={() => setIsChangePasswordOpen(true)}
          label="Change Password"
          variant="transparent"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-paragrah mb-2">
            Deactivate Account
          </h3>
          <p className="text-sm text-[#667185]">
            Temporarily disable your account. You can reactivate it at any time
            by logging in again.
          </p>
        </div>
        <CustomButton label="Deactivate Account" variant="transparent" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-paragrah mb-2">
            Delete Account
          </h3>
          <p className="text-sm text-[#667185]">
            his will permanently remove your account and all associated data.
          </p>
        </div>
        <CustomButton label="Delete Account" variant="danger" />
      </div>
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
};
