import { SECTIONS } from "./terms.data";

interface Props {
  activeId: string;
  onSelect: (id: string) => void;
}

export function TermsTOC({ activeId, onSelect }: Props) {
  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold tracking-[0.16em] uppercase text-gray-400 mb-4">Contents</p>
      <ul className="space-y-0.5">
        {SECTIONS.map((s) => {
          const active = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => onSelect(s.id)}
                className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  active ? "font-semibold" : "text-gray-500 hover:text-gray-700"
                }`}
                style={active ? { color: "#02198B", background: "rgba(2,25,139,0.07)" } : {}}
              >
                <span
                  className="w-5 text-right text-xs flex-shrink-0 tabular-nums"
                  style={{ color: active ? "#F0C422" : "#ccc" }}
                >
                  {s.num}
                </span>
                <span className="leading-snug">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
