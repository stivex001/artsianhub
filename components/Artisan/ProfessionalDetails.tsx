"use client";
import { ArtisanDetails } from "@/api/crud/artisans";
import React, { useState } from "react";
import DocumentCard from "./DocumentCard";
import Image from "next/image";
import { CustomButton } from "../clickable/CustomButton";

type Props = {
  selectedArtisan: ArtisanDetails;
};

const documents = [
  { label: "Certifications/License", key: "professionalCertification" },
  { label: "Government-Issued ID", key: "governmentIssuedID" },
  { label: "Proof of Address", key: "proofOfAddress" },
  { label: "Portfolio", key: "portfolio" },
  { label: "Add Customer Reference", key: "customerReference" },
];

const ProfessionalDetails = ({ selectedArtisan }: Props) => {
  const [activeDocUrl, setActiveDocUrl] = useState<string | null>(null);
  const [activeDocType, setActiveDocType] = useState<string | null>(null);

  const handleViewDocument = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase();
    setActiveDocUrl(url);
    setActiveDocType(extension || null);
  };

  return (
    <section className="flex flex-col gap-6 px-4 py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-primary">
          Professional Details
        </h1>
        <div className="w-full border border-primary my-2" />
      </div>

      {/* Form Fields */}
      <div className="flex items-center gap-16">
        <div className="flex flex-col">
          <label className="block text-primary mb-1">
            Trader/Specialization
          </label>
          <input
            type="text"
            value={selectedArtisan?.specialization}
            readOnly
            className="w-full border border-black rounded-[10px] px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-primary mb-1">Years of Experience</label>
          <input
            type="text"
            value={selectedArtisan?.yearsOfExperience}
            readOnly
            className="w-20 border border-black rounded-[10px] px-3 py-2"
          />
        </div>
      </div>

      {/* Documents */}
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents?.map((doc, index) => {
          const fileData = selectedArtisan?.[
            doc?.key as keyof ArtisanDetails
          ] as { url?: string } | undefined;
          const fileUrl = fileData?.url;

          console.log(fileUrl, "fileUrl");

          return (
            <DocumentCard
              key={index}
              label={doc.label}
              fileUrl={fileUrl}
              onView={() => fileUrl && handleViewDocument(fileUrl)}
            />
          );
        })}
      </div>
      {activeDocUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-secondary py-8 px-4 rounded-[10px] shadow-cardShadow w-1/2 max-w-xl relative">
            <button
              onClick={() => {
                setActiveDocUrl(null);
                setActiveDocType(null);
              }}
              className="absolute top-2 right-2 text-red-600 text-xl"
            >
              ✕
            </button>

            {["png", "jpg", "jpeg", "gif", "webp"].includes(
              activeDocType || ""
            ) ? (
              <Image
                src={activeDocUrl}
                alt="Document"
                className="max-h-[80vh] w-auto mx-auto"
                width={500}
                height={500}
              />
            ) : activeDocType === "pdf" ? (
              <iframe
                src={activeDocUrl}
                className="w-full h-[80vh] rounded"
                title="PDF Viewer"
              ></iframe>
            ) : activeDocType === "docx" || activeDocType === "doc" ? (
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                  activeDocUrl
                )}&embedded=true`}
                className="w-full h-[80vh] rounded"
                title="Word Doc Viewer"
              ></iframe>
            ) : (
              <p className="text-center text-gray-700">
                Unsupported file format
              </p>
            )}
            <div className="flex items-center gap-4 justify-end mt-7">
              <CustomButton
                label="Approve"
                className="w-24 rounded-[10px] h-6"
              />
              <CustomButton
                label="Reject"
                className="w-24 rounded-[10px] h-6 bg-[#AE2525]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalDetails;
