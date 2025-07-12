"use client";

import * as React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { MapIcon } from "../assets/icons/UsersIcon";
import { BaseModal } from "../shared/BaseModal";

interface PortfolioModalProps {
  item: {
    title: string;
    location: string;
    description: string;
    services: string[];
    images: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioModal = ({
  item,
  isOpen,
  onClose,
}: PortfolioModalProps) => {
  const images = item?.images || [];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="p-0 bg-white border-none shadow-none !max-w-7xl"
    >
      <section
        className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar py-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-11/12 mx-auto">
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="text-base font-bold text-paragrah ">
                {item?.title}
              </h3>
              <button onClick={onClose} className="">
                <X />
              </button>
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

          <div className="my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* Main Image */}
              {images[0] && (
                <div className="aspect-video bg-gray-100 rounded-2xl relative overflow-hidden">
                  <Image
                    src={images[0]}
                    alt={item.title}
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
                      alt={`${item.title} detail 1`}
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
                          alt={`${item.title} detail 2`}
                          fill
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    )}
                    {images[3] && (
                      <div className="bg-gray-100 rounded-2xl relative overflow-hidden">
                        <Image
                          src={images[3]}
                          alt={`${item.title} detail 3`}
                          fill
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseModal>
  );
};
