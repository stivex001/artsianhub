"use client";

import { useServices } from "@/api/crud/services";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import SkeletonLoader from "@/components/shared/SkeletonModal";
import React from "react";

const groupByCategoryName = (services: any[]) => {
  return services.reduce((acc: Record<string, any[]>, item) => {
    const categoryName = item?.categoryId?.name;
    if (!categoryName) return acc;

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});
};

const CategorySection = () => {
  const { getAllServices } = useServices();
  const { data: serviceLists, isLoading: serviceLoading } = getAllServices();

  const grouped = serviceLists ? groupByCategoryName(serviceLists) : null;

  if (serviceLoading) {
    const fallbackData: [string, any[]][] = grouped
      ? Object.entries(grouped)
      : Array.from({ length: 3 }, (_, i) => [
          `Category ${i + 1}`,
          Array(4).fill(null),
        ]);

    return (
      <div className="flex flex-col gap-14 px-5 lg:px-16 pb-14">
        {fallbackData.map(
          ([categoryName, items]: [string, any[]], idx: number) => (
            <div key={categoryName ?? idx} className="flex flex-col gap-14">
              <div className="h-8 w-40 bg-gray-200 rounded mb-6" />
              <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-16">
                <SkeletonLoader type="image" count={items.length} />
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  if (!grouped) return <div className="text-center py-10">No data found.</div>;

  return (
    <div className="flex flex-col gap-14 px-5 lg:px-16 pb-14">
      {Object.entries(grouped)?.map(([categoryName, items]) => (
        <div key={categoryName} className="flex flex-col gap-14">
          <Headings title={categoryName} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-16">
            {items?.map((service) => {
              return (
                <>
                  {service?.categoryId?.images?.map(
                    (img: any, index: number) => (
                      <CategoryCard
                        key={index}
                        item={{
                          id: service._id,
                          desc: service?.description,
                          image: img.url,
                        }}
                      />
                    )
                  )}
                </>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
