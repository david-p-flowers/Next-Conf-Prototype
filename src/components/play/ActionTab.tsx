"use client";

import { useState } from "react";
import { actionData } from "@/lib/playData";
import type { ActionRow } from "@/lib/playData";
import StatusCell from "./StatusCell";
import type { StatusType } from "./StatusCell";

interface Props {
  onViewOutput: (status: StatusType) => void;
  additionalRows?: ActionRow[];
}

const defaultColWidths: Record<string, number> = {
  checkbox: 40,
  num: 32,
  page: 180,
  date: 140,
  slug: 150,
  brief: 180,
  status: 210,
  content: 170,
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
  const [rowStatuses, setRowStatuses] = useState<Record<string, StatusType>>({});
  const [colWidths, setColWidths] = useState(defaultColWidths);

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
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#ecedef]">
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
        <table className="border-collapse" style={{ tableLayout: "fixed", width: Object.values(colWidths).reduce((a, b) => a + b, 0) }}>
          <thead>
            <tr className="border-b border-[#ecedef]">
              <th className="py-2.5 px-3 text-left border-r border-[#f3f4f6] relative" style={{ width: colWidths.checkbox }}>
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
              <th className="py-1.5 pl-3 pr-1.5 text-left whitespace-nowrap border-t border-r border-b border-[rgba(9,9,11,0.08)] relative" style={{ width: colWidths.content, background: "#F2F8FD" }}>
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                    <path d="M2 3h8M2 6h6M2 9h4" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-[13px] font-medium text-[#3b82f6]">Refreshed Content</span>
                </div>
                <ResizeHandle onResize={handleColResize("content", colWidths.content)} />
              </th>
              <th className="py-1.5 pl-3 pr-1.5 text-left whitespace-nowrap border-t border-r border-b border-[rgba(9,9,11,0.08)] relative" style={{ width: colWidths.export, background: "#F2F8FD" }}>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                    <path d="M7 1.5L2.5 3.5V6.5C2.5 9.5 4.5 11.5 7 12.5C9.5 11.5 11.5 9.5 11.5 6.5V3.5L7 1.5Z" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="7" cy="7" r="1.5" fill="#3b82f6" />
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
                <td className="h-[36px] px-3 border-b border-[rgba(9,9,11,0.08)] border-r border-r-[rgba(9,9,11,0.08)]">
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
                <td
                  className={`h-[36px] px-3 border-b border-[rgba(9,9,11,0.08)] border-r border-r-[rgba(9,9,11,0.08)] cursor-pointer overflow-hidden ${
                    selectedCell === `${row.id}-content`
                      ? "ring-2 ring-[#3b82f6] ring-inset"
                      : ""
                  }`}
                  onClick={() => setSelectedCell(`${row.id}-content`)}
                >
                  <span className="text-[13px] text-[#09090b] truncate block leading-5" title={row.refreshedContent}>
                    {row.refreshedContent}
                  </span>
                </td>
                <td className="h-[36px] px-3 border-b border-[rgba(9,9,11,0.08)] text-center whitespace-nowrap">
                  {row.verified && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block">
                      <path d="M7 1.5L2.5 3.5V6.5C2.5 9.5 4.5 11.5 7 12.5C9.5 11.5 11.5 9.5 11.5 6.5V3.5L7 1.5Z" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 7L6.5 8.5L9 5.5" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
