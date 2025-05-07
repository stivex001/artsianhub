"use client";
import { useCategories } from "@/api/crud/categories";
import FilterComponent from "@/components/controlledInputs/FilterComponent";
import SkeletonLoader from "@/components/shared/SkeletonModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const ViewCategories = (props: Props) => {
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const { getAllCategories, getCategoryById } = useCategories();
  const { data: category, isLoading } = getAllCategories();

  useEffect(() => {
    if (!isLoading && category?.length && !selectedCategoryId) {
      setSelectedCategoryId(category[0]._id);
    }
  }, [category, isLoading, selectedCategoryId]);

  const { data: categoryById, isLoading: catByIdLoading } = getCategoryById(
    selectedCategoryId ?? "",
    {
      enabled: !!selectedCategoryId,
    }
  );

  const categoryOptions = Array.isArray(category)
    ? category.map((cat) => ({
        id: cat._id,
        value: cat._id,
        label: cat.name,
      }))
    : [];

  const handleFiterChange = (selected: string) => {
    setSelectedCategoryId(selected);
  };

  return (
    <section className="flex flex-col gap-10 min-h-[50vh]">
      <div className="flex items-center gap-5 border-b-2 border-primary pb-7">
        <h1 className="text-base text-primary">Category name</h1>
        <FilterComponent
          onFilterChange={handleFiterChange}
          options={categoryOptions}
          value={selectedCategoryId ?? undefined}
          className="rounded-[20px] text-sm lg:text-xl"
          showIcon
          iconStyle="!text-black"
          filterStyle
        />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-base text-primary">Category Images</h1>
        {isLoading || catByIdLoading ? (
          <SkeletonLoader type="image" count={categoryById?.images?.length} />
        ) : (
          <div>
            {categoryById?.images && categoryById?.images?.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-20">
                {categoryById?.images?.map((img, i) => (
                  <div
                    key={i}
                    className="w-[160px] h-[180px]  border border-black rounded-[10px]"
                  >
                    <div className="relative w-full h-full ">
                      <Image
                        src={img?.url}
                        alt="Category"
                        className="object-cover "
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No image available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewCategories;
