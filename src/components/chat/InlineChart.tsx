"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface InlineChartProps {
  title: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
  data: { date: string; value: number }[];
}

export default function InlineChart({
  title,
  value,
  change,
  changeDirection,
  data,
}: InlineChartProps) {
  const isPositive = changeDirection === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full rounded-lg border border-[#ecedef] bg-white overflow-hidden"
    >
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[13px] text-[#676c79]">{title}</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[24px] font-semibold text-[#1d1b18]">
                {value}
              </span>
              <span
                className={`text-[12px] flex items-center gap-0.5 ${
                  isPositive ? "text-[#22c55e]" : "text-[#ef4444]"
                }`}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={isPositive ? "" : "rotate-180"}
                >
                  <path
                    d="M5 2l3 4H2l3-4z"
                    fill={isPositive ? "#22c55e" : "#ef4444"}
                  />
                </svg>
                {change}
              </span>
            </div>
          </div>
          <span className="text-[11px] text-[#9ca3af]">Last 90 days</span>
        </div>
      </div>
      <div className="h-[180px] px-2 pb-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="gradInlineChart"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={["dataMin - 1", "dataMax + 1"]}
              width={36}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #ecedef",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              formatter={(val) => [`${val}%`, title]}
            />
            <Area
              type="linear"
              dataKey="value"
              stroke="#0f8a8a"
              strokeWidth={1.5}
              fill="url(#gradInlineChart)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
