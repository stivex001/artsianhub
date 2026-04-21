"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { X, Upload, ImageIcon, Loader2, LayoutGrid } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminCategories, AdminCategory } from "@/apis/crud/adminCategories";

interface Props {
  mode: "create" | "edit";
  initial?: AdminCategory;
  onClose: () => void;
  onSuccess: () => void;
}

const CategoryFormModal = ({ mode, initial, onClose, onSuccess }: Props) => {
  const qc = useQueryClient();
  const { createCategory, updateCategory } = useAdminCategories();

  // Always call both so hooks aren't conditional
  const createMutation = createCategory();
  const updateMutation = updateCategory(initial?._id ?? "");
  const mutation = mode === "create" ? createMutation : updateMutation;

  const [name, setName]               = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [isActive, setIsActive]       = useState(initial?.isActive ?? true);
  const [sortOrder, setSortOrder]     = useState(initial?.sortOrder?.toString() ?? "");
  const [imageFile, setImageFile]     = useState<File | null>(null);
  const [preview, setPreview]         = useState<string | null>(initial?.image?.url ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("description", description.trim());
    fd.append("isActive", String(isActive));
    if (sortOrder) fd.append("sortOrder", sortOrder);
    if (imageFile) fd.append("image", imageFile);
    try {
      await mutation.mutateAsync(fd);
      toast.success(mode === "create" ? "Category created." : "Category updated.");
      qc.invalidateQueries({ queryKey: ["admin_categories"] });
      onSuccess();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to save category.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      >
        <motion.div
          key="panel"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Brand strip */}
          <div className="h-1 w-full bg-gradient-to-r from-[#02198B] via-[#1e3a8a] to-[#F0C422]" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#02198B]/[0.07] flex items-center justify-center shrink-0">
                <LayoutGrid className="w-4 h-4 text-[#02198B]" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm leading-tight">
                  {mode === "create" ? "New Category" : "Edit Category"}
                </h2>
                {mode === "edit" && initial && (
                  <p className="text-[11px] text-gray-400 mt-0.5">{initial.name}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">

            {/* Cover image */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Cover Image
                <span className="ml-1 font-normal normal-case text-gray-400">(optional)</span>
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all
                  ${preview
                    ? "h-36"
                    : "h-24 border-2 border-dashed border-gray-200 hover:border-[#02198B]/40 bg-gray-50/60 hover:bg-[#02198B]/[0.02]"
                  }`}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg">
                        <Upload className="w-3.5 h-3.5" />
                        Change image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-xs font-medium">Click to upload</span>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Plumbing & Heating"
                autoFocus={mode === "create"}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition-all"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Description
                <span className="ml-1 font-normal normal-case">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Shown on the public categories page — help clients understand what this covers…"
                rows={3}
                maxLength={300}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 resize-none
                  focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition-all"
              />
              <p className="text-[11px] text-gray-400 text-right">{description.length}/300</p>
            </div>

            {/* Status + Sort order row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</label>
                <button
                  type="button"
                  onClick={() => setIsActive((p) => !p)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all
                    ${isActive
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 transition-colors
                    ${isActive ? "bg-emerald-500" : "bg-gray-400"}`}
                  />
                  {isActive ? "Active" : "Inactive"}
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Sort Order
                </label>
                <input
                  type="number"
                  min="1"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  placeholder="1"
                  className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100 mt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={mutation.isPending}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200
                  transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending || !name.trim()}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#02198B] hover:bg-[#011571]
                  disabled:opacity-60 transition-colors flex items-center gap-2"
              >
                {mutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {mode === "create" ? "Create Category" : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryFormModal;
