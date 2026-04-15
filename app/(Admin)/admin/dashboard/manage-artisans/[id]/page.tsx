"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  CheckCircle2,
  MapPin,
  Mail,
  Calendar,
  DollarSign,
  Ruler,
  Clock,
  Tag,
  AlertTriangle,
  StickyNote,
  User,
  Star,
} from "lucide-react";

import { useAdminArtisans } from "@/api/crud/admin";

import BackLink from "@/components/admin/shared/BackLink";
import Section from "@/components/admin/shared/Section";
import InfoRow from "@/components/admin/shared/InfoRow";
import {
  AccountStatusBadge,
  VerificationBadge,
  SubscriptionBadge,
  FeaturedBadge,
} from "@/components/admin/shared/badges";
import StatusPanel from "@/components/admin/artisans/StatusPanel";
import VerifyButton from "@/components/admin/artisans/VerifyButton";
import FeaturedButton from "@/components/admin/artisans/FeaturedButton";
import NotesSection from "@/components/admin/artisans/NotesSection";
import HeroSkeleton from "@/components/admin/artisans/HeroSkeleton";

const ArtisanDetails = () => {
  const params = useParams();
  const artisanId = params?.id as string;
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"profile" | "notes">("profile");

  const { getAdminArtisanById } = useAdminArtisans();
  const { data, isLoading, isError } = getAdminArtisanById(artisanId);

  const artisan = data?.data?.artisan;
  const notes = data?.data?.internalNotes ?? [];

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin_artisan", artisanId] });

  // ── Loading ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className="flex flex-col gap-5">
        <BackLink href="/admin/dashboard/manage-artisans" label="Back to Artisans" />
        <HeroSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-48 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  // ── Error / not found ────────────────────────────────────────
  if (isError || !artisan) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-24">
        <AlertTriangle className="w-10 h-10 text-amber-400" />
        <p className="text-base font-semibold text-gray-700">Artisan not found</p>
        <BackLink href="/admin/dashboard/manage-artisans" label="← Back to Artisans" />
      </section>
    );
  }

  const initials = `${artisan.firstName?.[0] ?? ""}${artisan.lastName?.[0] ?? ""}`.toUpperCase();
  const workDays = artisan.workingDaysAndHours ?? [];

  const TABS = [
    { key: "profile", label: "Profile",               icon: User      },
    { key: "notes",   label: `Notes (${notes.length})`, icon: StickyNote },
  ] as const;

  return (
    <section className="flex flex-col gap-5">
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <BackLink href="/admin/dashboard/manage-artisans" label="Back to Artisans" />

      {/* ── Hero card ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Branded top strip */}
        <div className="h-1.5 w-full rounded-t-2xl bg-gradient-to-r from-[#02198B] via-[#1e3a8a] to-[#F0C422]" />

        <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-5">
          {/* Avatar */}
          <div className="shrink-0">
            {artisan.profilePicture ? (
              <Image
                src={artisan.profilePicture}
                alt={`${artisan.firstName} ${artisan.lastName}`}
                width={80}
                height={80}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-gray-100 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#02198B] to-[#1e3a8a]
                flex items-center justify-center ring-2 ring-gray-100 shadow-sm">
                <span className="text-2xl font-bold text-white">{initials}</span>
              </div>
            )}
          </div>

          {/* Core info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {artisan.firstName} {artisan.lastName}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">{artisan.professionalTitle}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {artisan.userId?.email}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <StatusPanel
                  artisanId={artisanId}
                  current={artisan.accountStatus ?? "active"}
                  onSuccess={invalidate}
                />
                <VerifyButton
                  artisanId={artisanId}
                  isVerified={artisan.verificationStatus === "verified"}
                  onSuccess={invalidate}
                />
                <FeaturedButton
                  artisanId={artisanId}
                  featured={artisan.featuredOnHomepage}
                  onSuccess={invalidate}
                />
              </div>
            </div>

            {/* Status badge row */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <AccountStatusBadge status={artisan.accountStatus} />
              <VerificationBadge verified={artisan.verificationStatus === "verified"} />
              <SubscriptionBadge active={artisan.isSubscribed} />
              {artisan.featuredOnHomepage && <FeaturedBadge featured />}
              <span className="text-xs text-gray-400 ml-auto">
                Joined {artisan.createdAt ? format(new Date(artisan.createdAt), "MMM d, yyyy") : "—"}
              </span>
            </div>

            {/* Suspension / refund alerts */}
            {artisan.suspensionReason && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  <span className="font-semibold">Suspension reason:</span> {artisan.suspensionReason}
                </p>
              </div>
            )}
            {artisan.refundFlag && artisan.refundFlagNote && (
              <div className="mt-2 flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">
                  <span className="font-semibold">Refund flag:</span> {artisan.refundFlagNote}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-50 px-6 flex gap-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                ${
                  activeTab === key
                    ? "border-[#02198B] text-[#02198B]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ─────────────────────────────────────── */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Personal details */}
          <Section title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InfoRow icon={User}       label="Gender"        value={artisan.gender} />
              <InfoRow
                icon={Calendar}
                label="Date of Birth"
                value={
                  artisan.dateOfBirth
                    ? format(new Date(artisan.dateOfBirth), "MMM d, yyyy")
                    : undefined
                }
              />
              <InfoRow
                icon={MapPin}
                label="Location"
                value={[artisan.primaryLocation, artisan.state, artisan.country]
                  .filter(Boolean)
                  .join(", ")}
              />
              <InfoRow
                icon={DollarSign}
                label="Price / Hour"
                value={artisan.pricePerHour != null ? `$${artisan.pricePerHour}/hr` : undefined}
              />
              <InfoRow
                icon={Ruler}
                label="Work Distance"
                value={artisan.workDistanceKm != null ? `${artisan.workDistanceKm} km` : undefined}
              />
              <InfoRow
                icon={Star}
                label="Service Radius"
                value={artisan.serviceRadius?.replace(/_/g, " ")}
              />
            </div>
          </Section>

          {/* Service categories */}
          <Section title="Service Categories">
            {artisan.serviceCategories?.length ? (
              <div className="flex flex-wrap gap-2">
                {artisan.serviceCategories.map((cat) => (
                  <span
                    key={cat._id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#02198B]/[0.06] text-[#02198B] text-xs font-medium"
                  >
                    <Tag className="w-3 h-3" />
                    {cat.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No categories assigned</p>
            )}

            {/* Working hours */}
            {workDays.length > 0 && (
              <>
                <div className="mt-5 mb-3 flex items-center gap-2">
                  <div className="w-1 h-3.5 bg-[#02198B] rounded-full" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Working Hours
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {workDays.map((wd) => (
                    <div key={wd._id} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700 w-28">{wd.day}</span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {wd.startTime} – {wd.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Section>

          {/* Skill description */}
          {artisan.skillDescription && (
            <div className="lg:col-span-2">
              <Section title="About / Skill Description">
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {artisan.skillDescription}
                </p>
              </Section>
            </div>
          )}
        </div>
      )}

      {activeTab === "notes" && (
        <Section title="Internal Notes">
          <NotesSection
            artisanId={artisanId}
            notes={notes}
            onNoteAdded={invalidate}
          />
        </Section>
      )}
    </section>
  );
};

export default ArtisanDetails;
