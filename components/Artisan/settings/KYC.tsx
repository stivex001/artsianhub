"use client";

import React, { useState } from "react";
import { DocsUploader } from "@/components/controlledInputs/DocsUploader";
import { CustomButton } from "@/components/clickable/CustomButton";
import { useArtisans } from "@/apis/crud/artisans";
import { toast } from "sonner";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

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
      setUploadedFiles((prev) => ({ ...prev, [category]: file }));
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

  const uploadedCount = Object.values(uploadedFiles).filter(Boolean).length;

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      {/* ── Trust banner ─────────────────────────────────────────── */}
      <div className="flex items-start gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-[#02198B]/[0.04] to-[#F0C422]/[0.05] border border-[#02198B]/[0.08]">
        <div className="w-10 h-10 rounded-xl bg-[#02198B] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">
            Identity Verification (KYC)
          </p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Verified artisans earn more trust, appear higher in search, and
            unlock priority booking. Your documents are kept private and secure.
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              "Priority placement",
              "Client trust badge",
              "More bookings",
            ].map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#02198B]"
              >
                <CheckCircle2 className="w-3 h-3" />
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Documents section ────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-0.5 h-3.5 rounded-full bg-[#02198B]" />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Required Documents
            </p>
          </div>
          {uploadedCount > 0 && (
            <span className="text-xs font-semibold text-[#02198B] bg-[#02198B]/[0.06] px-2.5 py-1 rounded-full">
              {uploadedCount} / 4 uploaded
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <DocsUploader
            title="Government-Issued ID (Front)"
            description="Clear photo or scan of the front of your ID"
            acceptedTypes=".png,.jpg,.jpeg,.pdf"
            maxSize={10}
            onFileUpload={handleFileUpload("governmentId1")}
          />
          <DocsUploader
            title="Government-Issued ID (Back)"
            description="Back side of your ID or a utility bill"
            acceptedTypes=".png,.jpg,.jpeg,.pdf"
            maxSize={10}
            onFileUpload={handleFileUpload("governmentId2")}
          />
          <DocsUploader
            title="Professional Certifications"
            description="Relevant trade certificates or licences"
            acceptedTypes=".png,.jpg,.jpeg,.pdf"
            maxSize={10}
            onFileUpload={handleFileUpload("professionalCert")}
          />
          <DocsUploader
            title="Customer References"
            description="Testimonial letter or past client proof"
            acceptedTypes=".png,.jpg,.jpeg,.pdf"
            maxSize={10}
            onFileUpload={handleFileUpload("customerRef")}
          />
        </div>
      </div>

      {/* ── Save footer ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          PNG, JPG or PDF · Max 10 MB per file
        </p>
        <CustomButton
          type="submit"
          label="Submit for Review"
          className="rounded-xl"
          variant="primary"
          isLoading={isPending}
        />
      </div>
    </form>
  );
};

export default KYC;
