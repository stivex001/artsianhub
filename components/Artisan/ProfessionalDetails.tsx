import { ArtisanDetails } from "@/api/crud/artisans";
import React from "react";
import { CustomButton } from "../clickable/CustomButton";

type Props = {
  selectedArtisan: ArtisanDetails;
};

const documents = [
  { label: "Certifications/License" },
  { label: "Government-Issued ID" },
  { label: "Proof of Address" },
  { label: "Portfolio" },
  { label: "Add Customer Reference" },
];

const ProfessionalDetails = ({ selectedArtisan }: Props) => {
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
        {documents?.map((doc, index) => (
          <div key={index} className=" flex flex-col gap-1.5">
            <p className="text-primary font-semibold">
              {doc.label}
            </p>
            <div className="flex  gap-0.5">
              <div className="w-[132px] h-40 border border-black rounded-[10px] overflow-hidden flex justify-center items-center ">
                <CustomButton label="View" className="rounded-[10px] h-6" />
              </div>

              <div className="flex flex-col gap-3 justify-end">
                <CustomButton label="Approve" className="w-24 rounded-[10px] h-6" />
                <CustomButton
                  label="Reject"
                  className="w-24 rounded-[10px] h-6 bg-[#AE2525]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalDetails;
