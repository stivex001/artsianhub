"use client";
import ArtisanBreadCrumbs from "@/components/Artisan/portfolio/BreadCrumbs";
import { CreateProjectModal } from "@/components/Artisan/portfolio/CreateProjectModal";
import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { mockPortfolioItems } from "@/components/Client/data";
import Wrapper from "@/components/shared/Wrapper";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const ProjectDetails = (props: Props) => {
  const params = useParams();
  const id = params.id;
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);
  const [isDeleteModalProjectOpen, setIsDeleteModalProjectOpen] =
    useState(false);

  const closeModal = () => setIsModalProjectOpen(false);

  const item = mockPortfolioItems?.find(
    (art) => String(art?.id) === String(id)
  );
  const images = item?.images || [];

  return (
    <main className="flex flex-col gap-5">
      <ArtisanBreadCrumbs />
      <Wrapper className=" flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Main Image */}
          {images[0] && (
            <div className="aspect-video bg-gray-100 rounded-2xl relative overflow-hidden">
              <Image
                src={images[0]}
                alt={item?.title as string}
                fill
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}

          {/* Supporting Images */}
          <div className="grid grid-cols-1 gap-2 aspect-video">
            {images[1] && (
              <div className="bg-gray-100 rounded-2xl relative overflow-hidden">
                <Image
                  src={images[1]}
                  alt={`${item?.title} detail 1`}
                  fill
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
            {(images[2] || images[3]) && (
              <div className="grid md:grid-cols-2 gap-2">
                {images[2] && (
                  <div className="bg-gray-100 rounded-2xl relative overflow-hidden">
                    <Image
                      src={images[2]}
                      alt={`${item?.title} detail 2`}
                      fill
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                )}
                {images[3] && (
                  <div className="bg-gray-100 rounded-2xl relative overflow-hidden">
                    <Image
                      src={images[3]}
                      alt={`${item?.title} detail 3`}
                      fill
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="text-base font-bold text-paragrah ">
              {item?.title}
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDeleteModalProjectOpen(true)}
                className="py-2 px-4 rounded-xl bg-error text-white text-sm font-medium border border-[#E4E5EA]"
              >
                Delete Project
              </button>
              <button
                onClick={() => setIsModalProjectOpen(true)}
                className="py-2 px-4 rounded-xl border border-[#E4E5EA] text-body text-sm font-medium"
              >
                Edit Project
              </button>
            </div>
          </div>

          <div className="flex items-center mb-5">
            <MapIcon />
            <span className="text-body text-sm font-medium ml-1">
              {item?.location}
            </span>
          </div>

          <p className="text-[#667185] text-sm mb-5">{item?.description}</p>

          <div className="flex flex-wrap gap-1">
            {item?.services?.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-[#1129A00D] text-body rounded-[20px] text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        <CreateProjectModal
          isOpen={isModalProjectOpen}
          onClose={closeModal}
          item={[]}
          edit
        />
      </Wrapper>
    </main>
  );
};

export default ProjectDetails;
