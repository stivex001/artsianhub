"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ArtisansHubHomepage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      {" "}
      {/* Hero Section */}{" "}
      <section className="w-full bg-gradient-to-br from-blue-900 to-blue-600 text-white py-20 px-6 text-center">
        {" "}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Connecting Skills to Meet Your Everyday Needs
        </h1>{" "}
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          {" "}
          Book trusted artisans & shop unique fashion pieces from global
          creative talent.{" "}
        </p>{" "}
        <button className="mt-6 px-8 py-3 bg-yellow-400 text-gray-900 rounded-2xl font-medium text-lg shadow-lg hover:bg-yellow-300 transition">
          {" "}
          Get Started{" "}
        </button>{" "}
      </section>
      {/* Categories Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Category Card */}
          {[
            { title: "Hair & Beauty", icon: "💇🏾‍♀" },
            { title: "Tailors & Fashion Designers", icon: "🧵" },
            { title: "Event Planners", icon: "🎉" },
            { title: "Cleaning Services", icon: "🧽" },
            { title: "Chefs & Caterers", icon: "👨🏾‍🍳" },
            { title: "Home Repairs", icon: "🛠" },
            { title: "Gardening", icon: "🌱" },
            { title: "Photography & Media", icon: "📸" },
            { title: "Fashion Marketplace", icon: "👗" },
          ].map((cat) => (
            <div
              key={cat.title}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer border border-gray-100"
            >
              <div className="text-5xl mb-3">{cat.icon}</div>
              <h3 className="text-lg font-semibold">{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>
      {/* Fashion Marketplace Banner */}
      <section className="w-full bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Shop the Global Fashion Marketplace
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-6">
          Explore African prints, custom designs, ready‑to‑wear clothing, bags,
          shoes, and accessories from verified artisans.
        </p>
        <button className="px-7 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-600 transition shadow-md">
          Visit Fashion Store
        </button>
      </section>
      {/* Onboarding CTA */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Are You an Artisan? Join Free
        </h2>
        <p className="text-gray-600 mb-6">
          Get visibility, promote your services, and attract customers globally.
        </p>
        <button
          onClick={() => router.push("/auth/signup?role=artisan")}
          className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-xl text-lg font-semibold hover:bg-yellow-300 transition shadow"
        >
          Sign Up as Artisan
        </button>
      </section>
    </div>
  );
}
