"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { IDE_THEMES } from "@/data/ideThemes";
import { useTheme } from "@/components/ide/ThemeProvider";

export function ThemeDropdown() {
  const { theme, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded border border-ide-border bg-ide-tab-bg px-2.5 py-1 text-[11px] text-ide-text transition hover:border-ide-accent"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex gap-0.5">
          <span
            className="h-2.5 w-2.5 rounded-sm"
            style={{ background: theme.colors.bg }}
          />
          <span
            className="h-2.5 w-2.5 rounded-sm"
            style={{ background: theme.colors.keyword }}
          />
          <span
            className="h-2.5 w-2.5 rounded-sm"
            style={{ background: theme.colors.string }}
          />
          <span
            className="h-2.5 w-2.5 rounded-sm"
            style={{ background: theme.colors.type }}
          />
        </span>
        <span className="max-w-[100px] truncate">{theme.name}</span>
        <FiChevronDown
          className={`h-3 w-3 shrink-0 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-[100] mt-1 max-h-[320px] w-[220px] overflow-y-auto rounded border border-ide-border bg-ide-sidebar py-1 shadow-xl editor-scroll"
        >
          <p className="px-3 py-1.5 font-mono text-[10px] text-ide-syntax-comment">
            Color Theme
          </p>
          {IDE_THEMES.map((t) => {
            const active = t.id === theme.id;
            return (
              <button
                key={t.id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setThemeId(t.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left font-mono text-[11px] transition hover:bg-ide-card-hover ${
                  active ? "text-ide-property" : "text-ide-text"
                }`}
              >
                <span className="flex shrink-0 gap-0.5">
                  <span
                    className="h-3 w-3 rounded-sm border border-ide-border"
                    style={{ background: t.colors.bg }}
                  />
                  <span
                    className="h-3 w-3 rounded-sm"
                    style={{ background: t.colors.keyword }}
                  />
                  <span
                    className="h-3 w-3 rounded-sm"
                    style={{ background: t.colors.string }}
                  />
                  <span
                    className="h-3 w-3 rounded-sm"
                    style={{ background: t.colors.type }}
                  />
                </span>
                <span className="min-w-0 flex-1 truncate">{t.name}</span>
                {active && <FiCheck className="h-3 w-3 shrink-0 text-ide-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
