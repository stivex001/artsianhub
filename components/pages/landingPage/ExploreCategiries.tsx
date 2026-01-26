"use client";
import { useRouter } from "next/navigation";

export const categories = [
  {
    icon: "💇🏾‍♀",
    title: "Creative Artisans",
    link: "/creative-artisans",
    description:
      "From hairdressers and tailors to event planners, our Creative Artisans shape everyday life with style, beauty, and imagination. Explore talents that bring ideas to life through fashion, design, and celebration.",
  },
  {
    icon: "💻",
    title: "Digital Artisans",
    link: "/digital-artisans",
    description:
      "From branding to web design, our digital artisans specialize in creating engaging and functional online experiences.",
  },
  {
    icon: "🛠",
    title: "Pro Artisans",
    link: "/skilled-artisans",
    description:
      "Get skilled home repairs and services from expert trades people—plumbers, electricians, and mechanics.",
  },
  {
    icon: "👗",
    title: "Fashion Marketplace",
    link: "/fashion-marketplace",
    description:
      "Explore African prints, custom designs, ready‑to‑wear clothing, bags, shoes, and accessories from verified artisans.",
  },
];

export const ExploreCategiries = () => {
  const router = useRouter();
  return (
    <section id="findArtisan" className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Explore Categories
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer border border-gray-100"
              onClick={() => router.push(`${cat.link}`)}
            >
              <div className="text-5xl mb-3">{cat.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
