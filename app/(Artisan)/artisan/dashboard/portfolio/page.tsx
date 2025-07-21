"use client";

import { useServices } from "@/api/crud/services";
import { CreateProjectModal } from "@/components/Artisan/portfolio/CreateProjectModal";
import { AddIcon } from "@/components/assets/icons/ModalIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import { PortfolioCard } from "@/components/Client/PortfolioCard";
import { Descriptions } from "@/components/shared/Headings";
import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react";


const Portfolio = () => {
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);

  const { currentUser } = useAuthStore();
  const { getArtisanServices } = useServices();
  const { data, isPending } = getArtisanServices(currentUser?._id as string);

  const closeModal = () => setIsModalProjectOpen(false);

  const portfolioItems = data?.data || [];

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
            <PortfolioCard key={item?._id} item={item} showDate />
          ))}
        </div>
      </div>

      <CreateProjectModal
        isOpen={isModalProjectOpen}
        onClose={closeModal}
        currentUser={currentUser}
      />
    </section>
  );
};

export default Portfolio;
