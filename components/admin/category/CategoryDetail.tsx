"use client";

import React, { useState, useEffect } from "react";
import { Category, useCategories } from "@/apis/crud/categories";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Edit2, Check, X, Plus, Tag } from "lucide-react";
import Image from "next/image";
import CreateSubCategoryModal from "./CreateSubCategoryModal";

interface Props {
  category: Category;
  onRefetch: () => void;
}

const CategoryDetail = ({ category, onRefetch }: Props) => {
  const queryClient = useQueryClient();
  const { updateCategory, getSubCategoryByCategoryId } = useCategories();
  const updateMutation = updateCategory(category._id);

  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue]     = useState(category.name);
  const [showSubModal, setShowSubModal] = useState(false);

  useEffect(() => {
    setNameValue(category.name);
    setEditingName(false);
  }, [category._id, category.name]);

  const { data: subData, refetch: refetchSubs } = getSubCategoryByCategoryId(category._id);
  const subcategories = subData?.data ?? [];

  const handleSaveName = async () => {
    if (!nameValue.trim() || nameValue === category.name) {
      setEditingName(false);
      return;
    }
    const fd = new FormData();
    fd.append("name", nameValue.trim());
    try {
      await updateMutation.mutateAsync(fd);
      toast.success("Category updated");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onRefetch();
    } catch {
      toast.error("Failed to update category");
    }
    setEditingName(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Name row */}
      <div className="flex items-center gap-2">
        {editingName ? (
          <>
            <input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveName();
                if (e.key === "Escape") { setEditingName(false); setNameValue(category.name); }
              }}
              autoFocus
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button
              onClick={handleSaveName}
              disabled={updateMutation.isPending}
              className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setEditingName(false); setNameValue(category.name); }}
              className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <h2 className="text-base font-semibold text-gray-900">{category.name}</h2>
            <button
              onClick={() => setEditingName(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Images */}
      {category.images?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Images</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {category.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={img.url}
                  alt={`${category.name} ${i + 1}`}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subcategories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Subcategories {subcategories.length > 0 && `(${subcategories.length})`}
          </p>
          <button
            onClick={() => setShowSubModal(true)}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Plus className="w-3 h-3" />Add Subcategory
          </button>
        </div>

        {subcategories.length === 0 ? (
          <p className="text-xs text-gray-400 py-2">No subcategories yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <span
                key={sub._id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
              >
                <Tag className="w-3 h-3 text-gray-400" />
                {sub.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {showSubModal && (
        <CreateSubCategoryModal
          categoryId={category._id}
          categoryName={category.name}
          onClose={() => setShowSubModal(false)}
          onSuccess={() => { setShowSubModal(false); refetchSubs(); }}
        />
      )}
    </div>
  );
};

export default CategoryDetail;
