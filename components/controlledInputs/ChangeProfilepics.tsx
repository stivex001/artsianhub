import React from "react";
import { CameraIcon, NoImageIcon } from "../assets/icons/SvgIcons";

type ChangeProfileProps = {
  setSelectedFile: (value: File) => void;
  selectedFile: File | null;
};

export const ChangeProfilepics = ({ setSelectedFile,selectedFile }: ChangeProfileProps) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-[#F9F9FB] w-[148px] p-6">
      <label className="text-sm font-medium text-gray-700 self-start">
        Profile Photo
      </label>
      <div className="relative">
        <div className="w-24 h-24 rounded-full  flex items-center justify-center overflow-hidden">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <div className="mt-6">
                <NoImageIcon />
              </div>
            </div>
          )}
        </div>
        <label
          htmlFor="photo-upload"
          className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
        >
          <CameraIcon />
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};
