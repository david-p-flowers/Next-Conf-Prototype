"use client";

import { motion } from "framer-motion";
import { CircleInfoIcon } from "@/components/icons";

interface QuestionAnswerInlineProps {
  title: string;
  answer: string;
}

export default function QuestionAnswerInline({
  title,
  answer,
}: QuestionAnswerInlineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full border border-[#ecedef] rounded-lg px-4 py-3 my-2"
    >
      <div className="flex items-center gap-2 mb-1">
        <CircleInfoIcon size={14} className="text-[#676c79] shrink-0" />
        <span className="text-sm font-semibold text-[#1d1b18]">{title}</span>
      </div>
      <div className="pl-[22px]">
        <span className="text-sm text-[#1d1b18] bg-[#f3f4f6] px-2 py-0.5 rounded">
          {answer}
        </span>
      </div>
    </motion.div>
  );
}
