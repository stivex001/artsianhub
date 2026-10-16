"use client";

import { useServices } from "@/apis/crud/services";
import { CreateProjectModal } from "@/components/Artisan/portfolio/CreateProjectModal";
import { AddIcon } from "@/components/assets/icons/ModalIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import { CardSkeletonLoader } from "@/components/loader/CardSkeletonLoader";
import { Descriptions } from "@/components/shared/Headings";
import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderPlus } from "lucide-react";
import { PortfolioCard } from "@/components/Client/PortfolioCard";

const Portfolio = () => {
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);

  const { currentUser } = useAuthStore();
  const { getMyServices } = useServices();
  const { data, isPending } = getMyServices();

  const closeModal = () => setIsModalProjectOpen(false);

  const portfolioItems = data?.data || [];
  const hasPortfolio = portfolioItems.length > 0;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-8">
        <div className="max-w-xs lg:max-w-xl">
          <Descriptions
            title="Projects"
            desc="Here’s a peek at my past work. From small fixes to full jobs, I put in the same effort every time."
          />
        </div>
        <CustomButton
          icon={AddIcon}
          label=" Add a project"
          className="w-fit !rounded-xl !px-4"
          onClick={() => setIsModalProjectOpen(true)}
          type="button"
        />
      </div>

      <div>
        {isPending && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeletonLoader key={i} />
            ))}
          </div>
        )}

        {!isPending && !hasPortfolio && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-indigo-500 shadow-lg"
            >
              <FolderPlus className="h-14 w-14 text-white" />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-2xl font-semibold text-gray-800"
            >
              No Projects Yet
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 max-w-md text-gray-500"
            >
              You haven’t added any projects to your portfolio. Add your first
              one to showcase your skills and experience.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <CustomButton
                icon={AddIcon}
                label="Add Your First Project"
                className="!rounded-xl !px-6 bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md hover:shadow-lg transition"
                onClick={() => setIsModalProjectOpen(true)}
                type="button"
              />
            </motion.div>
          </div>
        )}

        {hasPortfolio && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolioItems?.map((item) => (
              <PortfolioCard key={item?._id} item={item} showDate />
            ))}
          </div>
        )}
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
