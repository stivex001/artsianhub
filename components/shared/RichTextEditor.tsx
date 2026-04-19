"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Unlink,
  Heading2,
  RemoveFormatting,
} from "lucide-react";
import { useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: string;
}

// ─── Toolbar button ──────────────────────────────────────────────────────────
const ToolbarBtn = ({
  onClick,
  active,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    disabled={disabled}
    title={title}
    className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all
      ${active
        ? "bg-[#02198B]/10 text-[#02198B]"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      } disabled:opacity-30 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);

// ─── Divider ─────────────────────────────────────────────────────────────────
const Divider = () => <div className="w-px h-5 bg-gray-200 mx-0.5 shrink-0" />;

// ─── Main component ──────────────────────────────────────────────────────────
const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write your message here…",
  maxLength,
  minHeight = "160px",
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[#02198B] underline cursor-pointer" },
      }),
      Placeholder.configure({ placeholder }),
      ...(maxLength ? [CharacterCount.configure({ limit: maxLength })] : []),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // treat empty editor as empty string so canSubmit works properly
      onChange(editor.isEmpty ? "" : html);
    },
    editorProps: {
      attributes: {
        class: "outline-none prose prose-sm max-w-none leading-relaxed text-gray-900",
        style: `min-height: ${minHeight}`,
      },
    },
    immediatelyRender: false,
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const charCount = maxLength ? editor.storage.characterCount?.characters?.() ?? 0 : null;
  const nearLimit = maxLength && charCount !== null && charCount >= maxLength * 0.9;

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#02198B]/20 focus-within:border-[#02198B]/40">
      {/* ── Toolbar ──────────────────────────────────────────────────── */}
      <div className="flex items-center flex-wrap gap-0.5 px-2.5 py-1.5 bg-gray-50 border-b border-gray-100">
        {/* Text style */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Heading */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Lists */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Alignment */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align left"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align center"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align right"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Link */}
        <ToolbarBtn
          onClick={setLink}
          active={editor.isActive("link")}
          title="Insert link"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          title="Remove link"
        >
          <Unlink className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <Divider />

        {/* Clear formatting */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          title="Clear formatting"
        >
          <RemoveFormatting className="w-3.5 h-3.5" />
        </ToolbarBtn>
      </div>

      {/* ── Editor area ──────────────────────────────────────────────── */}
      <EditorContent
        editor={editor}
        className="px-3.5 py-3 bg-white rich-text-editor"
      />

      {/* ── Character count ───────────────────────────────────────────── */}
      {maxLength && charCount !== null && (
        <div className={`px-3.5 py-1.5 bg-gray-50 border-t border-gray-100 text-right text-[11px] font-medium
          ${nearLimit ? "text-orange-500" : "text-gray-400"}`}>
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
