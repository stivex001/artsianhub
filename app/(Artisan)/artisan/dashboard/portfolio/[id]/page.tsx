"use client";
import { useServices } from "@/api/crud/services";
import ArtisanBreadCrumbs from "@/components/Artisan/portfolio/BreadCrumbs";
import { CreateProjectModal } from "@/components/Artisan/portfolio/CreateProjectModal";
import { DeleteProjectModal } from "@/components/Artisan/portfolio/DeleteProjectModal";
import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { ProjectDetailsSkeleton } from "@/components/loader/ProjectDetailsSkeleton";
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

  const { getServicesById } = useServices();
  const { data: data, isPending, refetch } = getServicesById(id as string);

  const item = data?.data;
  const images = item?.photos || [];

  return (
    <>
      {isPending ? (
        <ProjectDetailsSkeleton />
      ) : (
        <main className="flex flex-col gap-5">
          <ArtisanBreadCrumbs
            title="Projects"
            url="/artisan/dashboard/portfolio"
            desc="Project Details"
          />
          <Wrapper className=" flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* Main Image */}
              {images[0] && (
                <div className="aspect-video bg-gray-100 rounded-2xl relative overflow-hidden">
                  <Image
                    src={images?.[0]?.url}
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
                      src={images?.[1]?.url}
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
                          src={images?.[2]?.url}
                          alt={`${item?.title} detail 2`}
                          fill
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    )}
                    {images[3] && (
                      <div className="bg-gray-100 rounded-2xl relative overflow-hidden">
                        <Image
                          src={images?.[3]?.url}
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
                {item?.serviceType?.map((service: any) => (
                  <span
                    key={service?._id}
                    className="px-3 py-1.5 bg-[#1129A00D] text-body rounded-[20px] text-xs font-medium"
                  >
                    {service?.name}
                  </span>
                ))}
              </div>
            </div>
            <CreateProjectModal
              isOpen={isModalProjectOpen}
              onClose={closeModal}
              item={item}
              edit
            />
            <DeleteProjectModal
              isOpen={isDeleteModalProjectOpen}
              onClose={() => setIsDeleteModalProjectOpen(false)}
              id={item?._id}
              refetch={refetch}
            />
          </Wrapper>
        </main>
      )}
    </>
  );
};

export default ProjectDetails;
