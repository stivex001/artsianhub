"use client";

import React, { useState, useMemo } from "react";
import { useAdminManagement } from "@/apis/crud/admin";
import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (id: string) => void;
}

const ROLE_LABEL: Record<string, string> = {
  ADMIN:       "Admin",
  SUPER_ADMIN: "Super Admin",
};

const AdminPicker = ({ value, onChange }: Props) => {
  const [search, setSearch] = useState("");
  const [open, setOpen]     = useState(false);

  const { getAllAdmins } = useAdminManagement();
  const { data, isPending } = getAllAdmins();

  const allAdmins = useMemo(
    () => (data?.data ?? []).filter((a) => a.status === "active"),
    [data]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allAdmins;
    return allAdmins.filter(
      (a) => a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
    );
  }, [allAdmins, search]);

  const selected = allAdmins.find((a) => a._id === value);

  return (
    <div className="flex flex-col gap-1.5 flex-1">
      {selected ? (
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-primary/5 border border-primary/20">
          <div className="min-w-0">
            <span className="text-sm font-medium text-gray-900">{selected.name}</span>
            <span className="text-xs text-gray-400 ml-2">{ROLE_LABEL[selected.role] ?? selected.role}</span>
            <p className="text-xs text-gray-400 truncate">{selected.email}</p>
          </div>
          <div className="flex items-center gap-2 ml-2 shrink-0">
            <button
              type="button"
              onClick={() => { setOpen(true); setSearch(""); }}
              className="text-xs text-primary font-medium hover:underline"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              placeholder="Search admins by name or email…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {open && (
            <div className="max-h-40 overflow-y-auto rounded-xl border border-gray-100 divide-y divide-gray-50">
              {isPending ? (
                <p className="text-xs text-gray-400 text-center py-3">Loading…</p>
              ) : filtered.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-3">No admins found</p>
              ) : (
                filtered.map((admin) => (
                  <button
                    key={admin._id}
                    type="button"
                    onClick={() => { onChange(admin._id); setOpen(false); setSearch(""); }}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{admin.name}</p>
                      <p className="text-xs text-gray-400 truncate">{admin.email}</p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 shrink-0 ml-2">
                      {ROLE_LABEL[admin.role] ?? admin.role}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPicker;
