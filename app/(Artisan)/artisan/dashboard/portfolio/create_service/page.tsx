"use client";
import CreateArtisanService from "@/components/Artisan/servicelist/CreateArtisanService";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

const CreateServices = (props: Props) => {
  return (
    <section className="flex flex-col">
      <Descriptions
        title="Service List"
        desc="Portfolio Showing Casing Previous work "
      />
      <Wrapper className="shadow-cardShadow px-3 py-8 border-white">
        <CreateArtisanService />
      </Wrapper>
    </section>
  );
};

export default CreateServices;
