"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BrushIcon, CalendarIcon } from "lucide-react";
import { ScissorsIcon, WeaverIcon } from "@/components/assets/icons/FeaturedIcons";
import { FeaturesArtisan } from "@/components/pages/landingPage/FeaturesArtisan";
import tailor from "@/components/assets/images/tailor.png";
import { CustomButton } from "@/components/clickable/CustomButton";

const subCategories = [
  {
    id: "hairdressers",
    title: "Hairdressers & Barbers",
    description:
      "Bringing confidence to life through expert styling, grooming, and creative flair.",
    icon: <BrushIcon />,
    link: "/creative/hairdressers",
  },
  {
    id: "tailors",
    title: "Tailors & Fashion Designers",
    description:
      "Crafting unique outfits that blend tradition, creativity, and personal expression.",
    icon: <ScissorsIcon />,
    link: "/creative/tailors",
  },
  {
    id: "event_planners",
    title: "Event Planners & Decorators",
    description:
      "Designing memorable moments and breathtaking spaces for every occasion.",
    icon: <CalendarIcon />,
    link: "/creative/event-planners",
  },
  {
    id: "make_up",
    title: "Make-up Artists",
    description:
      "Designing memorable moments and breathtaking spaces for every occasion.",
    icon: <WeaverIcon />,
    link: "/creative/event-planners",
  },
  {
    id: "chef",
    title: "Chefs",
    description:
      "Designing memorable moments and breathtaking spaces for every occasion.",
    icon: <WeaverIcon />,
    link: "/creative/event-planners",
  },
];

export default function CreativeArtisansPage() {
  return (
    <div className="min-h-screen bg-white ">
      <section className="relative h-[70vh] pt-3 overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 py-20 bg-[#EFF6FF]">
        <div className="absolute inset-0">
          <Image
            src={tailor}
            alt="Industrial welding with sparks and machinery"
            className="w-full h-full object-cover object-top"
            fill
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-primary opacity-80"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Meet the Creative Minds Shaping Everyday Beauty
          </h1>
          <p className="text-white mb-6 text-center">
            From barbers and tailors to event planners, explore skilled artisans
            who turn imagination into art and bring style to life.
          </p>
          <a href="#categories" className="flex items-center justify-center">
            <CustomButton label="Find an Artisan" />
          </a>
        </div>
      </section>

      {/* Subcategory Section */}
      <section id="categories" className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Explore Creative Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subCategories.map((cat) => (
            <div
              key={cat?.id}
              className="bg-white rounded-xl p-6 shadow-boxShadow hover:shadow-md transition-shadow duration-200"
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

      {/* Featured Artisans Section */}
      {/* <section className="bg-gray-50 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Featured Artisans
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredArtisans.map((artisan, index) => (
            <Card
              key={index}
              className="border hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {artisan.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>{artisan.craft}</p>
                <p className="text-sm text-gray-500">{artisan.location}</p>
                <Button className="mt-4 w-full" variant="secondary">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}
      <FeaturesArtisan />

      {/* How It Works */}
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
    </div>
  );
}
