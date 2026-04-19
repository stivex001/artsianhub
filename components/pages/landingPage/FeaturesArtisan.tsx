import React from "react";
import { FaStar } from "react-icons/fa";
import { Check } from "lucide-react";
import alex from "@/components/assets/images/Alex Morgan.png";
import maria from "@/components/assets/images/Maria Silva.png";
import olivia from "@/components/assets/images/Olivia Parks.png";
import Image from "next/image";
import { Descriptions } from "@/components/shared/Headings";

type Props = {};

const artisans = [
  {
    image: alex,
    category: "Custom Furniture",
    name: "Alex Morgan",
    specialty: "Reclaimed Wood Specialist",
    rating: 4.9,
    verified: true,
  },
  {
    image: maria,
    category: "Jewelry Design",
    name: "Maria Silva",
    specialty: "Custom Metal Work",
    rating: 5,
    verified: true,
  },
  {
    image: olivia,
    category: "Textile Arts",
    name: "Kashmala",
    specialty: "Sustainable Materials",
    rating: 4.8,
    verified: false,
  },
  {
    image: olivia,
    category: "Ceramic Artist",
    name: "Olivia Parks",
    specialty: "Functional Pottery",
    rating: 4.9,
    verified: true,
  },
];

export const FeaturesArtisan = (props: Props) => {
  return (
    <section className="bg-white py-20 px-4  text-center">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Descriptions
            title="Featured Artisans"
            desc=" Meet some of our top-rated artisans who consistently deliver
          exceptional work."
          />
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artisans.map((artisan, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-boxshadow hover:shadow-md transition overflow-hidden text-left"
            >
              <div className="relative w-full h-48">
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  layout="fill"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-primary text-white text-base font-medium px-3 py-1 h-8 flex items-center justify-center rounded-full">
                  {artisan.category}
                </span>
                {artisan.verified && (
                  <div
                    className="absolute top-2.5 right-2.5 w-7 h-7 bg-[#02198B] rounded-full
                      flex items-center justify-center ring-[2.5px] ring-white shadow-md"
                    title="Verified Artisan"
                  >
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="p-4 w-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-textdeep">
                    {artisan.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-[#FACC15] w-4 h-4" />
                    <span className="text-base font-medium text-textdeep">
                      {artisan.rating}
                    </span>
                  </div>
                </div>

                <p className="text-[#858585] text-sm ">
                  <span className="font-medium">Specialty:</span>{" "}
                  {artisan.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
