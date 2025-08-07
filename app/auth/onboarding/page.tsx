"use client";
import React, { useState } from "react";
import logo from "@/public/single.svg";
import Image from "next/image";
import hire from "@/components/assets/images/hire.svg";
import artisan from "@/components/assets/images/artisan.svg";
import { RighArrow } from "@/components/assets/icons/SvgIcons";
import { useRouter } from "next/navigation";

const Onboarding = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<
    "client" | "artisan" | ""
  >("");

  const handleOptionSelect = (option: "client" | "artisan") => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption === "client") {
      router.push(`/auth/signup?role=client`);
    } else {
      router.push(`/auth/signup?role=artisan`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white hidden lg:block">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Image src={logo} alt="logo" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 ">
        <div className="text-center mb-10">
          <h1 className="md:text-4xl text-2xl font-[900] text-paragrah mb-1">
            Welcome to ArtisanHub
          </h1>
          <p className="text-sm text-body">
            To help you get started, choose if you'd like to join ArtisanHub as a
            creative or a hirer.
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Hire Artisans Option */}
          <div
            className={`bg-white rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 hover:shadow-cardShadow ${
              selectedOption === "client"
                ? "shadow-shadowactive border border-primary"
                : "shadow-shadowo"
            }`}
            onClick={() => handleOptionSelect("client")}
          >
            <div className="mb-6">
              <div className="flex items-center justify-center mb-5">
                <Image src={hire} alt="hire" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                I want to hire artisans
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Looking for someone to fix something, build, repair, sew, or
                install? We'll help you find skilled artisans near you — fast,
                affordable, and reliable
              </p>
            </div>
          </div>

          {/* Artisan Option */}
          <div
            className={`bg-white rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:shadow-cardShadow ${
              selectedOption === "artisan"
                ? "shadow-shadowactive border border-primary"
                : "shadow-shadowo"
            }`}
            onClick={() => handleOptionSelect("artisan")}
          >
            <div className="mb-6">
              <div className="flex items-center justify-center mb-5">
                <Image src={artisan} alt="hire" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                I'm an artisan
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Have a skill you want to earn from? Whether you fix, build,
                clean, sew, or paint — this is the place for you.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center w-full">
          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`w-full lg:w-fit mx-auto flex gap-2 justify-center items-center px-8 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
              selectedOption
                ? "bg-primary text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
            <RighArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
