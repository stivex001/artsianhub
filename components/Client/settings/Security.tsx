import { CustomButton } from "@/components/clickable/CustomButton";
import React, { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

type Props = {};

export const Security = (props: Props) => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Account Protection Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full" />
          <h3 className="text-sm font-semibold text-paragrah uppercase tracking-wide">
            Account Protection
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-medium text-paragrah mb-1">
                Change Password
              </h4>
              <p className="text-sm text-[#667185]">
                Update your password regularly to keep your account secure
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <CustomButton
              onClick={() => setIsChangePasswordOpen(true)}
              label="Change Password"
              variant="transparent"
              className="w-full sm:w-auto border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-orange-400 to-red-500 rounded-full" />
          <h3 className="text-sm font-semibold text-paragrah uppercase tracking-wide">
            Danger Zone
          </h3>
        </div>

        <div className="space-y-3">
          {/* Deactivate Account */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-orange-50/50 to-white rounded-xl border border-orange-100 hover:border-orange-200 transition-all duration-300">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2.5 rounded-lg bg-orange-100 text-orange-600 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-medium text-paragrah mb-1">
                  Deactivate Account
                </h4>
                <p className="text-sm text-[#667185]">
                  Temporarily disable your account. You can reactivate it at any
                  time by logging in again.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <CustomButton
                label="Deactivate"
                variant="transparent"
                className="w-full sm:w-auto border border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
              />
            </div>
          </div>

          {/* Delete Account */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-red-50/50 to-white rounded-xl border border-red-100 hover:border-red-200 transition-all duration-300">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2.5 rounded-lg bg-red-100 text-red-600 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-medium text-paragrah mb-1">
                  Delete Account
                </h4>
                <p className="text-sm text-[#667185]">
                  This will permanently remove your account and all associated
                  data.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <CustomButton
                label="Delete Account"
                variant="danger"
                className="w-full sm:w-auto shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
};
