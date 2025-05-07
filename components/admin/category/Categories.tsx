"use client";

import React from "react";
import Image from "next/image";
import { useCategories } from "@/api/crud/categories";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";

const Categories = () => {
  const { getAllCategories } = useCategories();
  const { data, isLoading } = getAllCategories();


  return (
    <>
      {isLoading ? (
        <SkeletonTableLoader />
      ) : (
        <div className="rounded-md  border-gray-200 shadow-sm overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[2fr_1fr_1fr] bg-secondary text-white px-6 py-3 text-base">
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
              <div className="flex flex-wrap gap-2">
                {/* {cat?.images?.slice(0, 4)?.map((img, i) => (
              
            ))} */}
                {/* <div className="w-14 h-14 border rounded-[10px] overflow-hidden">
              <Image
                src={cat?.image}
                alt="Category"
                width={56}
                height={56}
                className="object-cover  w-full h-full"
              />
            </div> */}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <button className="text-primary hover:underline">Edit</button>
                <button className="text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center text-sm">
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
        </div>
      )}
    </>
  );
};

export default Categories;
