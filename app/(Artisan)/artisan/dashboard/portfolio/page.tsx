"use client";

import { CreateProjectModal } from "@/components/Artisan/portfolio/CreateProjectModal";
import { AddIcon } from "@/components/assets/icons/ModalIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import { mockPortfolioItems } from "@/components/Client/data";
import { PortfolioCard } from "@/components/Client/PortfolioCard";
import { Descriptions } from "@/components/shared/Headings";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";

const portfolioItems = mockPortfolioItems;

const Portfolio = () => {
  const router = useRouter();
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);

  const closeModal = () => setIsModalProjectOpen(false);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Descriptions
          title="Projects"
          desc="Here’s a peek at my past work. From small fixes to full jobs, I put in the same effort every time. "
        />
        <CustomButton
          icon={AddIcon}
          label=" Add a project"
          className="w-fit !rounded-xl !px-4"
           onClick={() => setIsModalProjectOpen(true)}
           type="button"
        />
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems?.map((item) => (
            <PortfolioCard key={item.id} item={item} showDate />
          ))}
        </div>
      </div>

      <CreateProjectModal
        isOpen={isModalProjectOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Portfolio;
