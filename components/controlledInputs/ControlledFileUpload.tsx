import React, { useState, useRef, useEffect } from "react";
import { useController, Control } from "react-hook-form";
import { Label } from "../ui/label";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import upload from "@/components/assets/images/Upload.png";

interface Accept {
  [key: string]: string[];
}

type FileUploadInputProps = {
  name: string;
  label?: string;
  acceptTypes?: Accept;
  maxFiles?: number;
  maxSizeInMB?: number;
  control: Control<any>;
  labelClassName?: string;
  multiple?: boolean;
};

export const ControlledFileUpload = ({
  name,
  label,
  acceptTypes = {
    "image/*": [],
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".docx"],
  },
  maxFiles = 3,
  maxSizeInMB = 10,
  control,
  labelClassName,
  multiple = true,
}: FileUploadInputProps) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (!multiple && files.length > 0) break;
      if (files.length + newFiles.length >= maxFiles) break;

      if (file.size / 1024 / 1024 > maxSizeInMB) {
        toast.error(`File ${file.name} exceeds the ${maxSizeInMB}MB limit.`);
        continue;
      }

      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    const updatedPreviews = multiple ? [...previews, ...newPreviews] : newPreviews;

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onChange(updatedFiles); // send only raw files to react-hook-form
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onChange(updatedFiles);
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={name}
          className={`text-base text-center font-semibold capitalize ${labelClassName}`}
        >
          {label}
        </Label>
      )}

      <div
        className="w-full border-b border-gray-300 rounded-[10px] p-4 flex flex-col items-center justify-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Image src={upload} alt="Upload" width={40} height={40} />
        <input
          type="file"
          id={name}
          multiple={multiple}
          accept={Object.keys(acceptTypes).join(",")}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-5 self-end mt-3">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                {file?.type?.startsWith("image/") && previews[index] ? (
                  <Image
                    src={previews[index]}
                    alt={file.name}
                    width={36}
                    height={36}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md text-[10px] text-gray-600 p-1 text-center">
                    {file.name}
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                >
                  <X size={8} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
};
