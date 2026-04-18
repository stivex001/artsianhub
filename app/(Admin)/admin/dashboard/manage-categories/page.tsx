"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid, Tag, Layers } from "lucide-react";
import { useAdminCategories } from "@/apis/crud/adminCategories";
import AdminCategoryList from "@/components/admin/category/AdminCategoryList";
import AdminCategoryDetail from "@/components/admin/category/AdminCategoryDetail";
import CategoryFormModal from "@/components/admin/category/CategoryFormModal";

// ── Skeleton ─────────────────────────────────────────────────────────────────
const PageSkeleton = () => (
  <div className="flex gap-5 animate-pulse" style={{ minHeight: "calc(100vh - 180px)" }}>
    <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-2">
      <div className="h-10 bg-gray-100 rounded-xl mb-1" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="h-3.5 bg-gray-100 rounded-md w-2/3" />
            <div className="h-2.5 bg-gray-100 rounded-md w-full" />
          </div>
        </div>
      ))}
    </div>
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-start gap-5 mb-6">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-5 bg-gray-100 rounded-lg w-1/3" />
          <div className="h-3.5 bg-gray-100 rounded-md w-1/4" />
          <div className="h-7 bg-gray-100 rounded-lg w-20 mt-1" />
        </div>
      </div>
      <div className="h-16 bg-gray-100 rounded-xl mb-6" />
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-36 bg-gray-100 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const ManageCategories = () => {
  const { getAll } = useAdminCategories();
  const { data, isLoading, refetch } = getAll();

  const [selectedId, setSelectedId]     = useState<string | null>(null);
  const [showCreate, setShowCreate]     = useState(false);

  const categories     = data?.data ?? [];
  const selected       = categories?.find((c) => c._id === selectedId) ?? null;
  const totalSubs      = categories.reduce((acc, c) => acc + (c.subCategories?.length ?? 0), 0);
  const activeCount    = categories.filter((c) => c.isActive).length;

  // Auto-select first category once loaded
  useEffect(() => {
    if (categories.length > 0 && !selectedId) {
      setSelectedId(categories[0]._id);
    }
  }, [categories.length]);

  // When selected category is deleted, clear selection
  const handleDeleted = () => {
    setSelectedId(null);
    refetch();
  };

  return (
    <section className="flex flex-col gap-5 h-full">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Categories</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Organise service categories and subcategories shown on the public site
          </p>
        </div>

        {/* Stats + action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mini stats */}
          {!isLoading && categories.length > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#02198B]/[0.06] rounded-xl">
                <LayoutGrid className="w-3.5 h-3.5 text-[#02198B]" />
                <span className="text-xs font-semibold text-[#02198B]">
                  {activeCount}/{categories.length} active
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0C422]/10 rounded-xl">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">
                  {totalSubs} subcategories
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#02198B] text-white
              text-sm font-medium hover:bg-[#011571] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Category
          </button>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <PageSkeleton />
      ) : categories.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center gap-4 py-24 bg-white
            rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#02198B]/[0.06] flex items-center justify-center">
            <Layers className="w-7 h-7 text-[#02198B]/60" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-gray-700">No categories yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Categories power your public listings — create the first one to get started.
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#02198B] text-white
              text-sm font-medium hover:bg-[#011571] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Category
          </button>
        </motion.div>
      ) : (
        <div
          className="flex gap-5"
          style={{ minHeight: "calc(100vh - 220px)" }}
        >
          {/* ── Left: list ───────────────────────────────────────── */}
          <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm
            flex flex-col overflow-hidden">
            {/* List header */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-50 shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Categories
                </p>
                <span className="text-[11px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {categories.length}
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-3">
              <AdminCategoryList
                categories={categories}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </div>

          {/* ── Right: detail ────────────────────────────────────── */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm
            p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {selected ? (
                <AdminCategoryDetail
                  key={selected._id}
                  category={selected}
                  onRefetch={refetch}
                  onDeleted={handleDeleted}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-3 text-gray-300 min-h-64"
                >
                  <LayoutGrid className="w-10 h-10" />
                  <p className="text-sm font-medium text-gray-400">Select a category to manage it</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <CategoryFormModal
          mode="create"
          onClose={() => setShowCreate(false)}
          onSuccess={() => {
            setShowCreate(false);
            refetch();
          }}
        />
      )}
    </section>
  );
};

export default ManageCategories;
