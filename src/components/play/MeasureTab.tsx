"use client";

import {
  measureMetrics,
  citationRateChartData,
  citationShareChartData,
  actionData,
} from "@/lib/playData";
import type { ChartDataPoint } from "@/lib/playData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import config from "@/data/config.json";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const clicksChartData: ChartDataPoint[] = [
  { date: "Aug 01", value: 35 },
  { date: "Aug 05", value: 38 },
  { date: "Aug 10", value: 36 },
  { date: "Aug 15", value: 34 },
  { date: "Aug 20", value: 33, marker: 1 },
  { date: "Aug 25", value: 42 },
  { date: "Sep 01", value: 55 },
  { date: "Sep 05", value: 58, marker: 2 },
  { date: "Sep 10", value: 72 },
  { date: "Sep 15", value: 85 },
  { date: "Sep 20", value: 82, marker: 3 },
  { date: "Sep 25", value: 95 },
];

const trafficChartData: ChartDataPoint[] = [
  { date: "Aug 01", value: 28 },
  { date: "Aug 05", value: 30 },
  { date: "Aug 10", value: 27 },
  { date: "Aug 15", value: 25 },
  { date: "Aug 20", value: 24, marker: 1 },
  { date: "Aug 25", value: 32 },
  { date: "Sep 01", value: 40 },
  { date: "Sep 05", value: 42, marker: 2 },
  { date: "Sep 10", value: 55 },
  { date: "Sep 15", value: 65 },
  { date: "Sep 20", value: 63, marker: 3 },
  { date: "Sep 25", value: 74 },
];

const updatesChartData: ChartDataPoint[] = [
  { date: "Apr 01", value: 10 },
  { date: "Apr 05", value: 15 },
  { date: "Apr 08", value: 22, marker: 1 },
  { date: "Apr 10", value: 45 },
  { date: "Apr 12", value: 52 },
  { date: "Apr 15", value: 58, marker: 2 },
  { date: "Apr 18", value: 78 },
  { date: "Apr 20", value: 85 },
  { date: "Apr 22", value: 95, marker: 3 },
  { date: "Apr 25", value: 115 },
  { date: "Apr 27", value: 130 },
  { date: "Apr 30", value: 145 },
  { date: "May 02", value: 140 },
];

const staticHistory = [
  { date: "Mar 18, 2026", folder: "product", page: "/credit-builder-card", source: "Q1 Goals Grid", sourceType: "grid" as const },
  { date: "Mar 17, 2026", folder: "features", page: "/competition-workflow", source: "Competition Workflow", sourceType: "workflow" as const },
  { date: "Mar 16, 2026", folder: "product", page: "/competition-workflow", source: "Competition Workflow", sourceType: "workflow" as const },
  { date: "Mar 15, 2026", folder: "features", page: "/q1-goals-grid", source: "Q1 Goals Grid", sourceType: "grid" as const },
  { date: "Mar 14, 2026", folder: "product", page: "/q1-goals-grid", source: "Q1 Goals Grid", sourceType: "grid" as const },
  { date: "Mar 13, 2026", folder: "learn", page: "/competition-workflow", source: "Competition Workflow", sourceType: "workflow" as const },
];

function MarkerDot(props: { cx?: number; cy?: number; payload?: ChartDataPoint }) {
  const { cx, cy, payload } = props;
  if (!payload?.marker || cx == null || cy == null) return null;
  return (
    <circle cx={cx} cy={cy} r={4} fill="#1d1b18" stroke="#fff" strokeWidth={2} />
  );
}

function getMarkerDates(data: ChartDataPoint[]): string[] {
  return data.filter((d) => d.marker).map((d) => d.date);
}

function PublishedBadge({ count }: { count: number }) {
  return (
    <span className="text-xs text-[#676c79] bg-[#f3f4f6] px-2 py-0.5 rounded flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#1d1b18]" />
      {count} Published Content
    </span>
  );
}

