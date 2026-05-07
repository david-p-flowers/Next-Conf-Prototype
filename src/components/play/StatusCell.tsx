"use client";

import { useState, useEffect } from "react";

export type StatusType =
  | "view_output"
  | "human_review"
  | "run_playbook"
  | "loading";

interface StatusCellProps {
  status: StatusType;
  onViewOutput?: () => void;
  onRunPlaybook?: () => void;
}

export default function StatusCell({ status, onViewOutput, onRunPlaybook }: StatusCellProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-[36px] flex items-center self-stretch whitespace-nowrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={getCellStyle(status, hovered)}
    >
      {status === "view_output" && (
        <ViewOutputCell hovered={hovered} onViewOutput={onViewOutput} />
      )}
      {status === "human_review" && (
        <HumanReviewCell hovered={hovered} onViewOutput={onViewOutput} />
      )}
      {status === "run_playbook" && (
        <RunPlaybookCell hovered={hovered} onRun={onRunPlaybook} />
      )}
      {status === "loading" && <LoadingCell />}
    </div>
  );
}

function getCellStyle(status: StatusType, hovered: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    borderBottom: "1px solid rgba(9, 9, 11, 0.08)",
  };

  switch (status) {
    case "view_output":
      return {
        ...base,
        padding: hovered ? "7px 7px 7px 8px" : "7px 90px 7px 8px",
        background: hovered
          ? "rgba(129, 211, 76, 0.08)"
          : "linear-gradient(0deg, rgba(129, 211, 76, 0.04) 0%, rgba(129, 211, 76, 0.04) 100%), #FFF",
        justifyContent: hovered ? "space-between" : undefined,
      };
    case "human_review":
      return {
        ...base,
        padding: hovered ? "7px 7px 7px 8px" : "7px 73px 7px 8px",
        background: hovered
          ? "rgba(247, 144, 9, 0.08)"
          : "rgba(247, 144, 9, 0.04)",
        borderBottomColor: "rgba(9, 9, 11, 0.06)",
        justifyContent: hovered ? "space-between" : undefined,
      };
    case "run_playbook":
      return {
        ...base,
        padding: hovered ? "8px" : "8px 81px 8px 8px",
        gap: "4px",
        background: hovered ? "rgba(0, 136, 255, 0.04)" : undefined,
      };
    case "loading":
      return {
        ...base,
        borderBottomColor: "#09090b",
      };
    default:
      return base;
  }
}

function ViewOutputCell({ hovered, onViewOutput }: { hovered: boolean; onViewOutput?: () => void }) {
  return (
    <>
      <button
        onClick={onViewOutput}
        className="flex items-center gap-[6px]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" fill="#4ade80" stroke="#22c55e" strokeWidth="1" />
          <path d="M5.5 8L7 9.5L10.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[13px] text-[#09090b]">View output</span>
      </button>
      {hovered && (
        <button
          onClick={onViewOutput}
          className="w-[22px] h-[22px] flex items-center justify-center rounded-[4px] border border-[rgba(9,9,11,0.08)] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="#09090b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
}

function HumanReviewCell({ hovered, onViewOutput }: { hovered: boolean; onViewOutput?: () => void }) {
  return (
    <>
      <button
        onClick={onViewOutput}
        className="flex items-center gap-[6px]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" fill="#fb923c" stroke="#f97316" strokeWidth="1" />
          <path d="M8 5v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="10.5" r="0.75" fill="white" />
        </svg>
        <span className="text-[13px] font-normal text-[#09090b]">Human Review</span>
      </button>
      {hovered && (
        <button
          onClick={onViewOutput}
          className="w-[22px] h-[22px] flex items-center justify-center rounded-[4px] border border-[rgba(247,144,9,0.3)] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="#09090b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
}

function RunPlaybookCell({ hovered, onRun }: { hovered: boolean; onRun?: () => void }) {
  if (hovered) {
    return (
      <div className="flex items-center justify-center w-full">
        <button
          onClick={onRun}
          className="flex items-center justify-center transition-transform hover:scale-125"
        >
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path d="M4.5 2.5L11.5 7L4.5 11.5V2.5Z" fill="#0088FF" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[4px]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="#0088FF" strokeWidth="1.2" />
        <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="#0088FF" />
      </svg>
      <span className="text-[13px] text-[#09090b]">Run playbook</span>
    </div>
  );
}

const loadingPhrases = [
  "Fetching sources...",
  "Analyzing content...",
  "Checking citations...",
  "Building draft...",
  "Verifying facts...",
  "Pulling brand kit...",
  "Matching tone...",
  "Running playbook...",
];

function LoadingCell() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-[6px] px-2 w-full overflow-hidden">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin shrink-0">
        <circle cx="7" cy="7" r="5.5" stroke="#e5e7eb" strokeWidth="1.5" />
        <path d="M12.5 7a5.5 5.5 0 00-5.5-5.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="relative flex-1 h-[20px] overflow-hidden">
        <span
          key={index}
          className="absolute inset-0 flex items-center text-[12px] text-[#9ca3af] animate-pulse"
        >
          {loadingPhrases[index]}
        </span>
      </div>
    </div>
  );
}
