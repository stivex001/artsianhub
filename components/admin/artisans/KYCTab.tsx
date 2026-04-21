"use client";

import { useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminArtisans } from "@/apis/crud/admin";
import type { ArtisanKyc, KycStatus } from "@/apis/crud/adminTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const isImage = (url: string) => /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(url);

const KycStatusBadge = ({ status }: { status?: KycStatus }) => {
  if (!status || status === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-200">
        <Clock className="w-3 h-3" />
        Pending Review
      </span>
    );
  }
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 ring-1 ring-green-200">
        <CheckCircle2 className="w-3 h-3" />
        Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 ring-1 ring-red-200">
      <XCircle className="w-3 h-3" />
      Rejected
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Single document card
// ─────────────────────────────────────────────────────────────────────────────

interface DocCardProps {
  label: string;
  doc?: { url: string; publicId: string; _id: string };
}

const DocCard = ({ label, doc }: DocCardProps) => {
  const [imgError, setImgError] = useState(false);

  if (!doc?.url) {
    return (
      <div className="flex flex-col gap-2 p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
        <div className="flex items-center gap-2 text-gray-300 py-4 justify-center">
          <FileText className="w-6 h-6" />
          <span className="text-xs">Not uploaded</span>
        </div>
      </div>
    );
  }

  const file_is_image = isImage(doc.url) && !imgError;

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</p>
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#02198B] hover:underline"
        >
          Open <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Preview */}
      <div className="w-full h-36 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
        {file_is_image ? (
          <img
            src={doc.url}
            alt={label}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <FileText className="w-10 h-10 text-gray-300" />
            <span className="text-xs">PDF Document</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main KYC tab
// ─────────────────────────────────────────────────────────────────────────────

interface KYCTabProps {
  artisanId: string;
  kyc?: ArtisanKyc;
  isVerified?: boolean;
  onSuccess: () => void;
}

const KYCTab = ({ artisanId, kyc, isVerified, onSuccess }: KYCTabProps) => {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const { reviewKyc } = useAdminArtisans();
  const { mutateAsync, isPending } = reviewKyc(artisanId);

  const hasDocuments =
    kyc?.govtIdFront || kyc?.govtIdBack || kyc?.certification || kyc?.customerReference;

  // artisan.verificationStatus is the source of truth after a successful review
  const effectiveStatus: KycStatus | undefined =
    isVerified ? "verified" : kyc?.status;

  const handleApprove = async () => {
    try {
      await mutateAsync({ status: "verified" });
      toast.success("KYC verified successfully");
      onSuccess();
    } catch {
      toast.error("Failed to approve KYC. Please try again.");
    }
  };

  const handleReject = async () => {
    if (!rejectNote.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    try {
      await mutateAsync({ status: "rejected", note: rejectNote.trim() });
      toast.success("KYC rejected");
      setShowRejectForm(false);
      setRejectNote("");
      onSuccess();
    } catch {
      toast.error("Failed to reject KYC. Please try again.");
    }
  };

  if (!kyc) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-300">
        <ShieldCheck className="w-12 h-12" />
        <p className="text-sm text-gray-400">No KYC submission found for this artisan</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Status header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#02198B]/[0.06] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#02198B]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">KYC Verification Documents</p>
            <p className="text-xs text-gray-400 mt-0.5">Review submitted identity and certification documents</p>
          </div>
        </div>
        <KycStatusBadge status={effectiveStatus} />
      </div>

      {/* Rejection note (if rejected) */}
      {effectiveStatus === "rejected" && kyc.rejectionNote && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-red-700 mb-0.5">Rejection Reason</p>
            <p className="text-xs text-red-600">{kyc.rejectionNote}</p>
          </div>
        </div>
      )}

      {/* Documents grid */}
      {hasDocuments ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DocCard label="Government ID (Front)" doc={kyc.govtIdFront} />
          <DocCard label="Government ID (Back)"  doc={kyc.govtIdBack} />
          <DocCard label="Certification"         doc={kyc.certification} />
          <DocCard label="Customer Reference"    doc={kyc.customerReference} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-2 text-gray-300">
          <FileText className="w-8 h-8" />
          <p className="text-sm text-gray-400">No documents uploaded yet</p>
        </div>
      )}

      {/* Review actions — only show if documents exist and status is pending/undefined */}
      {hasDocuments && (!effectiveStatus || effectiveStatus === "pending") && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4">
          <p className="text-sm font-semibold text-gray-700">Review Decision</p>

          <div className="flex flex-wrap gap-3">
            {/* Approve */}
            <button
              onClick={handleApprove}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium
                hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              Approve KYC
            </button>

            {/* Reject toggle */}
            <button
              onClick={() => setShowRejectForm((v) => !v)}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 text-sm font-medium
                hover:bg-red-50 disabled:opacity-50 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Reject KYC
              {showRejectForm ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Rejection form */}
          {showRejectForm && (
            <div className="flex flex-col gap-3 pt-1">
              <textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder="Provide a reason for rejection (required)…"
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800
                  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleReject}
                  disabled={isPending || !rejectNote.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium
                    hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Confirm Rejection
                </button>
                <button
                  onClick={() => { setShowRejectForm(false); setRejectNote(""); }}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Re-review actions for already-decided KYC */}
      {hasDocuments && effectiveStatus && effectiveStatus !== "pending" && (
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            This KYC has been <span className="font-semibold">{effectiveStatus}</span>. You can reverse the decision below.
          </p>
          <button
            disabled={isPending}
            onClick={async () => {
              if (effectiveStatus === "verified") {
                setShowRejectForm((v) => !v);
              } else {
                await handleApprove();
              }
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors disabled:opacity-50 ${
              effectiveStatus === "verified"
                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
                : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-100"
            }`}
          >
            {effectiveStatus === "verified" ? (
              <><XCircle className="w-3.5 h-3.5" /> Reverse to Rejected</>
            ) : (
              <><CheckCircle2 className="w-3.5 h-3.5" /> Reverse to Approved</>
            )}
          </button>
        </div>
      )}

      {/* Reject form when reversing approved status */}
      {showRejectForm && effectiveStatus === "verified" && (
        <div className="flex flex-col gap-3 p-4 rounded-xl bg-white border border-red-100 shadow-sm">
          <p className="text-sm font-semibold text-red-700">Rejection Reason</p>
          <textarea
            value={rejectNote}
            onChange={(e) => setRejectNote(e.target.value)}
            placeholder="Provide a reason for rejection (required)…"
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-800
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all"
          />
          <div className="flex gap-2">
            <button
              onClick={handleReject}
              disabled={isPending || !rejectNote.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium
                hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Confirm Rejection
            </button>
            <button
              onClick={() => { setShowRejectForm(false); setRejectNote(""); }}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCTab;
