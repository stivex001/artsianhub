"use client";

import React, { useState, useMemo } from "react";
import { useAdminClients, useAdminArtisans } from "@/apis/crud/admin";
import { Search, X } from "lucide-react";

interface Props {
  role: "client" | "artisan";
  value: string;
  onChange: (id: string) => void;
}

const RecipientPicker = ({ role, value, onChange }: Props) => {
  const [search, setSearch]   = useState("");
  const [open, setOpen]       = useState(false);

  const { getAllClients }    = useAdminClients();
  const { getAdminArtisans } = useAdminArtisans();

  const clientsQuery   = getAllClients({ limit: 100 });
  const artisansQuery  = getAdminArtisans({ limit: 100 });

  const isPending = role === "client" ? clientsQuery.isPending : artisansQuery.isPending;

  const allItems = useMemo(() => {
    if (role === "client") {
      return (clientsQuery.data?.data ?? []).map((c) => ({
        id:    c._id,
        name:  `${c.firstName} ${c.lastName}`.trim(),
        email: c.userId?.email ?? "",
      }));
    }
    return (artisansQuery.data?.data ?? []).map((a) => ({
      id:    a._id,
      name:  `${a.firstName} ${a.lastName}`.trim(),
      email: a.userId?.email ?? "",
    }));
  }, [role, clientsQuery.data, artisansQuery.data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allItems;
    return allItems.filter(
      (i) => i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q)
    );
  }, [allItems, search]);

  const selected = allItems.find((i) => i.id === value);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-700">Recipient</label>

      {selected ? (
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-primary/5 border border-primary/20">
          <div className="min-w-0">
            <span className="text-sm font-medium text-gray-900">{selected.name}</span>
            <span className="text-xs text-gray-400 ml-2 truncate">{selected.email}</span>
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
              placeholder={`Search ${role}s by name or email…`}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {open && (
            <div className="max-h-44 overflow-y-auto rounded-xl border border-gray-100 divide-y divide-gray-50">
              {isPending ? (
                <p className="text-xs text-gray-400 text-center py-4">Loading…</p>
              ) : filtered.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No {role}s found</p>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { onChange(item.id); setOpen(false); setSearch(""); }}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 truncate">{item.email}</p>
                    </div>
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

export default RecipientPicker;
