"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Pencil,
  Trash2,
  Plus,
  ImageIcon,
  Tag,
  Loader2,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminCategory, AdminSubcategory, useAdminCategories } from "@/apis/crud/adminCategories";
import ConfirmModal from "@/components/admin/shared/ConfirmModal";
import CategoryFormModal from "./CategoryFormModal";
import SubcategoryFormModal from "./SubcategoryFormModal";

interface Props {
  category: AdminCategory;
  onRefetch: () => void;
  onDeleted: () => void;
  isSuperAdmin: boolean;
}

// ── Subcategory card ──────────────────────────────────────────────────────────
const SubcategoryCard = ({
  sub,
  categoryId,
  onRefetch,
  isSuperAdmin,
}: {
  sub: AdminSubcategory;
  categoryId: string;
  onRefetch: () => void;
  isSuperAdmin: boolean;
}) => {
  const qc = useQueryClient();
  const { deleteSubcategory, updateSubcategory } = useAdminCategories();
  const deleteMutation = deleteSubcategory(sub._id);
  const updateMutation = updateSubcategory(sub._id);

  const [showEdit, setShowEdit]     = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [toggling, setToggling]     = useState(false);

  const handleToggleActive = async () => {
    setToggling(true);
    const fd = new FormData();
    fd.append("isActive", String(!sub.isActive));
    try {
      await updateMutation.mutateAsync(fd);
      qc.invalidateQueries({ queryKey: ["admin_categories"] });
      onRefetch();
    } catch {
      toast.error("Failed to update subcategory status.");
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(undefined as any);
      toast.success("Subcategory deleted.");
      qc.invalidateQueries({ queryKey: ["admin_categories"] });
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Cannot delete — artisans may be assigned to this subcategory.");
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden
          hover:border-gray-200 hover:shadow-sm transition-all"
      >
        {/* Status stripe at top */}
        <div className={`h-0.5 w-full ${sub.isActive ? "bg-emerald-400" : "bg-gray-200"}`} />

        {/* Image */}
        <div className="h-24 bg-gray-50 flex items-center justify-center overflow-hidden">
          {sub.image?.url ? (
            <img
              src={sub.image.url}
              alt={sub.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-gray-300">
              <Tag className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{sub.name}</p>
          {sub.description ? (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{sub.description}</p>
          ) : (
            <p className="text-xs text-gray-300 mt-1 italic">No description</p>
          )}

          {/* Status badge */}
          <button
            onClick={handleToggleActive}
            disabled={toggling || updateMutation.isPending}
            className={`mt-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold
              cursor-pointer transition-opacity disabled:opacity-50
              ${sub.isActive
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            {toggling
              ? <Loader2 className="w-2.5 h-2.5 animate-spin" />
              : <span className={`w-1.5 h-1.5 rounded-full ${sub.isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
            }
            {sub.isActive ? "Active" : "Inactive"}
          </button>
        </div>

        {/* Hover action buttons — SUPER_ADMIN only */}
        {isSuperAdmin && (
          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowEdit(true)}
              className="w-6 h-6 rounded-md bg-white/90 border border-gray-200 flex items-center justify-center
                text-gray-500 hover:text-[#02198B] hover:border-[#02198B]/20 transition-colors shadow-sm"
              title="Edit"
            >
              <Pencil className="w-3 h-3" />
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="w-6 h-6 rounded-md bg-white/90 border border-gray-200 flex items-center justify-center
                text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </motion.div>

      {showEdit && (
        <SubcategoryFormModal
          mode="edit"
          parentId={categoryId}
          parentName=""
          initial={sub}
          onClose={() => setShowEdit(false)}
          onSuccess={() => { setShowEdit(false); onRefetch(); }}
        />
      )}

      <ConfirmModal
        open={showDelete}
        title="Delete Subcategory"
        description={`"${sub.name}" will be permanently removed. This is blocked if any artisans are assigned to it.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onClose={() => setShowDelete(false)}
      />
    </>
  );
};

// ── Main detail component ─────────────────────────────────────────────────────
const AdminCategoryDetail = ({ category, onRefetch, onDeleted, isSuperAdmin }: Props) => {
  const qc = useQueryClient();
  const { deleteCategory } = useAdminCategories();
  const deleteMutation = deleteCategory(category._id);

  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [showAddSub, setShowAddSub] = useState(false);

  const subs = category.subCategories ?? [];

  const handleDeleteCategory = async () => {
    try {
      await deleteMutation.mutateAsync(undefined as any);
      toast.success("Category deleted.");
      qc.invalidateQueries({ queryKey: ["admin_categories"] });
      onDeleted();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Cannot delete — artisans may be assigned to this category.");
    }
  };

  return (
    <>
      <motion.div
        key={category._id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex flex-col gap-6 h-full"
      >
        {/* ── Hero: image + metadata + actions ───────────────────────────── */}
        <div className="flex items-start gap-5">
          {/* Image */}
          <div className="w-20 h-20 rounded-2xl shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center
            ring-1 ring-gray-100 shadow-sm">
            {category.image?.url ? (
              <img
                src={category.image.url}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="w-7 h-7 text-gray-300" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate leading-tight">{category.name}</h2>
                {category.sortOrder != null && (
                  <span className="text-xs text-gray-400 mt-0.5 block">Sort #{category.sortOrder}</span>
                )}
              </div>

              {/* Actions — SUPER_ADMIN only */}
              {isSuperAdmin && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setShowEditCategory(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                      bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300
                      transition-colors shadow-sm"
                  >
                    <Pencil className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteCategory(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                      bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200
                      transition-colors shadow-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-2 mt-2.5">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold
                ${category.isActive
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${category.isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
                {category.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {category.description ? (
          <div className="px-4 py-3.5 bg-[#02198B]/[0.03] border border-[#02198B]/[0.07] rounded-xl">
            <p className="text-xs font-semibold text-[#02198B]/60 uppercase tracking-wider mb-1.5">Description</p>
            <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
          </div>
        ) : (
          <div className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl">
            <p className="text-xs text-gray-400 italic">No description — add one via Edit to improve public discoverability.</p>
          </div>
        )}

        {/* ── Subcategories ───────────────────────────────────────────────── */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#02198B] rounded-full" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Subcategories
              </p>
              {subs.length > 0 && (
                <span className="text-[11px] font-semibold bg-[#02198B]/[0.08] text-[#02198B] px-2 py-0.5 rounded-full">
                  {subs.length}
                </span>
              )}
            </div>
            {isSuperAdmin && (
              <button
                onClick={() => setShowAddSub(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                  bg-[#02198B] text-white hover:bg-[#011571] transition-colors shadow-sm"
              >
                <Plus className="w-3 h-3" />
                Add Subcategory
              </button>
            )}
          </div>

          {subs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-300
              border-2 border-dashed border-gray-100 rounded-2xl">
              <Tag className="w-8 h-8" />
              <p className="text-xs font-medium text-gray-400">No subcategories yet</p>
              {isSuperAdmin && (
                <button
                  onClick={() => setShowAddSub(true)}
                  className="text-xs font-medium text-[#02198B] hover:underline"
                >
                  Add the first one
                </button>
              )}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
              layout
            >
              <AnimatePresence mode="popLayout">
                {subs.map((sub) => (
                  <SubcategoryCard
                    key={sub._id}
                    sub={sub}
                    categoryId={category._id}
                    onRefetch={onRefetch}
                    isSuperAdmin={isSuperAdmin}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Edit category modal */}
      {showEditCategory && (
        <CategoryFormModal
          mode="edit"
          initial={category}
          onClose={() => setShowEditCategory(false)}
          onSuccess={() => { setShowEditCategory(false); onRefetch(); }}
        />
      )}

      {/* Delete category confirm */}
      <ConfirmModal
        open={showDeleteCategory}
        title="Delete Category"
        description={`"${category.name}" and all its subcategories will be permanently removed. This is blocked if any artisans are assigned to it.`}
        confirmLabel="Delete Category"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={handleDeleteCategory}
        onClose={() => setShowDeleteCategory(false)}
      />

      {/* Add subcategory modal */}
      {showAddSub && (
        <SubcategoryFormModal
          mode="create"
          parentId={category._id}
          parentName={category.name}
          onClose={() => setShowAddSub(false)}
          onSuccess={() => { setShowAddSub(false); onRefetch(); }}
        />
      )}
    </>
  );
};

export default AdminCategoryDetail;