export default function MeasureTab() {
  const [publishedRows] = useLocalStorage<Record<string, boolean>>("quill-action-published-rows", {});
  const publishedCount = Object.values(publishedRows).filter(Boolean).length;

  const dynamicHistory = Object.entries(publishedRows)
    .filter(([, published]) => published)
    .map(([id]) => {
      const row = actionData.find((r) => r.id === id);
      if (!row) return null;
      return {
        date: row.opportunityDate,
        folder: "experiences",
        page: row.page.replace("https://acmeco.com", ""),
        source: "Food & Dining Refresh",
        sourceType: "workflow" as const,
      };
    })
    .filter(Boolean) as typeof staticHistory;

  const contentUpdatesHistory = [...dynamicHistory, ...staticHistory];

  const citationMarkers = getMarkerDates(citationRateChartData);
  const shareMarkers = getMarkerDates(citationShareChartData);
  const clicksMarkers = getMarkerDates(clicksChartData);
  const trafficMarkers = getMarkerDates(trafficChartData);
  const updatesMarkers = getMarkerDates(updatesChartData);

  return (
    <div className="flex flex-col gap-6 px-8 py-5">
      {/* Filters */}
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center gap-1.5 rounded-md bg-white hover:bg-[#fafafa] text-[13px] text-[#1d1b18]" style={{ padding: "6px 12px", border: "1px solid rgba(9, 9, 11, 0.08)" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke="#6D6A64" strokeWidth="1" />
            <path d="M1.5 5.5h11" stroke="#6D6A64" strokeWidth="1" />
            <path d="M4.5 1v2M9.5 1v2" stroke="#6D6A64" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {config.measure.dateRange}
          <img src="/icons/toolbar-caret-down.svg" alt="" className="w-[10px] h-[10px] shrink-0" />
        </button>
        <button className="flex items-center justify-center gap-1.5 rounded-md bg-white hover:bg-[#fafafa] text-[13px] text-[#1d1b18]" style={{ padding: "6px 12px", border: "1px solid rgba(9, 9, 11, 0.08)" }}>
          <span className="font-medium">Region</span>
          {config.measure.region}
          <img src="/icons/toolbar-caret-down.svg" alt="" className="w-[10px] h-[10px] shrink-0" />
        </button>
        <button className="flex items-center justify-center gap-1.5 rounded-md bg-white hover:bg-[#fafafa] text-[13px] text-[#1d1b18]" style={{ padding: "6px 12px", border: "1px solid rgba(9, 9, 11, 0.08)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
            <path d="M2 3h8M4 6h4M5 9h2" stroke="#6D6A64" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Filter
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        {measureMetrics.map((metric) => (
          <div key={metric.label} className="border border-[#ecedef] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#676c79]">{metric.label}</span>
              <span className="text-[#d1d5db] text-xs cursor-help">ⓘ</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-semibold text-[#1d1b18]">
                {metric.label === "Pages Refreshed" ? `${publishedCount + 76}` : metric.value}
              </span>
              <span className="text-xs text-[#22c55e] flex items-center gap-0.5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 2l3 4H2l3-4z" fill="#22c55e" />
                </svg>
                {metric.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Citation Rate & Citation Share Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#ecedef] rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-[#1d1b18]">Citation Rate</h3>
            <PublishedBadge count={publishedCount} />
          </div>
          <p className="text-xs text-[#676c79] mb-4">
            How often these pages are cited in AI responses
          </p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={citationRateChartData}>
                <defs>
                  <linearGradient id="gradCitation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
                {citationMarkers.map((d) => (
                  <ReferenceLine key={d} x={d} stroke="#d1d5db" strokeDasharray="3 3" />
                ))}
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, "auto"]} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #ecedef", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
                <Area type="linear" dataKey="value" stroke="#0f8a8a" strokeWidth={1.5} fill="url(#gradCitation)" dot={<MarkerDot />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-[#ecedef] rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-[#1d1b18]">Citation Share</h3>
            <PublishedBadge count={publishedCount} />
          </div>
          <p className="text-xs text-[#676c79] mb-4">
            These page&apos;s portion of total citations
          </p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={citationShareChartData}>
                <defs>
                  <linearGradient id="gradShare" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
                {shareMarkers.map((d) => (
                  <ReferenceLine key={d} x={d} stroke="#d1d5db" strokeDasharray="3 3" />
                ))}
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[10, "auto"]} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #ecedef", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
                <Area type="linear" dataKey="value" stroke="#0f8a8a" strokeWidth={1.5} fill="url(#gradShare)" dot={<MarkerDot />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Clicks */}
      <div className="border border-[#ecedef] rounded-lg p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <img src="/assets/image_313-6e4b1654-07cd-48c5-8d77-c192df12d558.png" alt="" className="w-4 h-4" />
            <h3 className="text-sm font-medium text-[#1d1b18]">Clicks</h3>
          </div>
          <div className="flex items-center gap-2">
            <PublishedBadge count={publishedCount} />
            <span className="text-xs text-[#676c79] border border-[#ecedef] px-2 py-0.5 rounded flex items-center gap-1">
              Clicks <span>▾</span>
            </span>
          </div>
        </div>
        <p className="text-xs text-[#676c79] mb-2">
          Times users clicked this page in search results
        </p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[36px] font-semibold text-[#1d1b18]">6000</span>
          <span className="text-sm text-[#22c55e]">+1.2%</span>
        </div>
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={clicksChartData}>
              <defs>
                <linearGradient id="gradClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
              {clicksMarkers.map((d) => (
                <ReferenceLine key={d} x={d} stroke="#d1d5db" strokeDasharray="3 3" />
              ))}
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #ecedef", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
              <Area type="linear" dataKey="value" stroke="#0f8a8a" strokeWidth={1.5} fill="url(#gradClicks)" dot={<MarkerDot />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center mt-2">
          <span className="flex items-center gap-1.5 text-xs text-[#676c79]">
            <span className="w-2 h-2 rounded-sm bg-[#1d1b18]" />
            Clicks
          </span>
        </div>
      </div>

      {/* Traffic */}
      <div className="border border-[#ecedef] rounded-lg p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <img src="/assets/Clip_path_group-b12f6aee-ff5d-42d5-8304-38bca3913904.png" alt="" className="w-4 h-4" />
            <h3 className="text-sm font-medium text-[#1d1b18]">Traffic</h3>
          </div>
          <div className="flex items-center gap-2">
            <PublishedBadge count={publishedCount} />
            <span className="text-xs text-[#676c79] border border-[#ecedef] px-2 py-0.5 rounded flex items-center gap-1">
              Traffic <span>▾</span>
            </span>
          </div>
        </div>
        <p className="text-xs text-[#676c79] mb-2">
          Times users clicked this page in search results
        </p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[36px] font-semibold text-[#1d1b18]">6000</span>
          <span className="text-sm text-[#22c55e]">+1.2%</span>
        </div>
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficChartData}>
              <defs>
                <linearGradient id="gradTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
              {trafficMarkers.map((d) => (
                <ReferenceLine key={d} x={d} stroke="#d1d5db" strokeDasharray="3 3" />
              ))}
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #ecedef", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
              <Area type="linear" dataKey="value" stroke="#0f8a8a" strokeWidth={1.5} fill="url(#gradTraffic)" dot={<MarkerDot />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center mt-2">
          <span className="flex items-center gap-1.5 text-xs text-[#676c79]">
            <span className="w-2 h-2 rounded-sm bg-[#1d1b18]" />
            Traffic
          </span>
        </div>
      </div>

      {/* Updates Over Time */}
      <div className="border border-[#ecedef] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#1d1b18]">Updates Over Time</h3>
          <span className="text-xs text-[#676c79] border border-[#ecedef] px-2 py-0.5 rounded flex items-center gap-1">
            All Updates <span>▾</span>
          </span>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={updatesChartData}>
              <defs>
                <linearGradient id="gradUpdates" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
              {updatesMarkers.map((d) => (
                <ReferenceLine key={d} x={d} stroke="#d1d5db" strokeDasharray="3 3" />
              ))}
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #ecedef", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
              <Area type="linear" dataKey="value" stroke="#0f8a8a" strokeWidth={1.5} fill="url(#gradUpdates)" dot={<MarkerDot />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center mt-2">
          <span className="flex items-center gap-1.5 text-xs text-[#676c79]">
            <span className="w-2 h-2 rounded-sm bg-[#22c55e]" />
            Pages Updated
          </span>
        </div>
      </div>

      {/* Content Updates History Table */}
      <div className="border border-[#ecedef] rounded-lg overflow-hidden">
        <div className="px-5 py-4">
          <h3 className="text-sm font-medium text-[#1d1b18]">Content Updates History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-[#ecedef]">
              <th className="text-left text-[13px] font-medium text-[#4b4d58] px-5 py-3 w-[140px]">Date</th>
              <th className="text-left text-[13px] font-medium text-[#4b4d58] px-5 py-3 w-[140px]">Folder</th>
              <th className="text-left text-[13px] font-medium text-[#4b4d58] px-5 py-3">Page</th>
              <th className="text-left text-[13px] font-medium text-[#4b4d58] px-5 py-3 w-[220px]">Source</th>
            </tr>
          </thead>
          <tbody>
            {contentUpdatesHistory.map((row, idx) => (
              <tr key={idx} className="border-b border-[#ecedef] last:border-b-0">
                <td className="text-[13px] font-semibold text-[#09090b] px-5 py-4">{row.date}</td>
                <td className="text-[13px] text-[#09090b] px-5 py-4">
                  <span className="flex items-center gap-2">
                    <img src="/icons/folder-open.svg" alt="" className="w-[15px] h-[15px] shrink-0" />
                    {row.folder}
                  </span>
                </td>
                <td className="text-[13px] text-[#09090b] px-5 py-4">{row.page}</td>
                <td className="text-[13px] text-[#09090b] px-5 py-4">
                  <span className="flex items-center gap-2">
                    {row.sourceType === "grid" ? (
                      <img src="/icons/grid-02.svg" alt="" className="w-[14px] h-[14px] shrink-0" />
                    ) : (
                      <img src="/icons/lightning-workflow.svg" alt="" className="w-[14px] h-[14px] shrink-0" />
                    )}
                    {row.source}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
