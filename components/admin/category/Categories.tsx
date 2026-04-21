"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Category, useCategories } from "@/apis/crud/categories";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import DeleteCategoryModal from "./DeleteCategoryModal";
import ReusableDialog from "@/components/shared/ReuseableDialog";

const Categories = () => {
  const { getAllCategories } = useCategories();
  const { data, isLoading } = getAllCategories();

  const [deleteCategory, setDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  console.log(selectedCategory, "dgygdyud");

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteCategory(true);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTableLoader />
      ) : (
        <div className="rounded-md  border-gray-200 shadow-sm overflow-hidden min-h-[50vh] max-h-[70vh] overflow-y-auto scrollbar-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[2fr_1fr_1fr] bg-secondary text-white px-6 py-3 text-base sticky top-0 z-10">
            <div>Category Name</div>
            <div>Category Images</div>
            <div></div>
          </div>

          {data?.map((cat, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr] items-center border-b border-primary px-6 py-2 bg-gray-50 hover:bg-gray-100 transition-colors my-1"
            >
              <div className="text-primary text-sm">{cat?.name}</div>

              {/* Images */}
              <div className="flex gap-x-5">
                {cat?.images?.slice(0, 4)?.map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 border rounded-[10px] overflow-hidden"
                  >
                    <div className="relative w-full h-full ">
                      <Image
                        src={img?.url}
                        alt="Category"
                        layout="fill"
                        objectFit="cover"
                        className=""
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <button className="text-primary hover:underline">Edit</button>
                <button
                  onClick={() => handleDelete(cat)}
                  className="text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  x
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {/* <div className="flex justify-center items-center gap-2 p-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className="w-8 h-8 rounded text-sm border border-gray-300 hover:bg-blue-100"
          >
            {num}
          </button>
        ))}
      </div> */}

          {
            <ReusableDialog
              title={"Delete Category"}
              open={deleteCategory}
              onOpenChange={setDeleteCategory}
              className="max-w-xl"
            >
              <DeleteCategoryModal
                setDeleteCategory={setDeleteCategory}
                selectedCategory={selectedCategory}
              />
            </ReusableDialog>
          }
        </div>
      )}
    </>
  );
};

export default Categories;
