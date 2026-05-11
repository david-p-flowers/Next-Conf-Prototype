"use client";

import { useState } from "react";

interface SectionGroup {
  title: string;
  items: { label: string; icon?: string }[];
  defaultOpen?: boolean;
}

const sections: SectionGroup[] = [
  {
    title: "Final Output",
    defaultOpen: true,
    items: [
      { label: "Markdown Article", icon: "doc" },
    ],
  },
  {
    title: "Inputs",
    defaultOpen: false,
    items: [],
  },
];

interface SectionNavProps {
  width?: number;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export default function SectionNav({ width = 200, defaultCollapsed = false, onCollapsedChange }: SectionNavProps) {
  const isNarrow = width < 80;
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleCollapse = (value: boolean) => {
    setCollapsed(value);
    onCollapsedChange?.(value);
  };
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(sections.filter((s) => s.defaultOpen).map((s) => s.title))
  );
  const [activeItem, setActiveItem] = useState("Markdown Article");

  const toggleSection = (title: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  if (collapsed || isNarrow) {
    return (
      <div className="flex flex-col items-start pt-4 px-2 h-full" style={{ gap: 20 }}>
        <button
          onClick={() => handleCollapse(false)}
          className="w-7 h-7 flex items-center justify-center rounded border border-[rgba(9,9,11,0.08)] hover:bg-white/60"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 4h8M3 7h8M3 10h8" stroke="#09090b" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto pt-8 px-2 h-full" style={{ gap: 20 }}>
      <div>
        <button
          onClick={() => handleCollapse(true)}
          className="w-7 h-7 flex items-center justify-center rounded border border-[rgba(9,9,11,0.08)] bg-white hover:bg-[#fafafa]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 4h8M3 7h8M3 10h8" stroke="#09090b" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col">
        {sections.map((section) => (
          <div key={section.title} className="mb-1">
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full px-2 py-1.5 text-[11px] font-medium text-[#9ca3af] hover:text-[#4b4d58]"
            >
              <span>{section.title}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform ${openSections.has(section.title) ? "rotate-0" : "-rotate-90"}`}
              >
                <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {openSections.has(section.title) && section.items.length > 0 && (
              <div className="flex flex-col">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveItem(item.label)}
                  className={`flex items-center gap-2 py-1.5 text-[12px] text-left transition-colors rounded-md ${
                    activeItem === item.label
                      ? "bg-[#E3E1DF] text-[#1d1b18] pl-1"
                      : "text-[#4b4d58] hover:bg-[rgba(9,9,11,0.04)] px-2"
                  }`}
                  >
                    {item.icon === "doc" && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                        <rect x="2" y="1" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="0.8" />
                        <path d="M4 4h4M4 6h3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                      </svg>
                    )}
                    {item.icon === "code" && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                        <path d="M4 3L1.5 6L4 9M8 3L10.5 6L8 9" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
