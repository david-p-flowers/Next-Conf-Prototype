"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FolderIcon } from "@/components/icons";
import type { SidePanelData } from "@/lib/conversationScript";

interface SidePanelProps {
  data: SidePanelData;
}

export default function SidePanel({ data }: SidePanelProps) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, width: 0 }}
      animate={{ opacity: 1, x: 0, width: 280 }}
      exit={{ opacity: 0, x: 20, width: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full bg-white border-[0.5px] border-[#cfccc8] rounded-xl overflow-hidden flex flex-col shrink-0"
    >
      <div className="flex flex-col flex-1 overflow-y-auto px-5 py-5 gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold text-[#1d1b18]">Play Configuration</h3>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="#676c79" strokeWidth="1" />
            <path d="M6 2.5v2M10 2.5v2" stroke="#676c79" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3">
          {data.fields.map((field) => (
            <div key={field.label} className="flex items-center justify-between py-0.5">
              <span className="text-[12px] text-[#676c79]">{field.label}</span>
              <span className="text-[12px] font-medium text-[#1d1b18] flex items-center gap-1.5">
                {field.icon === "dot" && (
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6] inline-block" />
                )}
                {field.icon === "folder" && (
                  <FolderIcon size={12} className="text-[#676c79]" />
                )}
                {field.value}
              </span>
            </div>
          ))}
        </div>

        {/* Opportunity Criteria */}
        <div className="flex flex-col gap-2 pt-4 border-t border-[#ecedef]">
          <span className="text-[12px] font-medium text-[#676c79]">
            Opportunity Criteria
          </span>
          <p className="text-[12px] text-[#676c79] leading-[18px]">
            {data.opportunityCriteria}
          </p>
        </div>

        {/* Trigger */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[#ecedef]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#676c79]">Trigger</span>
            <span className="text-[#676c79] text-sm cursor-pointer hover:text-[#1d1b18]">+</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 border border-[#ecedef]">
            <div className="w-5 h-5 shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="3" width="16" height="14" rx="2.5" stroke="#1d1b18" strokeWidth="1.2" />
                <path d="M2 7.5h16" stroke="#1d1b18" strokeWidth="1" />
                <path d="M6 2v2.5M14 2v2.5" stroke="#1d1b18" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="7" cy="11" r="1" fill="#1d1b18" />
                <circle cx="10" cy="11" r="1" fill="#1d1b18" />
                <circle cx="13" cy="11" r="1" fill="#1d1b18" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-[#1d1b18]">
                {data.trigger.label}
              </span>
              <span className="text-[11px] text-[#676c79] leading-4">
                {data.trigger.schedule}
              </span>
            </div>
            <span className="ml-auto text-[#676c79] text-xs">⋮</span>
          </div>
        </div>

        {/* Action */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[#ecedef]">
          <span className="text-[12px] font-medium text-[#676c79]">Action</span>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 3h8.5L16 6.5V17H4V3Z" stroke="#1d1b18" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M12 3v4h4" stroke="#1d1b18" strokeWidth="1" strokeLinejoin="round" />
                <path d="M7 10h6M7 13h4" stroke="#1d1b18" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#1d1b18]">
                {data.action.label}
              </span>
              <p className="text-[11px] text-[#676c79] leading-[16px]">
                {data.action.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 border-t border-[#ecedef]">
        <button
          onClick={() => router.push("/play")}
          className="w-full py-2.5 bg-[#1d1b18] text-white text-sm font-medium rounded-lg hover:bg-[#2f2f37] transition-colors"
        >
          {data.ctaLabel}
        </button>
      </div>
    </motion.div>
  );
}
