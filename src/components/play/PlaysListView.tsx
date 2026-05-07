"use client";

import Link from "next/link";
import { playsListData } from "@/lib/playData";
import { SearchIcon, StarIcon } from "@/components/icons";

export default function PlaysListView() {
  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-white border-[0.5px] border-[#cfccc8] rounded-xl overflow-hidden">
      <div className="flex flex-col flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] font-semibold text-[#1d1b18]">Plays</h1>
          <button className="px-4 py-2 bg-[#1d1b18] text-white text-sm font-medium rounded-lg hover:bg-[#2f2f37] transition-colors">
            Create
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[#ecedef] rounded-md w-[200px]">
            <SearchIcon size={14} className="text-[#808593]" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 text-sm text-[#1d1b18] placeholder-[#808593] bg-transparent outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#ecedef] rounded-md text-sm text-[#1d1b18]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filter
          </button>
        </div>

        <div className="border-t border-[#ecedef]">
          {/* Header */}
          <div className="flex items-center py-3 px-2 text-xs font-medium text-[#676c79] border-b border-[#ecedef]">
            <div className="w-8 shrink-0">
              <input type="checkbox" className="w-4 h-4 rounded border-[#cfccc8]" />
            </div>
            <div className="flex-1 min-w-0">Title</div>
            <div className="w-[160px] text-center">Pending Opportunities</div>
            <div className="w-[120px] text-center">Total runs (7d)</div>
            <div className="w-[140px]">Last edit ↓</div>
          </div>

          {/* Rows */}
          {playsListData.map((play) => (
            <Link
              key={play.id}
              href="/play"
              className="flex items-center py-3 px-2 hover:bg-[rgba(9,9,11,0.02)] border-b border-[#ecedef] transition-colors"
            >
              <div className="w-8 shrink-0">
                <input type="checkbox" className="w-4 h-4 rounded border-[#cfccc8]" onClick={(e) => e.stopPropagation()} />
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className="text-sm text-[#1d1b18]">{play.title}</span>
                {play.starred && <StarIcon size={14} className="text-[#f59e0b] fill-[#f59e0b]" />}
              </div>
              <div className="w-[160px] text-center text-sm text-[#1d1b18]">
                {play.pendingOpportunities}
              </div>
              <div className="w-[120px] text-center text-sm text-[#1d1b18] flex items-center justify-center gap-1">
                {play.totalRuns > 0 && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="8" width="2" height="4" fill="#1d1b18" rx="0.5" />
                    <rect x="4" y="5" width="2" height="7" fill="#1d1b18" rx="0.5" />
                    <rect x="7" y="3" width="2" height="9" fill="#1d1b18" rx="0.5" />
                    <rect x="10" y="6" width="2" height="6" fill="#1d1b18" rx="0.5" />
                  </svg>
                )}
                {play.totalRuns}
              </div>
              <div className="w-[140px] flex items-center gap-2 text-sm text-[#676c79]">
                <div
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-semibold"
                  style={{ backgroundColor: play.lastEditColor }}
                >
                  {play.lastEditInitial}
                </div>
                {play.lastEdit}
                <button className="ml-auto text-[#676c79] hover:text-[#1d1b18]" onClick={(e) => e.preventDefault()}>
                  ···
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
