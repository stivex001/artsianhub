"use client";

import React, { useState } from "react";
import { Descriptions } from "@/components/shared/Headings";
import { DocsUploader } from "@/components/controlledInputs/DocsUploader";
import { CustomButton } from "@/components/clickable/CustomButton";

interface UploadedFiles {
  governmentId1: File | null;
  professionalCert: File | null;
  governmentId2: File | null;
  customerRef: File | null;
}

const KYC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    governmentId1: null,
    professionalCert: null,
    governmentId2: null,
    customerRef: null,
  });

  const handleFileUpload =
    (category: keyof UploadedFiles) => (file: File | null) => {
      setUploadedFiles((prev) => ({
        ...prev,
        [category]: file,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Uploaded files:", uploadedFiles);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <Descriptions
        title="Verify Your Identity (KYC)"
        desc="Upload a valid ID or document to build trust and unlock full access. Verified artisans get more job opportunities."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Government-Issued ID (First) */}
        <DocsUploader
          title="Government-Issued ID"
          description="For identity verification"
          acceptedTypes=".svg,.png,.jpg,.jpeg,.gif"
          maxSize={10}
          onFileUpload={handleFileUpload("governmentId1")}
        />

        {/* Professional Certifications */}
        <DocsUploader
          title="Professional Certifications"
          description="For identity verification"
          acceptedTypes=".svg,.png,.jpg,.jpeg,.gif"
          maxSize={10}
          onFileUpload={handleFileUpload("professionalCert")}
        />

        {/* Government-Issued ID (Second) */}
        <DocsUploader
          title="Government-Issued ID"
          description="Recent utility bill or official correspondence"
          acceptedTypes=".svg,.png,.jpg,.jpeg,.gif"
          maxSize={10}
          onFileUpload={handleFileUpload("governmentId2")}
        />

        {/* Customer References */}
        <DocsUploader
          title="Customer References"
          description="If applicable"
          acceptedTypes=".svg,.png,.jpg,.jpeg,.gif"
          maxSize={10}
          onFileUpload={handleFileUpload("customerRef")}
        />
      </div>

      <div className="w-fit">
        <CustomButton
          type="submit"
          label="Save Changes"
          className="w-full rounded-[10px]"
          variant="primary"
        />
      </div>
    </form>
  );
};

export default KYC;
