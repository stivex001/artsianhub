"use client";

import React, { useState } from "react";
import { Descriptions } from "@/components/shared/Headings";
import { DocsUploader } from "@/components/controlledInputs/DocsUploader";
import { CustomButton } from "@/components/clickable/CustomButton";
import { useArtisans } from "@/api/crud/artisans";
import { toast } from "sonner";

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

  const { updateArtisanKyc, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const { mutate: kycUpdate, isPending } = updateArtisanKyc;

  const handleFileUpload =
    (category: keyof UploadedFiles) => (file: File | null) => {
      setUploadedFiles((prev) => ({
        ...prev,
        [category]: file,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    const formData = new FormData();

    if (uploadedFiles.governmentId1)
      formData.append("govtIdFront", uploadedFiles.governmentId1);
    if (uploadedFiles.governmentId2)
      formData.append("govtIdBack", uploadedFiles.governmentId2);
    if (uploadedFiles.professionalCert)
      formData.append("certification", uploadedFiles.professionalCert);
    if (uploadedFiles.customerRef)
      formData.append("customerReference", uploadedFiles.customerRef);

    kycUpdate(formData, {
      onSuccess: (response: any) => {
        toast.success(response?.message || "KYC Uploaded Successfully");
        refetch();
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong");
        console.error("KYC Upload Error:", error);
      },
    });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <Descriptions
        title="Verify Your Identity (KYC)"
        desc="Upload a valid ID or document to build trust and unlock full access. Verified artisans get more job opportunities."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DocsUploader
          title="Government-Issued ID Front"
          description="For identity verification"
          acceptedTypes=".png,.jpg,.jpeg,.pdf"
          maxSize={10}
          onFileUpload={handleFileUpload("governmentId1")}
        />

        <DocsUploader
          title="Government-Issued ID Back"
          description="Back of ID or utility bill"
          acceptedTypes=".png,.jpg,.jpeg,.pdf"
          maxSize={10}
          onFileUpload={handleFileUpload("governmentId2")}
        />

        <DocsUploader
          title="Professional Certifications"
          description="Certificates or licenses (if any)"
          acceptedTypes=".png,.jpg,.jpeg,.pdf"
          maxSize={10}
          onFileUpload={handleFileUpload("professionalCert")}
        />

        <DocsUploader
          title="Customer References"
          description="Testimonial or past client proof"
          acceptedTypes=".png,.jpg,.jpeg,.pdf"
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
          isLoading={isPending}
        />
      </div>
    </form>
  );
};

export default KYC;
