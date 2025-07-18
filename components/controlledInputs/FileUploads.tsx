"use client";

import React from "react";
import { CameraUpload, FileUploadIcon } from "../assets/icons/ModalIcon";

type FileUploadProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
};

export const FileUpload = ({
  files,
  onFilesChange,
  maxFiles = 4,
}: FileUploadProps) => {
  const handleFiles = (newFiles: File[]) => {
    const updated = [...files, ...newFiles].slice(0, maxFiles);
    onFilesChange(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    handleFiles(newFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleFiles(newFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    onFilesChange(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      {files.length === 0 && (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-[300px] bg-[#F9F9FB] flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl cursor-pointer"
        >
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="space-y-2">
            <div className="flex justify-center items-center">
              <FileUploadIcon />
            </div>
            <p className="text-center text-sm text-gray-500">
              Drag and drop or{" "}
              <span className="text-blue-600">Choose file</span> to upload
            </p>
          </div>
        </label>
      )}

      {/* Previews */}
      <div className="grid grid-cols-1 gap-2.5">
        {files[0] && (
          <div className="w-full h-[300px] bg-[#F9F9FB] relative border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={URL.createObjectURL(files[0])}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => removeFile(0)}
              className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[9px]"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2.5">
          {files.slice(1, 4).map((file, index) => (
            <div
              key={file?.name + index}
              className="h-[150px] relative border border-gray-200 rounded-md overflow-hidden flex items-center justify-center"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => removeFile(index + 1)}
                className="absolute top-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[9px]"
              >
                ✕
              </button>
            </div>
          ))}

          {files.length > 0 && files.length < maxFiles && (
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="h-[150px] border border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <CameraUpload />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
