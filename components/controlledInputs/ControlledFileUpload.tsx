import React, { useState, useRef } from "react";
import { useController, Control } from "react-hook-form";
import { Label } from "../ui/label";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import upload from "@/components/assets/images/Upload.png";

interface Accept {
  [key: string]: string[];
}

export interface FileWithPreview extends File {
  preview: string;
}

type FileUploadInputProps = {
  name: string;
  label?: string;
  acceptTypes?: Accept;
  maxFiles?: number;
  maxSizeInMB?: number;
  control: Control<any>;
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
}: FileUploadInputProps) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    let newFiles: FileWithPreview[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (files.length + newFiles.length >= maxFiles) break;

      if (file.size / 1024 / 1024 > maxSizeInMB) {
        toast.error(`File ${file.name} exceeds the ${maxSizeInMB}MB limit.`);
        continue;
      }

      const fileWithPreview: FileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      newFiles.push(fileWithPreview);
    }

    const updatedFiles = [...files, ...newFiles];

    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  // console.log(files.map(file => ({
  //   name: file.name,
  //   size: file.size,
  //   type: file.type,
  //   preview: file.preview,
  // })), "files");

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles); // Ensures form updates correctly
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={name}
          className="text-base text-center font-semibold capitalize"
        >
          {label}
        </Label>
      )}
      <div className="w-full border-b border-gray-300 rounded-[10px] p-4 flex flex-col items-center justify-center cursor-pointer">
        <Image
          src={upload}
          alt="Upload"
          width={40}
          height={40}
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          id={name}
          multiple
          accept={Object.keys(acceptTypes).join(",")}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <div className=" grid grid-cols-3 gap-5 self-end">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                {file?.type?.startsWith("image/") ? (
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={36}
                    height={36}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md">
                    <p className="text-xs text-gray-600">{file.name}</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
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
