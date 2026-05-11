"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import OpportunitiesTab from "./OpportunitiesTab";
import ActionTab from "./ActionTab";
import BriefPanel from "./BriefPanel";
import ReviewPanel from "./ReviewPanel";
import type { StatusType } from "./StatusCell";
import type { OpportunityRow } from "@/lib/playData";
import type { ActionRow } from "@/lib/playData";

const MeasureTab = dynamic(() => import("./MeasureTab"), { ssr: false });

type Tab = "opportunities" | "action" | "measure";

export default function PlayDetailView() {
  const [activeTab, setActiveTab] = useState<Tab>("opportunities");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<StatusType>("view_output");
  const [panelOpen, setPanelOpen] = useState(true);
  const [promotedRows, setPromotedRows] = useState<ActionRow[]>([]);

  const handleTakeAction = (opportunities: OpportunityRow[]) => {
    const newRows: ActionRow[] = opportunities.map((opp, idx) => ({
      id: `promoted-${Date.now()}-${idx}`,
      page: opp.page,
      opportunityDate: opp.dateCreated,
      pageSlug: opp.page.split("/").pop() || "",
      refreshBrief: opp.reasoning.slice(0, 30) + "...",
      landingPageRefresh: "run_playbook" as const,
      refreshedContent: "",
      published: false,
    }));
    setPromotedRows((prev) => [...prev, ...newRows]);
    setActiveTab("action");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "opportunities", label: "Opportunities" },
    { id: "action", label: "Action" },
    { id: "measure", label: "Measure" },
  ];

  return (
    <>
      <div className="flex flex-col flex-1 min-w-0 h-full bg-white overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-4 shrink-0 sticky top-0 bg-white z-10">
          <div className="flex flex-col gap-2">
            <Link href="/plays" className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-[#09090b] border border-[rgba(9,9,11,0.08)] rounded-md bg-white hover:bg-[#fafafa] w-fit">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.43183 1.81833C4.57828 1.96478 4.57828 2.20222 4.43183 2.34866L2.15534 4.62513H8.75C8.95711 4.62513 9.125 4.79303 9.125 5.00013C9.125 5.20724 8.95711 5.37513 8.75 5.37513H2.15533L4.43183 7.65163C4.57828 7.79808 4.57828 8.03552 4.43183 8.18197C4.28539 8.32841 4.04795 8.32841 3.9015 8.18197L0.984835 5.2653C0.914509 5.19497 0.875 5.09959 0.875 5.00013C0.875 4.90068 0.91451 4.80529 0.984836 4.73497L3.9015 1.81833C4.04795 1.67188 4.28539 1.67189 4.43183 1.81833Z" fill="#09090B" />
              </svg>
              Back
            </Link>
            <h1 className="text-[24px] font-semibold text-black tracking-[-0.24px] leading-8">
              Food & Culinary Experience Refresh Play
            </h1>
          </div>
          <p className="text-[12px] text-[#676c79] leading-[18px] mt-2 truncate">
            Descriptive text for the play Descriptive text for the playDescriptive text for the playDescriptive text for the play
          </p>
        </div>

        {/* Tabs */}
        <div className="px-8 pt-4 pb-6 border-b border-[#ecedef] shrink-0">
          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-[13px] font-semibold rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#ebfaee] text-[#005228]"
                    : "text-[#09090b] hover:bg-[#f5f5f5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 min-h-0 flex">
          <div className="flex-1 min-w-0 overflow-y-auto">
            {activeTab === "opportunities" && (
              <OpportunitiesTab onTakeAction={handleTakeAction} />
            )}
            {activeTab === "action" && (
              <ActionTab
                additionalRows={promotedRows}
                onViewOutput={(status) => {
                  setReviewStatus(status);
                  setReviewOpen(true);
                }}
              />
            )}
            {activeTab === "measure" && <MeasureTab />}
          </div>

          {/* Right config panel — opportunities tab only */}
          {activeTab === "opportunities" && panelOpen && (
            <div className="shrink-0 border-l border-[#ecedef] p-6">
              <BriefPanel
                isOpen={panelOpen}
                onToggle={() => setPanelOpen(!panelOpen)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Review Panel Overlay */}
      {reviewOpen && <ReviewPanel onClose={() => setReviewOpen(false)} status={reviewStatus} />}
    </>
  );
}
