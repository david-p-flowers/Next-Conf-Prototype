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
    <div className="w-[304px] flex flex-col overflow-hidden border border-[#ecedef] rounded-lg bg-white">
      {/* Content */}
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <span className="text-[13px] text-[#676c79] leading-5 w-[100px] shrink-0">Topic</span>
            <div className="flex items-center gap-1 flex-1 min-w-0 justify-end">
              <span className="w-1.5 h-1.5 rounded-sm bg-[#d27dff] shrink-0" />
              <span className="text-[13px] text-[#09090b] leading-5 truncate">Food & Culinary Experie...</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#676c79] leading-5">Folder</span>
            <div className="flex items-center gap-1.5">
              <FolderIcon size={12} className="text-[#676c79]" />
              <span className="text-[13px] text-[#09090b] leading-5">{briefData.folder}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#676c79] leading-5">Action</span>
            <span className="text-[13px] text-[#09090b] leading-5">{briefData.action}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#676c79] leading-5">Brand Kit</span>
            <span className="text-[13px] text-[#09090b] leading-5">{briefData.brandKit}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t border-[#ecedef]">
          <span className="text-[13px] font-semibold text-[#09090b] leading-5">Opportunity Criteria</span>
          <p className="text-[13px] text-[#676c79] leading-5">{briefData.opportunityCriteria}</p>
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-[#ecedef]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#09090b] leading-5">Trigger</span>
            <span className="text-[13px] text-[#676c79] cursor-pointer hover:text-[#09090b]">+</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-[#e8f5ee] flex items-center justify-center shrink-0">
              <img src="/icons/calendar-dates.svg" alt="" className="w-3 h-3" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-[#09090b] leading-5">{briefData.triggerLabel}</span>
              <span className="text-[12px] text-[#676c79] leading-[18px]">{briefData.triggerSchedule}</span>
            </div>
            <span className="ml-auto text-[#676c79] text-xs cursor-pointer">⋮</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 border-t border-[#ecedef] mt-auto">
        <button
          onClick={onGenerate}
          className="w-full py-2.5 bg-[#09090b] text-white text-[13px] font-semibold rounded-md hover:bg-[#2f2f37] transition-colors"
        >
          Generate Opportunities
        </button>
      </div>
    </div>
  );
}
