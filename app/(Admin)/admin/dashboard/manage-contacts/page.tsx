"use client";

import { useContactUs } from "@/api/crud/contact";
import ContactUsTable from "@/components/contact-us/ContactUsTable";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import Wrapper from "@/components/shared/Wrapper";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

const ManageContacts = () => {
  const { getAllContact } = useContactUs();
  const { data: contacts = [], isPending } = getAllContact();

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const totalPages = 5;
  const entriesPerPage = 10;

  return (
    <section className="flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Contacts</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and respond to all contact enquiries
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 text-primary rounded-xl px-4 py-2 shrink-0">
          <Mail className="w-4 h-4" />
          <span className="text-sm font-medium">
            {Array.isArray(contacts) ? contacts.length : 0} enquiries
          </span>
        </div>
      </div>

      {/* ── Date Filter ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider shrink-0">
            Filter by date
          </p>
          <CustomDatePicker
            range
            date={date}
            setDate={setDate}
            className="h-10"
          />
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      <Wrapper className="overflow-hidden no-scrollbar scrollbar-hidden shadow-sm border border-gray-100 !p-0">
        {isPending ? (
          <div className="p-5">
            <SkeletonTableLoader />
          </div>
        ) : Array.isArray(contacts) && contacts.length > 0 ? (
          <div>
            <ContactUsTable contacts={contacts} />
            <div className="px-5 pb-4">
              <Pagination
                currentPage={currentPage}
                totalEntries={totalPages}
                entriesPerPage={entriesPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-2 text-gray-400">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <p className="text-sm">No contact enquiries yet</p>
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default ManageContacts;
