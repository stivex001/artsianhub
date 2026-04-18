"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useAdminClients, useAdminArtisans } from "@/apis/crud/admin";
import { Search, X, Users } from "lucide-react";

interface Recipient {
  id: string;
  name: string;
  email: string;
}

interface Props {
  role: "client" | "artisan";
  selected: Recipient[];
  onChange: (recipients: Recipient[]) => void;
}

const MultiRecipientPicker = ({ role, selected, onChange }: Props) => {
  const [search, setSearch]   = useState("");
  const [open, setOpen]       = useState(false);
  const containerRef          = useRef<HTMLDivElement>(null);

  const { getAllClients }    = useAdminClients();
  const { getAdminArtisans } = useAdminArtisans();

  const clientsQuery  = getAllClients({ limit: 200 });
  const artisansQuery = getAdminArtisans({ limit: 200 });

  const isPending = role === "client" ? clientsQuery.isPending : artisansQuery.isPending;

  const allItems = useMemo<Recipient[]>(() => {
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

  const selectedIds = useMemo(() => new Set(selected.map((r) => r.id)), [selected]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allItems.filter(
      (i) =>
        !selectedIds.has(i.id) &&
        (!q || i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q))
    );
  }, [allItems, search, selectedIds]);

  const add = (item: Recipient) => {
    onChange([...selected, item]);
    setSearch("");
  };

  const remove = (id: string) => {
    onChange(selected.filter((r) => r.id !== id));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2.5 bg-gray-50 rounded-xl border border-gray-100 min-h-[44px]">
          {selected.map((r) => (
            <span
              key={r.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#02198B]/[0.07]
                text-[#02198B] text-xs font-medium max-w-[200px]"
            >
              <span className="truncate">{r.name}</span>
              <button
                type="button"
                onClick={() => remove(r.id)}
                className="shrink-0 hover:bg-[#02198B]/10 rounded-full p-0.5 transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-[11px] text-gray-400 hover:text-red-500 transition-colors ml-auto self-center px-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={`Search ${role}s by name or email…`}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition-all"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="max-h-52 overflow-y-auto rounded-xl border border-gray-100 shadow-lg bg-white divide-y divide-gray-50">
          {isPending ? (
            <p className="text-xs text-gray-400 text-center py-5">Loading {role}s…</p>
          ) : filtered.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-5">
              {allItems.length === 0 ? `No ${role}s found` : "All matching recipients already selected"}
            </p>
          ) : (
            filtered.slice(0, 50).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => add(item)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#02198B]/[0.08] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-[#02198B]">
                    {item.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 truncate">{item.email}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Count indicator */}
      {selected.length > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Users className="w-3 h-3" />
          <span>{selected.length} recipient{selected.length !== 1 ? "s" : ""} selected</span>
        </div>
      )}
    </div>
  );
};

export default MultiRecipientPicker;
