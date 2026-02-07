"use client";
import { useCategories } from "@/api/crud/categories";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const dummyCategories = [
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
  const { getAllCategories } = useCategories();

  const { data: backendCategories, isLoading } = getAllCategories();

  // Transform backend categories and merge with dummy data
  const transformedCategories = (backendCategories || [])
    .map((backendCat) => {
      const dummyMatch = dummyCategories.find(
        (dc) => dc.title === backendCat.name,
      );
      if (dummyMatch) {
        return {
          ...dummyMatch,
          id: backendCat._id,
        };
      }
      return null;
    })
    .filter(
      (cat): cat is (typeof dummyCategories)[0] & { id: string } =>
        cat !== null,
    );

  // Manually add Fashion Marketplace if it's not already there
  const fashionMarketplace = dummyCategories.find(
    (c) => c.title === "Fashion Marketplace",
  );

  const finalCategories = [...transformedCategories];
  if (
    fashionMarketplace &&
    !finalCategories.some((c) => c.title === "Fashion Marketplace")
  ) {
    finalCategories.push({
      ...fashionMarketplace,
      id: "fashion-marketplace-id",
    } as any);
  }

  if (isLoading) {
    return (
      <section id="findArtisan" className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Categories
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100"
            >
              <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="findArtisan" className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Explore Categories
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {finalCategories.map((cat, index) => {
          return (
            <div
              key={cat?.id || index}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer border border-gray-100"
              onClick={() => router.push(`${cat.link}?categoryId=${cat?.id}`)}
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
