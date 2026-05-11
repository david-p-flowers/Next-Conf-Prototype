"use client";

import { useState, useEffect } from "react";
import { actionData } from "@/lib/playData";
import type { ActionRow } from "@/lib/playData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { addInboxItem } from "@/lib/inboxStore";
import StatusCell from "./StatusCell";
import type { StatusType } from "./StatusCell";

interface Props {
  onViewOutput: (status: StatusType) => void;
  additionalRows?: ActionRow[];
}

const defaultColWidths: Record<string, number> = {
  checkbox: 64,
  num: 32,
  page: 180,
  date: 140,
  slug: 150,
  brief: 180,
  status: 210,
  export: 170,
};

function ResizeHandle({ onResize }: { onResize: (delta: number) => void }) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleMouseMove = (ev: MouseEvent) => {
      onResize(ev.clientX - startX);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#3b82f6] z-10 group"
      onMouseDown={handleMouseDown}
    >
      <div className="absolute right-0 top-0 bottom-0 w-[3px] group-hover:bg-[#3b82f6]/30" />
    </div>
  );
}

export default function ActionTab({ onViewOutput, additionalRows = [] }: Props) {
  const allRows = [...actionData, ...additionalRows];
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [rowStatuses, setRowStatuses] = useLocalStorage<Record<string, StatusType>>("quill-action-row-statuses", {});
  const [publishedRows, setPublishedRows] = useLocalStorage<Record<string, boolean>>("quill-action-published-rows", () => {
    const initial: Record<string, boolean> = {};
    [...actionData, ...additionalRows].forEach((row) => {
      if (row.published) initial[row.id] = true;
    });
    return initial;
  });
  const [colWidths, setColWidths] = useState(defaultColWidths);

  useEffect(() => {
    const loadingIds = Object.entries(rowStatuses)
      .filter(([, status]) => status === "loading")
      .map(([id]) => id);

    if (loadingIds.length === 0) return;

    const updated = { ...rowStatuses };
    loadingIds.forEach((id) => {
      updated[id] = "human_review";
      const row = allRows.find((r) => r.id === id);
      if (row) {
        addInboxItem({
          id: `inbox-${id}`,
          playName: "Food & Dining Refresh",
          message: `Quill needs your review on ${row.pageSlug || row.page}`,
          unread: true,
          tag: "review",
          time: "Just now",
        });
      }
    });
    setRowStatuses(updated);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColResize = (col: string, startWidth: number) => (delta: number) => {
    setColWidths((prev) => ({
      ...prev,
      [col]: Math.max(60, startWidth + delta),
    }));
  };

  const getRowStatus = (row: ActionRow): StatusType => {
    return rowStatuses[row.id] || row.landingPageRefresh;
  };

  const handleRunPlaybook = (rowId: string) => {
    setRowStatuses((prev) => ({ ...prev, [rowId]: "loading" }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-[#ecedef]">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#ecedef] rounded-md text-sm text-[#1d1b18] hover:bg-[#fafafa]">
            Filter
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M6 9L2 4L10 4L6 9Z" fill="#09090B" />
            </svg>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#ecedef] rounded-md text-sm text-[#1d1b18] hover:bg-[#fafafa]">
            Sort
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M6 9L2 4L10 4L6 9Z" fill="#09090B" />
            </svg>
          </button>
          <button className="flex items-center justify-center w-8 h-8 border border-[#ecedef] rounded-md text-[#676c79] hover:bg-[#fafafa]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M7 12l-3-3M7 12l3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#1d1b18] border border-[rgba(9,9,11,0.08)] rounded-md bg-white hover:bg-[#fafafa]">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="shrink-0">
            <path d="M11 6.85714H6.85714V11H5.14286V6.85714H1V5.14286H5.14286V1H6.85714V5.14286H11V6.85714Z" fill="#09090B" />
          </svg>
          Add Column
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="border-collapse w-full" style={{ tableLayout: "fixed", minWidth: Object.values(colWidths).reduce((a, b) => a + b, 0) }}>
          <thead>
            <tr className="border-b border-[#ecedef]">
              <th className="py-2.5 pl-8 pr-3 text-left relative" style={{ width: colWidths.checkbox }}>
                <input type="checkbox" className="w-4 h-4 rounded border-[#cfccc8]" />
              </th>
              <th className="py-2.5 px-2 text-left border-r border-[#f3f4f6] relative" style={{ width: colWidths.num }} />
              <th className="py-2.5 px-3 text-left border-r border-[#f3f4f6] whitespace-nowrap relative" style={{ width: colWidths.page }}>
                <div className="flex items-center gap-1.5">
                  <img src="/icons/ao-favicon.png" alt="ao" className="w-[18px] h-[18px] rounded-[4px] shrink-0" />
                  <span className="text-[13px] font-medium text-[#09090b]">Page</span>
                </div>
                <ResizeHandle onResize={handleColResize("page", colWidths.page)} />
              </th>
              <th className="py-2.5 px-3 text-left border-r border-[#f3f4f6] whitespace-nowrap relative" style={{ width: colWidths.date }}>
                <span className="text-[13px] font-normal text-[#4b4d58]">Opportunity Date</span>
                <ResizeHandle onResize={handleColResize("date", colWidths.date)} />
              </th>
              <th className="py-2.5 px-3 text-left border-r border-[#f3f4f6] whitespace-nowrap relative" style={{ width: colWidths.slug }}>
                <div className="flex items-center gap-1.5">
                  <img src="/icons/small-caps.svg" alt="" className="w-3 h-3 shrink-0" />
                  <span className="text-[13px] font-normal text-[#4b4d58]">Page Slug</span>
                </div>
                <ResizeHandle onResize={handleColResize("slug", colWidths.slug)} />
              </th>
              <th className="py-2.5 px-3 text-left border-r border-[#f3f4f6] whitespace-nowrap relative" style={{ width: colWidths.brief }}>
                <div className="flex items-center gap-1.5">
                  <img src="/icons/small-caps.svg" alt="" className="w-3 h-3 shrink-0" />
                  <span className="text-[13px] font-normal text-[#4b4d58]">Refresh Brief</span>
                </div>
                <ResizeHandle onResize={handleColResize("brief", colWidths.brief)} />
              </th>
              <th className="py-2 px-3 text-left border-r border-[rgba(9,9,11,0.08)] border-t border-b whitespace-nowrap relative" style={{ width: colWidths.status, background: "#F0EBFF" }}>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                    <rect x="2" y="2.5" width="10" height="9" rx="1.5" stroke="#7c3aed" strokeWidth="1.2" />
                    <path d="M2 5h10" stroke="#7c3aed" strokeWidth="1" />
                    <path d="M5 5V2.5" stroke="#7c3aed" strokeWidth="1" />
                  </svg>
                  <span className="text-[13px] font-medium text-[#09090b]">Landing Page Refresh</span>
                </div>
                <ResizeHandle onResize={handleColResize("status", colWidths.status)} />
              </th>
              <th className="py-1.5 pl-3 pr-1.5 text-left whitespace-nowrap border-t border-r border-b border-[rgba(9,9,11,0.08)] relative" style={{ width: colWidths.export, background: "#F2F8FD" }}>
                <div className="flex items-center gap-2">
                  <svg width="14" height="9" viewBox="0 0 1080 674" fill="none" className="shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1080 0L735.386 673.684H411.695L555.916 394.481H549.445C430.464 548.934 252.942 650.61 -0.000488281 673.684V398.344C-0.000488281 398.344 161.813 388.787 256.938 288.776H-0.000488281V0.0053214H288.771V237.515L295.252 237.489L413.254 0.0053214H631.644V236.009L638.126 235.999L760.555 0H1080Z" fill="#146EF5" />
                  </svg>
                  <span className="text-[13px] font-medium text-[#3b82f6]">Webflow Export</span>
                </div>
                <ResizeHandle onResize={handleColResize("export", colWidths.export)} />
              </th>
            </tr>
          </thead>
          <tbody>
            {allRows.map((row, idx) => (
              <tr
                key={row.id}
                className={`border-b border-[#ecedef] transition-colors ${
                  hoveredRow === row.id ? "bg-[#fafafa]" : ""
                }`}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="w-fit h-[36px] pl-8 pr-3 border-b border-[rgba(9,9,11,0.08)]">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#cfccc8]" />
                </td>
                <td className="h-[36px] px-2 text-xs text-[#676c79] border-b border-[rgba(9,9,11,0.08)] border-r border-r-[rgba(9,9,11,0.08)] text-center whitespace-nowrap">
                  {idx + 1}
                </td>
                <td
                  className={`h-[36px] px-3 border-b border-[rgba(9,9,11,0.08)] border-r border-r-[rgba(9,9,11,0.08)] cursor-pointer overflow-hidden ${
                    selectedCell === `${row.id}-page`
                      ? "ring-2 ring-[#3b82f6] ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell(`${row.id}-page`)}
                >
                  <span className="text-[13px] text-[#3b82f6] underline truncate block leading-5" title={row.page}>
                    {row.page}
                  </span>
                </td>
                <td
                  className={`h-[36px] px-3 border-b border-[rgba(9,9,11,0.08)] border-r border-r-[rgba(9,9,11,0.08)] cursor-pointer overflow-hidden ${
                    selectedCell === `${row.id}-date`
                      ? "ring-2 ring-[#3b82f6] ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell(`${row.id}-date`)}
                >
                  <span className="text-[13px] text-[#09090b] truncate block leading-5" title={row.opportunityDate}>
                    {row.opportunityDate}
                  </span>
                </td>
                <td
                  className={`h-[36px] px-3 border-b border-[rgba(9,9,11,0.08)] border-r border-r-[rgba(9,9,11,0.08)] cursor-pointer overflow-hidden ${
                    selectedCell === `${row.id}-slug`
                      ? "ring-2 ring-[#3b82f6] ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell(`${row.id}-slug`)}
                >
                  <span className="text-[13px] text-[#09090b] truncate block leading-5" title={row.pageSlug}>
                    {row.pageSlug}
                  </span>
                </td>
                <td
                  className={`h-[36px] px-3 border-b border-[rgba(9,9,11,0.08)] border-r border-r-[rgba(9,9,11,0.08)] cursor-pointer overflow-hidden ${
                    selectedCell === `${row.id}-brief`
                      ? "ring-2 ring-[#3b82f6] ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell(`${row.id}-brief`)}
                >
                  <span className="text-[13px] text-[#4b4d58] truncate block leading-5" title={row.refreshBrief}>
                    {row.refreshBrief}
                  </span>
                </td>
                <td className="h-[36px] px-0 border-r border-r-[rgba(9,9,11,0.08)]">
                  <StatusCell
                    status={getRowStatus(row)}
                    onViewOutput={() => onViewOutput(getRowStatus(row))}
                    onRunPlaybook={() => handleRunPlaybook(row.id)}
                  />
                </td>
                <td className="h-[36px] px-3 border-b border-[rgba(9,9,11,0.08)] whitespace-nowrap">
                  {publishedRows[row.id] ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ecfdf5] text-[12px] font-medium text-[#059669]">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                        <path d="M2 5.5L4 7.5L8 3" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Published
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPublishedRows((prev) => ({ ...prev, [row.id]: true }));
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[rgba(9,9,11,0.08)] text-[12px] font-medium text-[#09090b] bg-white hover:bg-[#fafafa] transition-colors"
                    >
                      Publish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
