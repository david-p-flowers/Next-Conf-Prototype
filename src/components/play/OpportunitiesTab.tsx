"use client";

import { useState } from "react";
import { opportunitiesData, additionalOpportunities } from "@/lib/playData";
import type { OpportunityRow } from "@/lib/playData";
import Image from "next/image";

interface Props {
  onTakeAction: (rows: OpportunityRow[]) => void;
}

export default function OpportunitiesTab({ onTakeAction }: Props) {
  const [rows, setRows] = useState<OpportunityRow[]>(opportunitiesData);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [generatedMore, setGeneratedMore] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === rows.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(rows.map((r) => r.id)));
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 min-w-0 overflow-y-auto pt-5">
        <div className="overflow-clip">
          {/* Table header */}
          <div className="flex items-end border-b border-[rgba(9,9,11,0.08)] px-8">
            <div className="w-[44px] shrink-0 pb-3 pl-0 pr-3">
              <input
                type="checkbox"
                checked={selected.size === rows.length && rows.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-[#c7cad1] cursor-pointer"
              />
            </div>
            <div className="w-[183px] shrink-0 pb-3 px-3">
              <span className="text-[12px] font-semibold text-[#09090b] leading-[18px]">Page</span>
            </div>
            <div className="w-[119px] shrink-0 pb-3 px-3">
              <span className="text-[12px] font-semibold text-[#09090b] leading-[18px]">Folder</span>
            </div>
            <div className="flex-1 min-w-[200px] pb-3 px-3">
              <span className="text-[12px] font-semibold text-[#09090b] leading-[18px]">Reasoning</span>
            </div>
            <div className="w-[111px] shrink-0 pb-3 px-3">
              <span className="text-[12px] font-semibold text-[#09090b] leading-[18px]">Date Created</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row) => (
            <div
              key={row.id}
              className={`group relative flex items-start border-b border-[rgba(9,9,11,0.08)] last:border-b-0 transition-colors cursor-pointer px-8 min-h-[56px] ${
                selected.has(row.id)
                  ? "bg-[#f0f4ff]"
                  : "hover:bg-[#fafafa]"
              }`}
              onClick={() => toggleSelect(row.id)}
            >
              <div className="w-[44px] shrink-0 pt-4 pl-0 pr-3">
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggleSelect(row.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded border-[#c7cad1] cursor-pointer"
                />
              </div>
              <div className="w-[200px] shrink-0 py-3 px-3">
                <span className="text-[13px] text-[#09090b] underline leading-5 block" title={row.page}>
                  {row.page}
                </span>
              </div>
              <div className="w-[130px] shrink-0 py-3 px-3">
                <div className="flex items-center gap-1.5">
                  <Image src="/icons/folder-open.svg" alt="" width={14} height={14} className="shrink-0" />
                  <span className="text-[13px] text-[#09090b] leading-5">{row.folder}</span>
                </div>
              </div>
              <div className="flex-1 min-w-[200px] py-3 px-3">
                <span className="text-[13px] text-[#09090b] leading-5 line-clamp-2">{row.reasoning}</span>
              </div>
              <div className="w-[111px] shrink-0 py-3 px-3">
                <span className="text-[13px] text-[#09090b] leading-5 whitespace-nowrap">{row.dateCreated}</span>
              </div>

              {/* Hover action buttons */}
              <div
                className={`absolute right-8 top-0 bottom-0 flex items-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity pl-4 ${
                  selected.has(row.id) ? "bg-[#f0f4ff]" : "bg-[#fafafa]"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setRows((prev) => prev.filter((r) => r.id !== row.id));
                    setSelected((prev) => {
                      const next = new Set(prev);
                      next.delete(row.id);
                      return next;
                    });
                  }}
                  className="flex items-center justify-center w-[26px] h-[26px] rounded-[6px] bg-[rgba(9,9,11,0.04)] hover:bg-[rgba(9,9,11,0.08)] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    onTakeAction([row]);
                    setRows((prev) => prev.filter((r) => r.id !== row.id));
                    setSelected((prev) => {
                      const next = new Set(prev);
                      next.delete(row.id);
                      return next;
                    });
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-[6px] bg-[#2f2f37] hover:bg-[#3f3f47] text-white text-xs font-semibold transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selection bar */}
      {selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-white border border-[#ecedef] rounded-lg shadow-lg px-6 py-3 z-40 min-w-[320px] justify-between">
          <span className="text-[13px] text-[#1d1b18] font-medium">
            {selected.size} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setRows((prev) => prev.filter((r) => !selected.has(r.id)));
                setSelected(new Set());
              }}
              className="flex items-center justify-center w-[34px] h-[34px] rounded-[6px] bg-[rgba(9,9,11,0.04)] hover:bg-[rgba(9,9,11,0.08)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const selectedRows = rows.filter((r) => selected.has(r.id));
                onTakeAction(selectedRows);
                setRows((prev) => prev.filter((r) => !selected.has(r.id)));
                setSelected(new Set());
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-[6px] bg-[#2f2f37] hover:bg-[#3f3f47] text-white text-[13px] font-semibold transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6l3 3 5-5" />
              </svg>
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
