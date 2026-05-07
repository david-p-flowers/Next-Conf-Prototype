"use client";

import { briefData } from "@/lib/playData";
import { FolderIcon } from "@/components/icons";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  onGenerate?: () => void;
}

export default function BriefPanel({ isOpen, onToggle, onGenerate }: Props) {
  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-white border border-[#ecedef] rounded-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#ecedef]">
        <h3 className="text-sm font-medium text-[#1d1b18]">Play Configuration</h3>
        <button
          onClick={onToggle}
          className="text-[#676c79] hover:text-[#1d1b18] transition-colors"
          title="Collapse panel"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1" />
            <path d="M10.5 1.5v13" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#676c79]">Topic</span>
            <span className="text-xs font-medium text-[#1d1b18] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1d1b18]" />
              Food & Culinary Experiences
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#676c79]">Folder</span>
            <span className="text-xs font-medium text-[#1d1b18] flex items-center gap-1">
              <FolderIcon size={12} className="text-[#676c79]" />
              {briefData.folder}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#676c79]">Action</span>
            <span className="text-xs font-medium text-[#1d1b18]">{briefData.action}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#676c79]">Brand Kit</span>
            <span className="text-xs font-medium text-[#1d1b18]">{briefData.brandKit}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4 py-3 border-t border-[#ecedef]">
          <span className="text-xs font-medium text-[#1d1b18]">Opportunity Criteria</span>
          <p className="text-xs text-[#676c79] leading-[18px]">{briefData.opportunityCriteria}</p>
        </div>

        <div className="flex flex-col gap-2 px-4 py-3 border-t border-[#ecedef]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#1d1b18]">Trigger</span>
            <span className="text-xs text-[#676c79] cursor-pointer hover:text-[#1d1b18]">+</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#f9fafb] rounded-lg px-3 py-2.5">
            <div className="w-6 h-6 rounded-md bg-[#e8f5ee] flex items-center justify-center shrink-0">
              <img src="/icons/calendar-dates.svg" alt="" className="w-3 h-3" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-[#1d1b18]">{briefData.triggerLabel}</span>
              <span className="text-[11px] text-[#676c79]">{briefData.triggerSchedule}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      {onGenerate && (
        <div className="p-4 border-t border-[#ecedef] mt-auto">
          <button
            onClick={onGenerate}
            className="w-full py-2.5 bg-[#1d1b18] text-white text-sm font-medium rounded-lg hover:bg-[#2f2f37] transition-colors"
          >
            Generate Opportunities
          </button>
        </div>
      )}
    </div>
  );
}
