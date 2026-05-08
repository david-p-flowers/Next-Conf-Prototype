"use client";

import { useState, useEffect, useCallback } from "react";
import { reviewPanelContent } from "@/lib/playData";
import type { StatusType } from "./StatusCell";
import SectionNav from "./SectionNav";

interface Props {
  onClose: () => void;
  status?: StatusType;
}

type ResizeTarget = "panel" | "left" | "right" | null;

export default function ReviewPanel({ onClose, status = "view_output" }: Props) {
  const [width, setWidth] = useState(1160);
  const [leftWidth, setLeftWidth] = useState(200);
  const [rightWidth, setRightWidth] = useState(320);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [resizeTarget, setResizeTarget] = useState<ResizeTarget>(null);
  const [panelLeft, setPanelLeft] = useState(0);

  const startResize = useCallback((target: ResizeTarget) => (e: React.MouseEvent) => {
    e.preventDefault();
    setResizeTarget(target);
    if (target === "left" || target === "right") {
      const panelEl = (e.target as HTMLElement).closest("[data-panel-root]");
      if (panelEl) setPanelLeft(panelEl.getBoundingClientRect().left);
    }
  }, []);

  useEffect(() => {
    if (!resizeTarget) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (resizeTarget === "panel") {
        const newWidth = window.innerWidth - e.clientX;
        setWidth(Math.max(700, Math.min(window.innerWidth * 0.95, newWidth)));
      } else if (resizeTarget === "left") {
        const newLeft = e.clientX - panelLeft - 8;
        setLeftWidth(Math.max(44, Math.min(300, newLeft)));
      } else if (resizeTarget === "right") {
        const panelRight = panelLeft + width;
        const newRight = panelRight - e.clientX - 8;
        setRightWidth(Math.max(180, Math.min(400, newRight)));
      }
    };
    const handleMouseUp = () => setResizeTarget(null);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizeTarget, panelLeft, width]);

  const isHumanReview = status === "human_review";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/10" onClick={onClose} />

      {/* Outer container - beige background with rounded corners */}
      <div
        data-panel-root
        className={`relative flex flex-col h-[calc(100vh-24px)] my-3 mr-3 rounded-xl overflow-hidden ${resizeTarget ? "select-none" : ""}`}
        style={{
          width,
          border: "0.5px solid #CFCCC8",
          background: "#f7f6f3",
        }}
      >
        {/* Panel resize handle (left edge) */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize z-10 transition-colors ${
            resizeTarget === "panel" ? "bg-[#3b82f6]" : "hover:bg-[#d1d5db]"
          }`}
          onMouseDown={startResize("panel")}
        />

        {/* Top bar */}
        <div
          className="flex items-center shrink-0 overflow-hidden bg-white"
          style={{
            padding: "8px 24px",
            gap: 16,
            borderBottom: "0.5px solid #CFCCC8",
          }}
        >
          <span className="text-[16px] font-semibold text-[#0f0e0c] leading-6 whitespace-nowrap">{reviewPanelContent.title}</span>
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="flex items-center gap-1.5">
              <button
                className="flex items-center gap-1.5 bg-white hover:bg-[#fafafa] text-[13px] font-semibold text-[#1d1b18]"
                style={{
                  padding: "6px 12px",
                  border: "0.5px solid #CFCCC8",
                  borderRadius: 6,
                }}
              >
                <img src="/icons/gear.svg" alt="" className="w-3 h-3 shrink-0" />
                Edit Playbook
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center shrink-0 bg-white hover:bg-[#fafafa]"
            style={{
              width: 32,
              height: 32,
              border: "0.5px solid #CFCCC8",
              borderRadius: 6,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 4.5L4.5 11.5M4.5 4.5L11.5 11.5" stroke="#6D6A64" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Main content area */}
        <div className="flex flex-1 min-h-0 gap-0 bg-[#f7f6f3]">
          {/* Left blade - section nav on beige bg */}
          <div className="relative shrink-0" style={{ width: leftWidth }}>
            <SectionNav width={leftWidth} />
            {/* Left resize handle */}
            <div
              className={`absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize z-10 transition-colors ${
                resizeTarget === "left" ? "bg-[#3b82f6]" : "hover:bg-[#d1d5db]"
              }`}
              onMouseDown={startResize("left")}
            />
          </div>

          {/* Center - white elevated card */}
          <div className="flex-1 flex flex-col min-w-0 py-4">
          <div
            className="flex-1 flex flex-col min-w-0 rounded-lg overflow-hidden"
            style={{
              border: "0.5px solid #CFCCC8",
              background: "#FFF",
              boxShadow: "0 4px 6px -2px rgba(16, 24, 40, 0.05), 0 12px 24px -4px rgba(16, 24, 40, 0.04)",
            }}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <button className="flex items-center gap-1 hover:opacity-70">
                  <img src="/icons/toolbar-small-caps.svg" alt="Tt" className="w-[14px] h-[14px]" />
                  <img src="/icons/toolbar-caret-down.svg" alt="" className="w-[10px] h-[10px]" />
                </button>
                <div className="w-px h-4 bg-[#ecedef]" />
                <button className="hover:opacity-70">
                  <img src="/icons/toolbar-bold.svg" alt="B" className="w-[14px] h-[14px]" />
                </button>
                <button className="hover:opacity-70">
                  <img src="/icons/toolbar-italic.svg" alt="I" className="w-[14px] h-[14px]" />
                </button>
                <div className="w-px h-4 bg-[#ecedef]" />
                <button className="hover:opacity-70">
                  <img src="/icons/toolbar-link.svg" alt="Link" className="w-[14px] h-[14px]" />
                </button>
                <button className="hover:opacity-70">
                  <img src="/icons/toolbar-image.svg" alt="Image" className="w-[14px] h-[14px]" />
                </button>
                <div className="w-px h-4 bg-[#ecedef]" />
                <button className="hover:opacity-70">
                  <img src="/icons/toolbar-list-unordered.svg" alt="Unordered list" className="w-[14px] h-[14px]" />
                </button>
                <button className="hover:opacity-70">
                  <img src="/icons/toolbar-list-ordered.svg" alt="Ordered list" className="w-[14px] h-[14px]" />
                </button>
                <div className="w-px h-4 bg-[#ecedef]" />
                <button className="hover:opacity-70">
                  <img src="/icons/toolbar-ellipsis.svg" alt="More" className="w-[14px] h-[14px]" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-7 px-3 text-[12px] text-[#09090b] border border-[rgba(9,9,11,0.08)] rounded-md bg-white hover:bg-[#fafafa]">Share</button>
                <button className="hover:opacity-70">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 10L10 4M10 4H6M10 4V8" stroke="#6D6A64" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button className="hover:opacity-70">
                  <img src="/icons/toolbar-ellipsis.svg" alt="More" className="w-[14px] h-[14px]" />
                </button>
              </div>
            </div>

            {/* Article content */}
            <div className="flex-1 overflow-y-auto px-12 py-10">
              <article className="max-w-[560px] mx-auto">
                <div
                  className="review-article"
                  dangerouslySetInnerHTML={{ __html: reviewPanelContent.articleContent }}
                />
              </article>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[#ecedef] text-xs text-[#676c79] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                1 user editing this page
              </div>
              <span>{reviewPanelContent.wordCount} words | {reviewPanelContent.charCount} characters</span>
            </div>
          </div>
          </div>

          {/* Right sidebar - on beige bg */}
          {rightSidebarOpen ? (
            <div className="relative shrink-0 flex flex-col overflow-hidden pl-4 pr-1" style={{ width: rightWidth }}>
              {/* Right resize handle */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize z-10 transition-colors ${
                  resizeTarget === "right" ? "bg-[#3b82f6]" : "hover:bg-[#d1d5db]"
                }`}
                onMouseDown={startResize("right")}
              />

              {/* Summarize button */}
              <div className="pt-3" />
              <button className="w-full text-[12px] font-medium text-[#09090b] border border-[rgba(9,9,11,0.08)] rounded-md px-3 py-1.5 hover:bg-white/60 bg-[#ecfdf5] transition-colors mb-4">
                Summarize this playbook
              </button>

              {/* Steps */}
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="flex flex-col gap-1">
                  {reviewPanelContent.steps.map((step, idx) => (
                    <div key={idx} className="py-1">
                      {step.type === "completed" && (
                        <div className="flex items-center gap-1">
                          <span className="text-[13px] leading-6 text-[#1d1b18]">{step.label}</span>
                          <span className="text-[#9ca3af] text-[13px]">›</span>
                        </div>
                      )}
                      {step.type === "tool" && (
                        <div className="flex flex-col gap-0.5 py-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-[16px] h-[16px] rounded-[3px] bg-[#09090b] flex items-center justify-center text-white text-[6px] font-bold shrink-0 tracking-tight">ao</span>
                            <span className="text-[13px] leading-6 text-[#1d1b18]">{step.label}</span>
                            <span className="text-[#9ca3af] text-[13px]">›</span>
                          </div>
                          <span className="pl-[22px] text-[#9ca3af] text-[12px] leading-5">{step.source}</span>
                        </div>
                      )}
                      {step.type === "description" && (
                        <p className="text-[13px] text-[#1d1b18] leading-[20px] py-0.5">{step.label}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom - mode dependent */}
              <div className="pt-4 pb-1 shrink-0">
                {isHumanReview ? <HumanReviewInput /> : <PanelChatInput />}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function HumanReviewInput() {
  return (
    <div
      className="flex flex-col self-stretch"
      style={{
        padding: "10px 12px",
        gap: 12,
        borderRadius: 8,
        border: "1px solid #C6A001",
        background: "#FFF",
        boxShadow: "0 4px 8px -2px rgba(16, 24, 40, 0.10)",
      }}
    >
      <div className="flex items-start justify-between w-full gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <img src="/icons/user-circle.svg" alt="" className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[12px] font-medium text-[#09090b] leading-4">What would you like to change?</span>
        </div>
        <div className="flex items-center gap-0.5 text-[11px] text-[#9ca3af] shrink-0">
          <button className="hover:text-[#4b4d58]">‹</button>
          <span className="whitespace-nowrap">1 of 2</span>
          <button className="hover:text-[#4b4d58]">›</button>
        </div>
      </div>

      <textarea
        placeholder="Describe changes here"
        className="w-full text-[12px] text-[#09090b] placeholder-[#9ca3af] border border-[#ecedef] rounded-md px-2.5 py-2 resize-none outline-none focus:border-[#C6A001]"
        rows={2}
      />
      <div className="flex items-center justify-end gap-1.5">
        <button className="text-[12px] text-[#09090b] border border-[rgba(9,9,11,0.08)] rounded-md px-2.5 py-1 bg-white hover:bg-[#fafafa]">
          Request Changes
        </button>
        <button className="text-[12px] text-white bg-[#09090b] rounded-md px-2.5 py-1 flex items-center gap-1 hover:bg-[#2f2f37]">
          Run
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H4M8 2V6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function PanelChatInput() {
  return (
    <div className="border border-[#ecedef] rounded-lg p-2.5 bg-white">
      <textarea
        placeholder="Run this playbook or ask for edits"
        className="w-full text-xs text-[#09090b] placeholder-[#9ca3af] bg-transparent outline-none resize-none"
        rows={2}
      />
      <div className="flex items-center justify-between mt-1.5">
        <button className="text-[#9ca3af] hover:text-[#09090b]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#9ca3af]">Opus 4.6 ▾</span>
          <button className="w-5 h-5 rounded bg-[#09090b] flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 7L7 1M7 1H3M7 1V5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
