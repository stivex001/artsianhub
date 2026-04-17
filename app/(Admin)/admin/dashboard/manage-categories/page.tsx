"use client";

import React, { useState } from "react";
import { useCategories } from "@/apis/crud/categories";
import CategoryList from "@/components/admin/category/CategoryList";
import CategoryDetail from "@/components/admin/category/CategoryDetail";
import CreateCategoryModal from "@/components/admin/category/CreateCategoryModal";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import { Plus, Layers } from "lucide-react";

const ManageCategories = () => {
  const { getAllCategories } = useCategories();
  const { data: categories, isPending, refetch } = getAllCategories();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const list     = categories ?? [];
  const selected = list.find((c) => c._id === selectedId) ?? null;

  return (
    <section className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Categories</h1>
          <p className="text-sm text-gray-500 mt-0.5">Organise service categories and subcategories</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />New Category
        </button>
      </div>

      {/* Body */}
      {isPending ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SkeletonTableLoader />
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Layers className="w-8 h-8" />
          <p className="text-sm">No categories yet</p>
          <button onClick={() => setShowCreate(true)} className="text-primary text-sm font-medium hover:underline">
            Create the first one
          </button>
        </div>
      ) : (
        <div className="flex gap-5" style={{ minHeight: "calc(100vh - 220px)" }}>
          {/* Left: category list */}
          <div className="w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col overflow-hidden">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 shrink-0">
              {list.length} {list.length === 1 ? "Category" : "Categories"}
            </p>
            <CategoryList categories={list} selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          {/* Right: detail */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-y-auto">
            {selected ? (
              <CategoryDetail category={selected} onRefetch={refetch} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                <Layers className="w-8 h-8" />
                <p className="text-sm">Select a category to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showCreate && (
        <CreateCategoryModal
          onClose={() => setShowCreate(false)}
          onSuccess={() => { setShowCreate(false); refetch(); }}
        />
      )}
    </section>
  );
};

export default ManageCategories;
