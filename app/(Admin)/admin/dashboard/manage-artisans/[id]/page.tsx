"use client";
import { useArtisans } from "@/api/crud/artisans";
import ArtisanProfileDetails from "@/components/ArtisanProfileDetails";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Descriptions } from "@/components/shared/Headings";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const ArtisanDetails = (props: Props) => {
  const params = useParams();
  const artisanId = params?.id as string;

  const { getAllArtisan } = useArtisans();
  const { data: artisans = [], isLoading } = getAllArtisan();

  const selectedArtisan = artisans?.find(
    (artisan) => artisan?._id === artisanId
  );

  const isVerified = selectedArtisan?.user?.isVerified === true;

  if (isLoading)
    return <p className="text-white text-center mt-20 ">Loading...</p>;
  if (!selectedArtisan)
    return <p className="text-white text-center mt-20">Artisan not found</p>;

  console.log(selectedArtisan, "selected");

  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Artisan Details" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-end items-center gap-4">
          <CustomButton label="View KYC" className="rounded-[10px] h-[37px]" />
          <CustomButton
            label="Activate"
            className="rounded-[10px] bg-[#1F873B]"
          />
          <CustomButton
            label="Deactivate"
            className="rounded-[10px] bg-[#AE2525]"
          />
        </div>
        <div className="bg-primary rounded-[10px] px-12 py-5 flex justify-between items-center">
          <ArtisanProfileDetails selectedArtisan={selectedArtisan} />
          <div className="flex items-center gap-3">
            <p
              className={`${
                isVerified
                  ? "bg-[#1F873B] text-white"
                  : "bg-[#FFD6D0] text-[#AE2525]"
              }   rounded-[10px] flex items-center justify-center px-3 py-1`}
            >
              {isVerified ? "Verified" : "Pending"}
            </p>
            {isVerified === false && (
              <>
                <div className=" h-9 border bg-white" />
                <p className="bg-[#FFD6D0] text-[#AE2525] rounded-[10px] flex items-center justify-center px-3 py-1">
                  No Verification Done
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanDetails;
