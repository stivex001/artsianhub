"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Star,
  Briefcase,
  Image as ImageIcon,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { JobActionButtons } from "./JobActionButtons";
import { formatDate } from "@/utils/formatDate";
import { CancelModal } from "@/components/Artisan/manageAppointment/CancelModal";
import { RescheduleModal } from "@/components/Artisan/manageAppointment/RescheduleModal";
import { ReviewModal } from "@/components/Artisan/manageAppointment/ReviewModal";
import { ContactArtisanModal } from "../ContactArtisanModal";
import { useNotification } from "@/apis/crud/notification";

type Props = {
  item: any;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

/* ---------- animation variants ---------- */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 30, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

/* ---------- small helpers ---------- */
const DetailRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 py-3.5 border-b border-bordergrey/50 last:border-0">
    <div className="mt-0.5 w-8 h-8 rounded-lg bg-operationBg flex items-center justify-center shrink-0 text-primary">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[0.72rem] font-medium text-textgray uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <div className="text-[0.88rem] font-medium text-textdeep">{children}</div>
    </div>
  </div>
);

/* ---------- component ---------- */
export const JobDetailModal = ({ isOpen, onClose, item, refetch }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const [isModalReScheduleOpen, setIsModalRescheduleOpen] = useState(false);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [isModalRebookOpen, setIsModalRebookOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { getAllNotifications } = useNotification();
  const { refetch: notifyRefetch } = getAllNotifications();

  const jobData = item;
  const artisan = jobData?.artisanId;
  const artisanInfo = jobData?.artisanInfo;

  const descriptionText: string = jobData?.description ?? "";
  const isLongDesc = descriptionText.length > 180;
  const displayDesc =
    isLongDesc && !descExpanded
      ? descriptionText.slice(0, 180) + "…"
      : descriptionText;

  const modal = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* centering shell */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 pointer-events-none">
            <motion.div
              key="card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Job Details"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[600px] max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-[0_24px_80px_rgba(2,25,139,0.16)] overflow-hidden pointer-events-auto"
            >
              {/* ── sticky header ── */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-bordergrey/60">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-5 rounded-full bg-primary" />
                  <h2 className="text-[1.05rem] font-bold text-textdeep">Job Details</h2>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={jobData?.status} />
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-milky hover:bg-bordergrey/60 text-textgray hover:text-body transition-all duration-150 ml-1"
                  >
                    <X size={15} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* ── scrollable body ── */}
              <div className="flex-1 overflow-y-auto no-scrollbar">

                {/* artisan hero card */}
                <div className="mx-5 mt-5 p-4 rounded-xl bg-gradient-to-r from-[#02198B08] to-[#516CF408] border border-primary/8">
                  <div className="flex items-center gap-4">
                    {/* avatar */}
                    <div className="w-[68px] h-[68px] rounded-2xl bg-lightgray overflow-hidden shrink-0 shadow-sm">
                      {artisan?.profilePicture ? (
                        <Image
                          src={artisan.profilePicture}
                          alt={`${artisan.firstName} ${artisan.lastName}`}
                          width={68}
                          height={68}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-accountBg flex items-center justify-center text-lg font-bold text-primary">
                          {artisan?.firstName?.charAt(0)?.toUpperCase()}
                          {artisan?.lastName?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.95rem] font-bold text-textdeep truncate">
                        {artisan?.firstName} {artisan?.lastName}
                      </p>
                      <p className="text-[0.8rem] text-textcolor truncate mt-0.5">
                        {artisan?.professionalTitle}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        {/* rating */}
                        <div className="flex items-center gap-1">
                          <Star size={13} className="fill-accent text-accent" />
                          <span className="text-[0.78rem] font-semibold text-textdeep">
                            {artisanInfo?.rating ?? 1}
                          </span>
                          <span className="text-[0.75rem] text-textgray">
                            ({jobData?.completedJobs ?? 0} jobs)
                          </span>
                        </div>

                        {/* price */}
                        {artisanInfo?.pricePerHour && (
                          <span className="text-[0.78rem] font-bold text-primary">
                            ${artisanInfo.pricePerHour}/hr
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* location row */}
                  {artisanInfo?.primaryLocation && (
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-primary/8">
                      <MapPin size={13} className="text-textgray shrink-0" />
                      <span className="text-[0.78rem] text-textcolor">
                        {artisanInfo.primaryLocation}
                      </span>
                    </div>
                  )}
                </div>

                {/* detail rows */}
                <div className="px-5 mt-5">
                  <DetailRow
                    icon={<Briefcase size={15} />}
                    label="Job Title"
                  >
                    {artisan?.professionalTitle ?? "—"}
                  </DetailRow>

                  <DetailRow
                    icon={<Calendar size={15} />}
                    label="Service Date"
                  >
                    {formatDate(jobData?.preferredDate)}{" "}
                    {jobData?.preferredTime && (
                      <span className="text-textgray font-normal">
                        · {jobData.preferredTime}
                      </span>
                    )}
                  </DetailRow>

                  <DetailRow
                    icon={<MapPin size={15} />}
                    label="Location"
                  >
                    {jobData?.location ?? "—"}
                  </DetailRow>

                  {/* services */}
                  {jobData?.serviceCategories?.length > 0 && (
                    <DetailRow
                      icon={<Clock size={15} />}
                      label="Services"
                    >
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {jobData.serviceCategories.map((service: any) => (
                          <span
                            key={service?._id}
                            className="px-2.5 py-1 bg-operationBg text-primary rounded-full text-[0.75rem] font-medium"
                          >
                            {service?.name}
                          </span>
                        ))}
                      </div>
                    </DetailRow>
                  )}

                  {/* reason if any */}
                  {jobData?.reason && (
                    <DetailRow
                      icon={<FileText size={15} />}
                      label="Reason"
                    >
                      <span className="italic text-textcolor">
                        &quot;{jobData.reason}&quot;
                      </span>
                    </DetailRow>
                  )}
                </div>

                {/* description */}
                {descriptionText && (
                  <div className="px-5 mt-1 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 rounded-full bg-accent" />
                      <p className="text-[0.78rem] font-semibold text-textgray uppercase tracking-wider">
                        Job Description
                      </p>
                    </div>
                    <p className="text-[0.86rem] text-body leading-relaxed whitespace-pre-line">
                      {displayDesc}
                    </p>
                    {isLongDesc && (
                      <button
                        onClick={() => setDescExpanded((v) => !v)}
                        className="flex items-center gap-1 mt-1.5 text-[0.78rem] font-semibold text-primary hover:underline"
                      >
                        {descExpanded ? (
                          <><ChevronUp size={13} /> Show less</>
                        ) : (
                          <><ChevronDown size={13} /> Read more</>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* attachments */}
                <div className="px-5 mt-4 pb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 rounded-full bg-accent" />
                    <p className="text-[0.78rem] font-semibold text-textgray uppercase tracking-wider">
                      Attachments
                    </p>
                  </div>

                  {jobData?.images?.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {jobData.images.map((attachment: any, index: number) => (
                        <div
                          key={attachment?._id ?? index}
                          className="aspect-square relative rounded-xl overflow-hidden bg-milky cursor-pointer group"
                        >
                          <Image
                            src={attachment?.url}
                            alt={`Attachment ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 rounded-xl bg-milky border border-dashed border-bordergrey">
                      <ImageIcon size={28} className="text-bordergray mb-2" />
                      <p className="text-[0.8rem] text-textgray">No attachments</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── sticky footer ── */}
              <div className="sticky bottom-0 z-10 px-6 py-4 bg-white border-t border-bordergrey/60">
                <JobActionButtons
                  status={jobData?.status}
                  onCancel={() => setIsModalCancelOpen(true)}
                  onReschedule={() => setIsModalRescheduleOpen(true)}
                  onMarkNoShow={() => console.log("No show clicked")}
                  onMarkCompleted={() => console.log("Completed clicked")}
                  onReview={() => setIsModalReviewOpen(true)}
                  onRebook={() => setIsModalRebookOpen(true)}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return (
    <>
      {createPortal(modal, document.body)}

      <CancelModal
        isOpen={isModalCancelOpen}
        onClose={() => { setIsModalCancelOpen(false); onClose(); }}
        id={item?._id}
        refetch={refetch}
        notifyRefecth={notifyRefetch}
        user="Client"
      />
      <RescheduleModal
        isOpen={isModalReScheduleOpen}
        onClose={() => { setIsModalRescheduleOpen(false); onClose(); }}
        id={item?._id}
        refetch={refetch}
        notifyRefecth={notifyRefetch}
      />
      <ReviewModal
        isOpen={isModalReviewOpen}
        onClose={() => { setIsModalReviewOpen(false); onClose(); }}
        id={item?._id}
        artisanId={artisan?._id}
        name={`${artisan?.firstName} ${artisan?.lastName}`}
        notifyRefecth={notifyRefetch}
      />
      <ContactArtisanModal
        isOpen={isModalRebookOpen}
        onClose={() => { setIsModalRebookOpen(false); onClose(); }}
        item={jobData}
        mode="rebook"
      />
    </>
  );
};
