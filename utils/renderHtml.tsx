import React from "react";

/**
 * Renders trusted HTML content from the server (e.g. rich-text broadcast messages).
 *
 * ⚠️  Only use this for content originating from the platform's own backend.
 *      Never pass user-supplied strings that haven't been sanitised server-side.
 *
 * @param html      - The raw HTML string to render.
 * @param className - Optional Tailwind / CSS class names for the wrapper element.
 * @param tag       - Wrapper element tag (default: "div").
 */
export function renderHtml(
  html: string | null | undefined,
  className?: string,
  tag: keyof React.JSX.IntrinsicElements = "div"
): React.ReactElement | null {
  if (!html || html.trim() === "" || html === "<p></p>") return null;

  return React.createElement(tag, {
    className,
    dangerouslySetInnerHTML: { __html: html },
  });
}

/**
 * Component wrapper around renderHtml — use this inside JSX when you need
 * fine-grained control over the wrapper element or className.
 *
 * @example
 * <RenderHtml html={notification.message} className="text-xs text-gray-500" />
 */
export const RenderHtml = ({
  html,
  className,
  tag = "div",
}: {
  html: string | null | undefined;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
}): React.ReactElement | null => renderHtml(html, className, tag);
