import { CustomButton } from "@/components/clickable/CustomButton";
import { Descriptions } from "@/components/shared/Headings";
import React from "react";

type Props = {};

const ArtisanDetails = (props: Props) => {
  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Artisan Details" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-end items-center gap-4">
          <CustomButton label="View KYC" className="rounded-[10px] h-[37px]" />
          <CustomButton label="Activate" className="rounded-[10px] bg-[#1F873B]" />
          <CustomButton label="Deactivate" className="rounded-[10px] bg-[#AE2525]" />
        </div>
        <div className="bg-primary rounded-[10px] px-12 py-5">hgyugyugy</div>
      </div>
    </section>
  );
};

export default ArtisanDetails;
