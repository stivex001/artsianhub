import React, { ChangeEvent, RefObject } from "react";
import { DeleteIcon, Upload } from "lucide-react";
import { CustomButton } from "../clickable/CustomButton";

interface UploadFileComponentProps {
  description: string;
  format: string;
  maxSize: number;
  inputRef: any;
  progress?: number;
  isLoading: boolean;
  files: File[];
  multiple?: boolean;
  isEdit?: boolean;
  accept?: string;
  fileName?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  buttonClick: () => void;
}

export const UploadFileComponent: React.FC<UploadFileComponentProps> = ({
  description,
  format,
  maxSize,
  inputRef,
  progress,
  isLoading,
  files,
  multiple = false,
  isEdit = false,
  accept = "",
  fileName,
  onChange,
  className = "",
  buttonClick,
}) => {
  return multiple ? (
    <div className={`${className} mb-6 flex items-center justify-between`}>
      <div className="flex items-center justify-start gap-2">
        {files.length <= 0 ? (
          <svg
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24.848" r="24" fill="#F0F2F5" />
            <path
              d="M18 22.348C18 19.3105 20.4624 16.848 23.5 16.848..."
              fill="#475367"
            />
          </svg>
        ) : (
          <Upload />
        )}
        <div className="flex flex-col items-start">
          <p className="text-[10px] lg:text-14px text-brandBlack font-medium">
            {files.length <= 0
              ? description
              : `Selected ${files.length} files`}
          </p>
          <p className="text-[8px] lg:text-12px text-textGrey2 ">
            {format} format
            {files.length <= 0 ? `* Max. ${maxSize}MB` : ""}
          </p>
        </div>
      </div>
      {files.length > 0 ? (
        <DeleteIcon onClick={buttonClick} />
      ) : (
        <CustomButton
          label="Upload"
          isLoading={isLoading}
          onClick={() => inputRef.current?.click()}
        />
      )}
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={onChange}
        multiple={multiple}
        accept={accept}
      />
    </div>
  ) : (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        {!fileName ? (
          <svg
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24.848" r="24" fill="#F0F2F5" />
            <path
              d="M18 22.348C18 19.3105 20.4624 16.848 23.5 16.848..."
              fill="#475367"
            />
          </svg>
        ) : (
          <Upload />
        )}
        <div className="flex flex-col items-start">
          <p className="text-[10px] lg:text-14px text-brandBlack font-medium">
            {fileName || description}
          </p>
          <p className="text-[8px] lg:text-12px text-textGrey2 ">
            {format} format * Max. {maxSize}MB
          </p>
        </div>
      </div>
      <CustomButton
        label={fileName ? "Change" : "Upload"}
        isLoading={isLoading}
        onClick={() => inputRef.current?.click()}
      />
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
};
