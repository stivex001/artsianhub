"use client";
import React from "react";
import { CustomButton } from "../clickable/CustomButton";

type Props = {
  label: string;
  fileUrl?: string;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
  isLoading?: boolean;
};

const DocumentCard = ({
  label,
  fileUrl,
  onView,
  onApprove,
  onReject,
  isLoading
}: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-primary font-semibold">{label}</p>
      <div className="flex gap-0.5">
        <div className="w-[132px] h-40 border border-black rounded-[10px] overflow-hidden flex justify-center items-center">
          {fileUrl ? (
            <CustomButton
              label="View"
              className="rounded-[10px] h-6"
              onClick={onView}
              
            />
          ) : (
            <p className="text-xs text-gray-500 text-center px-2">
              No document
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 justify-end">
          <CustomButton
            label="Approve"
            className="w-24 rounded-[10px] h-6"
            onClick={onApprove}
            isLoading={isLoading}
          />
          <CustomButton
            label="Reject"
            className="w-24 rounded-[10px] h-6 bg-[#AE2525]"
            onClick={onReject}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
