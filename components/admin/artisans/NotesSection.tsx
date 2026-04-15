"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Send, Loader2, StickyNote, User } from "lucide-react";
import { useAdminArtisans, InternalNote } from "@/api/crud/admin";

interface NotesSectionProps {
  artisanId: string;
  notes: InternalNote[];
  onNoteAdded: () => void;
}

/**
 * Internal admin notes section for an artisan.
 * Includes an add-note form and a chronological notes timeline.
 * Only visible to admins — notes are never shown to the artisan.
 */
const NotesSection = ({ artisanId, notes, onNoteAdded }: NotesSectionProps) => {
  const [noteText, setNoteText] = useState("");
  const { addArtisanNote } = useAdminArtisans();
  const { mutateAsync, isPending } = addArtisanNote(artisanId);

  const handleSubmit = async () => {
    if (!noteText.trim()) return;
    try {
      await mutateAsync({ content: noteText.trim() });
      toast.success("Note added successfully.");
      setNoteText("");
      onNoteAdded();
    } catch {
      toast.error("Failed to add note.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ── Add note form ──────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add an internal note visible only to admins…"
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 resize-none bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40
            placeholder-gray-400 transition"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isPending || !noteText.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#02198B] text-white text-sm font-medium
              hover:bg-[#011571] disabled:opacity-50 transition-colors"
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Add Note
          </button>
        </div>
      </div>

      {/* ── Notes list ─────────────────────────────────────── */}
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2 text-gray-400">
          <StickyNote className="w-7 h-7 text-gray-300" />
          <p className="text-sm">No internal notes yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <div key={note._id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#02198B]/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-[#02198B]" />
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <p className="text-xs font-semibold text-gray-700">{note.adminName}</p>
                  <p className="text-[11px] text-gray-400">
                    {format(new Date(note.createdAt), "MMM d, yyyy · h:mm a")}
                  </p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{note.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesSection;
