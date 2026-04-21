"use client";

import React, { useState } from "react";
import { useCategories } from "@/apis/crud/categories";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { X, Tag } from "lucide-react";

interface Props {
  categoryId: string;
  categoryName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateSubCategoryModal = ({ categoryId, categoryName, onClose, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { createSubCategory } = useCategories();
  const mutation = createSubCategory();

  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await mutation.mutateAsync({ name: name.trim(), categoryId });
      toast.success("Subcategory created");
      queryClient.invalidateQueries({ queryKey: ["sub-categories", categoryId] });
      onSuccess();
    } catch {
      toast.error("Failed to create subcategory");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-gray-900">Add Subcategory</h2>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Under: {categoryName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Subcategory Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Pipe fitting, Roof repair…"
              autoFocus
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending || !name.trim()}
              className="px-4 py-2 rounded-xl text-sm text-white bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {mutation.isPending ? "Adding…" : "Add Subcategory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubCategoryModal;
