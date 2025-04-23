"use client";
import React from "react";
import { CustomButton } from "../clickable/CustomButton";

type Props = {
  label: string;
  fileUrl?: string;
  onView: () => void;
};

const DocumentCard = ({ label, fileUrl, onView }: Props) => {
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
          <CustomButton label="Approve" className="w-24 rounded-[10px] h-6" />
          <CustomButton
            label="Reject"
            className="w-24 rounded-[10px] h-6 bg-[#AE2525]"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
