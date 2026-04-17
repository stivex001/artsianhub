"use client";

import React, { useRef, useState } from "react";
import { useCategories } from "@/apis/crud/categories";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { X, Upload, Layers } from "lucide-react";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateCategoryModal = ({ onClose, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { createCategory } = useCategories();
  const { mutateAsync, isPending } = createCategory;

  const [name, setName]   = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileRef           = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const fd = new FormData();
    fd.append("name", name.trim());
    files.forEach((f) => fd.append("categoryImages", f));
    try {
      await mutateAsync(fd);
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onSuccess();
    } catch {
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-gray-900">New Category</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Category Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Plumbing, Carpentry…"
              autoFocus
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Images (optional)</label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Upload className="w-4 h-4" />
              {files.length > 0
                ? `${files.length} file${files.length !== 1 ? "s" : ""} selected`
                : "Click to upload images"}
            </button>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !name.trim()}
              className="px-4 py-2 rounded-xl text-sm text-white bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Creating…" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
