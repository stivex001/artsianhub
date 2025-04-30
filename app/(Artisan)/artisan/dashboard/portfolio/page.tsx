import ArtisanPictures from "@/components/Artisan/portfolio/ArtisanPictures";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

const Portfolio = (props: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <Descriptions
        title="Service List"
        desc="Portfolio Showing Casing Previous work "
      />
      <Wrapper className="w-full py-5 px-8 flex gap-20 ">
        <div className="w-full flex flex-col gap-12">
          <ArtisanPictures />
          <ArtisanPictures />
        </div>
        {/* <div className="">
          <CustomButton
            label="Change Subscription play to upload more images"
            className="rounded-[10px] h-[45px]"
          />
        </div> */}
      </Wrapper>
    </section>
  );
};

export default Portfolio;
