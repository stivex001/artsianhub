"use client";

import ServiceList from "@/components/Artisan/servicelist/ServiceList";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Portfolio = () => {
  const pathname = usePathname();
  const portfolioPage = pathname == "artisan/dashboard/portfolio";

  return (
    <section className="flex flex-col">
      <Descriptions
        title="Service List"
        desc="Portfolio Showing Casing Previous work "
      />
      <div className="flex items-center justify-between gap-6 mt-10 mb-2.5 px-3">
        <div className="flex items-center gap-4">
          <button
            className={`pb-2 text-base text-secondary ${
              portfolioPage ? "border-b border-blue-600" : ""
            }`}
          >
            Service list
          </button>
        </div>
        <Link
          href="/artisan/dashboard/portfolio/create_service"
          className={`pb-2 text-base text-secondary `}
        >
          Create Services
        </Link>
      </div>
      <Wrapper className="shadow-cardShadow px-3 py-8 border-white">
        <ServiceList />
      </Wrapper>
    </section>
  );
};

export default Portfolio;
