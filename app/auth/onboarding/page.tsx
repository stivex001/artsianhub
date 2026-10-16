"use client";
import React, { useState } from "react";
import logo from "@/components/assets/images/n.png";
import Image from "next/image";
import hire from "@/components/assets/images/hire.svg";
import artisan from "@/components/assets/images/artisan.svg";
import { RighArrow } from "@/components/assets/icons/SvgIcons";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="bg-white hidden lg:block w-40 h-20 mt-4  ">
        {/* <Link href="/" className="max-w-6xl  mx-auto px-4 py-4">
          <Image src={logo} alt="logo" />
        </Link> */}
        <Link href="/" className=" ">
          <Image
            src={logo}
            alt="logo"
            className="w-full h-full object-cover "
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 ">
        <div className="text-center mb-10">
          <h1 className="md:text-4xl text-2xl font-[900] text-paragrah mb-1">
            Welcome to ArtisansHub
          </h1>
          <p className="text-sm text-body">
            To help you get started, choose if you'd like to join ArtisansHub as
            a creative or a hirer.
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
                Find an Artisan
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your project deserves the best craftsmanship. Search for
                trusted, skilled artisans near you Compare prices and reviews
                Book quickly and securely Get quality work, on time
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
                Work as an Artisan...start Getting Jobs
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Have a skill to share? We&apos;ll connect you to customers who
                need you. Create your free profile and showcase your work Get
                matched with local job requests Set your own prices and schedule
                Earn more and grow your reputation
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
