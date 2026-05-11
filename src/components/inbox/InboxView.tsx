"use client";

import { useState, useEffect } from "react";
import {
  InboxIcon,
  FilterIcon,
} from "@/components/icons";
import { type InboxItem, type InboxTagType } from "@/lib/inboxData";
import { getInboxItems, markAsRead } from "@/lib/inboxStore";
import ReviewPanel from "@/components/play/ReviewPanel";

function Tag({ type }: { type: InboxTagType }) {
  const config = {
    question: { label: "Question", icon: <img src="/icons/question.svg" alt="" className="w-3 h-3" /> },
    review: { label: "Review", icon: <img src="/icons/user-circle.svg" alt="" className="w-3 h-3" /> },
  } as const;

  const { label, icon } = config[type];

  return (
    <span className="inline-flex items-center gap-1 h-6 px-2 rounded-[10px] text-[12px] text-[#1d1b18] whitespace-nowrap bg-white" style={{ border: "1px solid #CFCCC8" }}>
      {icon}
      {label}
    </span>
  );
}

function InboxRow({ item, onClick }: { item: InboxItem; onClick: () => void }) {
  return (
    <div
      className="flex items-center gap-2 pr-4 bg-white hover:bg-[rgba(9,9,11,0.02)] transition-colors cursor-pointer"
      style={{ borderBottom: "0.5px solid #CFCCC8" }}
      onClick={onClick}
    >
      <div className="flex items-center h-12 pl-8 pr-2 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <div className="w-4 h-4 rounded border border-[#cfccc8] bg-white shrink-0" />
      </div>

      <div className="flex items-center gap-1 w-[180px] shrink-0">
        <img src="/icons/book-open.svg" alt="" className="w-3 h-3 shrink-0" />
        <span className="text-[13px] leading-5 text-[#1d1b18] truncate">
          {item.playName}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        {item.unread ? (
          <span className="w-1.5 h-1.5 rounded-full bg-[#008c44] shrink-0" />
        ) : (
          <span className="w-1.5 h-1.5 shrink-0" />
        )}
        <span
          className={`text-[13px] leading-5 text-[#1d1b18] truncate ${
            item.unread ? "font-semibold" : ""
          }`}
        >
          {item.message}
        </span>
      </div>

      <div className="flex flex-col items-start justify-center h-12 px-2 py-4 shrink-0 w-[100px]">
        {item.tag && <Tag type={item.tag} />}
      </div>

      <div className="flex items-center justify-end shrink-0 w-[38px]">
        <span className="text-[12px] leading-[18px] text-[#6d6a64] whitespace-nowrap">
          {item.time}
        </span>
      </div>
    </div>
  );
}

function SlackToast({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white border border-[#ecedef] rounded-lg shadow-lg px-5 py-3">
      <img src="/icons/slack-logo.png" alt="Slack" className="w-5 h-5 shrink-0" />
      <span className="text-[13px] text-[#1d1b18]">
        Get notified in Slack when items are ready for review
      </span>
      <button className="text-[13px] font-semibold text-white bg-[#4A154B] hover:bg-[#3a1039] px-3 py-1.5 rounded-md transition-colors">
        Connect Slack
      </button>
      <button
        onClick={onDismiss}
        className="text-[#9ca3af] hover:text-[#1d1b18] ml-1"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default function InboxView() {
  const [items, setItems] = useState<InboxItem[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<"view_output" | "human_review">("view_output");
  const [showSlackToast, setShowSlackToast] = useState(false);

  useEffect(() => {
    setItems(getInboxItems());
    const dismissed = localStorage.getItem("quill-slack-toast-dismissed");
    if (!dismissed) setShowSlackToast(true);
  }, []);

  const unreadCount = items.filter((i) => i.unread).length;

  return (
    <>
      <div className="flex flex-col flex-1 min-w-0 h-full bg-white overflow-hidden">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: "0.5px solid #CFCCC8" }}>
            <div className="flex items-center gap-2 mb-4">
              <InboxIcon size={24} className="text-[#1d1b18]" />
              <h1 className="text-[28px] font-semibold text-[#1d1b18]">
                Inbox{" "}
                <span className="text-[16px] font-normal text-[#676c79]">
                  ({unreadCount} unread)
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-[#ecedef] rounded-md w-[200px]">
                <img src="/icons/search.svg" alt="" className="w-3 h-3 shrink-0 opacity-50" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 text-sm text-[#1d1b18] placeholder-[#808593] bg-transparent outline-none"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#ecedef] rounded-md text-sm text-[#1d1b18]">
                <FilterIcon size={14} />
                Filter
              </button>
            </div>
          </div>

          <div>
            {items.map((item) => (
              <InboxRow
                key={item.id}
                item={item}
                onClick={() => {
                  markAsRead(item.id);
                  setItems(getInboxItems());
                  setReviewStatus(item.tag === "review" ? "human_review" : "view_output");
                  setReviewOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {reviewOpen && (
        <ReviewPanel
          onClose={() => setReviewOpen(false)}
          status={reviewStatus}
          sectionNavCollapsed
        />
      )}

      {showSlackToast && (
        <SlackToast
          onDismiss={() => {
            setShowSlackToast(false);
            localStorage.setItem("quill-slack-toast-dismissed", "true");
          }}
        />
      )}
    </>
  );
}
