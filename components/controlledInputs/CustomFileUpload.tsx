"use client"
import React, { ChangeEvent, ReactNode, useRef } from "react";

interface UploadFileComponentProps {
  files: File[];
  multiple?: boolean;
  accept?: string;
  isLoading?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  render: (props: {
    files: File[];
    openFileDialog: () => void;
    removeFiles: () => void;
    isLoading: boolean;
  }) => ReactNode;
}

export const CustomFileUpload: React.FC<UploadFileComponentProps> = ({
  files,
  multiple = false,
  accept = "",
  isLoading = false,
  onChange,
  onRemove,
  render,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const removeFiles = () => {
    if (onRemove) onRemove();
  };

  return (
    <>
      {render({ files, openFileDialog, removeFiles, isLoading })}
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={onChange}
        multiple={multiple}
        accept={accept}
      />
    </>
  );
};
