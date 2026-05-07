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
    <div className="flex flex-1 h-full">
      {/* Table area */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {/* Table header */}
        <div className="flex items-center py-3 px-4 border-b border-[#ecedef] text-xs font-medium text-[#676c79]">
          <div className="w-10 shrink-0">
            <input
              type="checkbox"
              checked={selected.size === rows.length && rows.length > 0}
              onChange={toggleAll}
              className="w-4 h-4 rounded border-[#cfccc8] cursor-pointer"
            />
          </div>
          <div className="w-[200px] shrink-0">Page</div>
          <div className="w-[120px] shrink-0">Folder</div>
          <div className="flex-1 min-w-[200px]">Reasoning</div>
          <div className="w-[120px] shrink-0 text-right">Date Created</div>
        </div>

        {/* Rows */}
        {rows.map((row) => (
          <div
            key={row.id}
            className={`flex items-center py-3.5 px-4 border-b border-[#ecedef] transition-colors cursor-pointer ${
              selected.has(row.id)
                ? "bg-[#f0f4ff]"
                : "hover:bg-[#fafafa]"
            }`}
            onClick={() => toggleSelect(row.id)}
          >
            <div className="w-10 shrink-0">
              <input
                type="checkbox"
                checked={selected.has(row.id)}
                onChange={() => toggleSelect(row.id)}
                onClick={(e) => e.stopPropagation()}
                className="w-4 h-4 rounded border-[#cfccc8] cursor-pointer"
              />
            </div>
            <div className="w-[200px] shrink-0 text-sm text-[#1d1b18] truncate pr-3" title={row.page}>
              {row.page}
            </div>
            <div className="w-[120px] shrink-0 flex items-center gap-1.5 text-sm text-[#1d1b18] pr-3" title={row.folder}>
              <Image src="/icons/folder-open.svg" alt="" width={15} height={15} className="shrink-0" />
              <span className="truncate">{row.folder}</span>
            </div>
            <div className="flex-1 min-w-[200px] text-sm text-[#676c79] pr-4 leading-5" title={row.reasoning}>
              {row.reasoning}
            </div>
            <div className="w-[120px] shrink-0 text-sm text-[#676c79] text-right">
              {row.dateCreated}
            </div>
          </div>
        ))}
      </div>

      {/* Selection bar */}
      {selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white border border-[#ecedef] rounded-lg shadow-lg px-5 py-3 z-40">
          <span className="text-sm text-[#1d1b18] font-medium">
            {selected.size} items selected
          </span>
          <button
            onClick={() => setSelected(new Set())}
            className="flex items-center gap-1 text-sm text-[#676c79] hover:text-[#1d1b18]"
          >
            ✕ Decline
          </button>
          <button
            onClick={() => {
              const selectedRows = rows.filter((r) => selected.has(r.id));
              onTakeAction(selectedRows);
              setSelected(new Set());
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#7c3aed] text-white text-sm font-medium rounded-md hover:bg-[#6d28d9] transition-colors"
          >
            ✦ Take action
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="text-[#676c79] hover:text-[#1d1b18] text-lg leading-none"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
