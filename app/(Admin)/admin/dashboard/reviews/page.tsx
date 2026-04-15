"use client";

import React, { useState } from "react";
import { useAdminReviews, REVIEW_STATUSES, ReviewStatus } from "@/api/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Wrapper from "@/components/shared/Wrapper";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import {
  Star,
  SlidersHorizontal,
  Flag,
  CheckCircle2,
  Trash2,
  MessageSquarePlus,
  AlertTriangle,
  X,
} from "lucide-react";

// ── Helpers ────────────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<ReviewStatus, { cls: string; label: string }> = {
  pending: { cls: "bg-yellow-50 text-yellow-700", label: "Pending" },
  approved: { cls: "bg-green-50 text-green-600", label: "Approved" },
  removed: { cls: "bg-gray-100 text-gray-500", label: "Removed" },
  flagged: { cls: "bg-red-50 text-red-600", label: "Flagged" },
};

const filterTabs: { label: string; value: ReviewStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Flagged", value: "flagged" },
  { label: "Removed", value: "removed" },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-3.5 h-3.5 ${s <= rating ? "fill-[#F0C422] text-[#F0C422]" : "text-gray-200"}`}
      />
    ))}
    <span className="ml-1 text-xs text-gray-500">{rating}/5</span>
  </div>
);

// ── Respond Modal ─────────────────────────────────────────────────────────────
const RespondModal = ({
  reviewId,
  onClose,
  onSuccess,
}: {
  reviewId: string;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { respondToReview } = useAdminReviews();
  const mutation = respondToReview(reviewId);
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!response.trim()) return;
    try {
      await mutation.mutateAsync({ response: response.trim() });
      toast.success("Response posted");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to post response");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Official Response</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          This response will appear publicly beneath the review.
        </p>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Write the platform's official response…"
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!response.trim() || mutation.isPending}
            className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-40 transition-colors"
          >
            Post Response
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Flag/Note Modal ───────────────────────────────────────────────────────────
const FlagModal = ({
  reviewId,
  targetStatus,
  onClose,
  onSuccess,
}: {
  reviewId: string;
  targetStatus: ReviewStatus;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { updateReviewStatus } = useAdminReviews();
  const mutation = updateReviewStatus(reviewId);
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync({ status: targetStatus, note: note || undefined });
      toast.success(`Review ${targetStatus}`);
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to update review");
    }
  };

  const requiresNote = targetStatus === "flagged" || targetStatus === "removed";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 capitalize">
            {targetStatus === "flagged" ? "Flag Review" : targetStatus === "removed" ? "Remove Review" : "Approve Review"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        {requiresNote && (
          <>
            <p className="text-xs text-gray-500 mb-2">
              {targetStatus === "flagged"
                ? "Flagged reviews are stripped from artisan ratings and hidden from search."
                : "Removed reviews are permanently hidden from users."}
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Reason (optional)…"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </>
        )}
        {!requiresNote && (
          <p className="text-sm text-gray-600 mb-4">
            This review will be marked as approved and visible to users.
          </p>
        )}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className={`flex-1 px-4 py-2.5 text-white rounded-xl text-sm font-medium disabled:opacity-40 transition-colors ${
              targetStatus === "flagged"
                ? "bg-red-600 hover:bg-red-700"
                : targetStatus === "removed"
                ? "bg-gray-700 hover:bg-gray-800"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────────
const ReviewsPage = () => {
  const queryClient = useQueryClient();
  const [activeStatus, setActiveStatus] = useState<ReviewStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [flaggingState, setFlaggingState] = useState<{
    id: string;
    status: ReviewStatus;
  } | null>(null);
  const LIMIT = 10;

  const { getAllReviews } = useAdminReviews();
  const { data, isPending, refetch } = getAllReviews(
    activeStatus !== "all"
      ? { status: activeStatus, page: currentPage, limit: LIMIT }
      : { page: currentPage, limit: LIMIT }
  );

  const reviews = data?.data ?? [];
  const total = data?.total ?? 0;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleSuccess = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ["admin_reviews"] });
  };

  return (
    <>
      {respondingId && (
        <RespondModal
          reviewId={respondingId}
          onClose={() => setRespondingId(null)}
          onSuccess={handleSuccess}
        />
      )}
      {flaggingState && (
        <FlagModal
          reviewId={flaggingState.id}
          targetStatus={flaggingState.status}
          onClose={() => setFlaggingState(null)}
          onSuccess={handleSuccess}
        />
      )}

      <section className="flex flex-col gap-6">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Review Moderation</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Flag toxic reviews or post official platform responses
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {Object.entries(STATUS_STYLES).map(([key, { label, cls }]) => (
              <span key={key} className={`px-2.5 py-1 rounded-full font-medium ${cls}`}>
                {label}: {reviews.filter((r) => r.status === key).length}
              </span>
            ))}
          </div>
        </div>

        {/* ── Status Filters ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => { setActiveStatus(tab.value); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    activeStatus === tab.value
                      ? "bg-primary text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Review Cards ────────────────────────────────────────── */}
        {isPending ? (
          <Wrapper className="!p-5"><SkeletonTableLoader /></Wrapper>
        ) : reviews.length === 0 ? (
          <Wrapper className="!p-0">
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
              <Star className="w-8 h-8" />
              <p className="text-sm">No reviews found</p>
            </div>
          </Wrapper>
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((review) => {
              const statusInfo = STATUS_STYLES[review.status] ?? STATUS_STYLES.pending;
              return (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Reviewer + artisan */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {review.clientId
                              ? `${review.clientId.firstName} ${review.clientId.lastName}`
                              : "Anonymous"}
                          </p>
                          {review.artisanId && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              → {review.artisanId.firstName} {review.artisanId.lastName}
                              {review.artisanId.professionalTitle && ` · ${review.artisanId.professionalTitle}`}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <StarRating rating={review.rating} />
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.cls}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Review text */}
                      <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>

                      {/* Official response */}
                      {review.officialResponse && (
                        <div className="mt-3 bg-blue-50 rounded-xl p-3 border border-blue-100">
                          <p className="text-xs font-semibold text-blue-600 mb-1">Official Response</p>
                          <p className="text-xs text-gray-700">{review.officialResponse}</p>
                        </div>
                      )}

                      {/* Flag note */}
                      {review.note && (
                        <div className="mt-2 bg-red-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-red-600">Staff note: {review.note}</p>
                        </div>
                      )}

                      <p className="text-xs text-gray-400 mt-3">{formatDate(review.createdAt)}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => setFlaggingState({ id: review._id, status: "approved" })}
                        title="Approve"
                        className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-medium hover:bg-green-100 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => setFlaggingState({ id: review._id, status: "flagged" })}
                        title="Flag"
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-medium hover:bg-red-100 transition-colors"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        Flag
                      </button>
                      <button
                        onClick={() => setFlaggingState({ id: review._id, status: "removed" })}
                        title="Remove"
                        className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-medium hover:bg-gray-200 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                      {!review.officialResponse && (
                        <button
                          onClick={() => setRespondingId(review._id)}
                          title="Respond"
                          className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary rounded-xl text-xs font-medium hover:bg-primary/20 transition-colors"
                        >
                          <MessageSquarePlus className="w-3.5 h-3.5" />
                          Respond
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
              <Pagination
                currentPage={currentPage}
                totalEntries={total}
                entriesPerPage={LIMIT}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ReviewsPage;
