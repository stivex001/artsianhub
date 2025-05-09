"use client";

import { useCategories } from "@/api/crud/categories";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import SkeletonLoader from "@/components/shared/SkeletonModal";
import { groupByCategoryName } from "@/utils/groupByCategory";
import React from "react";

const CategorySection = () => {
  const { getAllCategories } = useCategories();
  const { data, isLoading } = getAllCategories();

  const grouped = data ? groupByCategoryName(data) : null;

  if (isLoading) {
    const fallbackData: [string, any[]][] = grouped
      ? Object.entries(grouped)
      : Array.from({ length: 3 }, (_, i) => [`Category ${i + 1}`, Array(4).fill(null)]);

    return (
      <div className="flex flex-col gap-14 px-5 lg:px-16 pb-14">
        {fallbackData?.map(([categoryName, items]: [string, any[]], idx: number) => (
          <div key={categoryName ?? idx} className="flex flex-col gap-14">
            <div className="h-8 w-40 bg-gray-200 rounded mb-6" />
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-16">
              <SkeletonLoader type="image" count={items.length} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!grouped) return <div className="text-center py-10">No data found.</div>;

  return (
    <div className="flex flex-col gap-14 px-5 lg:px-16 pb-14">
      {Object.entries(grouped).map(([categoryName, items]) => (
        <div key={categoryName} className="flex flex-col gap-14">
          <Headings title={categoryName} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-16">
            {items?.map((category) =>
              category?.images?.map((img: any, index: number) => (
                <CategoryCard
                  key={index}
                  item={{
                    id: category._id,
                    desc: img.filename,
                    image: img.url,
                  }}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
