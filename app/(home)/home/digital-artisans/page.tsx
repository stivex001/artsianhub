"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Code,
  Graphic,
  SocialContent,
  UX,
} from "@/components/assets/icons/FeaturedIcons";
import { FeaturesArtisan } from "@/components/pages/landingPage/FeaturesArtisan";
import digital from "@/components/assets/images/digital.png";
import { CustomButton } from "@/components/clickable/CustomButton";
import { useState } from "react";
import { LoginPromptModal } from "@/components/shared/LoginPromptModal";

const subCategories = [
  {
    id: "Graphic",
    title: "Graphic Designers & Illustrators",
    description: "Branding, logos, and digital art.",
    icon: <Graphic />,
  },
  {
    id: "Web",
    title: "Web Designers & Developers",
    description: "Custom websites and eCommerce stores.",
    icon: <Code />,
  },
  {
    id: "UX",
    title: "UI/UX Designers",
    description: "User experience and app interface design.",
    icon: <UX />,
  },
  {
    id: "Content",
    title: "Content Creators & Social Media Managers",
    description: "Digital marketing, branding, and online engagement.",
    icon: <SocialContent />,
  },
];

export default function DigitalArtisansPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white ">
      <section className="relative h-[70vh] pt-3 overflow-hidden flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 py-20 bg-[#EFF6FF]">
        <div className="absolute inset-0">
          <Image
            src={digital}
            alt="Industrial welding with sparks and machinery"
            className="w-full h-full object-cover object-top"
            fill
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-primary opacity-80"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-medium lg:font-bold text-white mb-4 text-center">
            Meet the Digital Minds Shaping Everyday Beauty
          </h1>
          <p className="text-white mb-6 text-center">
            From branding to web design, our digital artisans specialize in
            creating engaging and functional online experiences.
          </p>
          <a href="#categories" className="flex items-center justify-center">
            <CustomButton label="Find an Artisan" />
          </a>
        </div>
      </section>

      <section id="categories" className="py-20 px-6 md:px-20">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-12">
          Explore Digital Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subCategories.map((cat) => (
            <div
              key={cat?.id}
              onClick={() => handleCategoryClick(cat)}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl p-6 cursor-pointer shadow-boxShadow hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">{cat?.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{cat?.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {cat?.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* <FeaturesArtisan /> */}

      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold text-lg mb-2">1. Browse</h3>
            <p className="text-gray-600">
              Discover creative artisans across different crafts and styles.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">2. Connect</h3>
            <p className="text-gray-600">
              Chat or book directly with your preferred artisan.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">3. Collaborate</h3>
            <p className="text-gray-600">
              Bring your vision to life with trusted professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-6 md:px-20 bg-primary text-white text-center ">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to collaborate with top artisans?
        </h2>
        <p className="mb-8">
          Join our community and bring your creative ideas to life.
        </p>
        <Button
          variant="secondary"
          className="bg-white text-blue-600 hover:bg-gray-100"
          asChild
        >
          <Link href="/auth/signup?role=client">Join Now</Link>
        </Button>
      </section>
      <LoginPromptModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
