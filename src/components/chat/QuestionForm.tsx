"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CircleInfoIcon } from "@/components/icons";

interface QuestionFormProps {
  title: string;
  options: string[];
  allowCustom?: boolean;
  customPlaceholder?: string;
  onSubmit: (answer: string) => void;
}

export default function QuestionForm({
  title,
  options,
  allowCustom,
  customPlaceholder = "Type something else...",
  onSubmit,
}: QuestionFormProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");

  const handleSubmit = () => {
    const answer = selected === "__custom" ? customText : selected;
    if (answer) onSubmit(answer);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full border border-[#ecedef] rounded-lg p-5 my-2 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <CircleInfoIcon size={14} className="text-[#676c79] shrink-0" />
        <h3 className="text-sm font-semibold text-[#1d1b18]">{title}</h3>
      </div>

      <div className="flex flex-col gap-0">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => setSelected(option)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors text-left w-full ${
              selected === option ? "bg-[rgba(9,9,11,0.04)]" : "hover:bg-[rgba(9,9,11,0.02)]"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                selected === option
                  ? "border-[#1d1b18] bg-[#1d1b18]"
                  : "border-[#cfccc8]"
              }`}
            >
              {selected === option && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
            <span className="text-sm text-[#1d1b18]">{option}</span>
          </button>
        ))}

        {allowCustom && (
          <label
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
              selected === "__custom" ? "bg-[rgba(9,9,11,0.04)]" : "hover:bg-[rgba(9,9,11,0.02)]"
            }`}
            onClick={() => setSelected("__custom")}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                selected === "__custom"
                  ? "border-[#1d1b18] bg-[#1d1b18]"
                  : "border-[#cfccc8]"
              }`}
            >
              {selected === "__custom" && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
            <input
              type="text"
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setSelected("__custom");
              }}
              onFocus={() => setSelected("__custom")}
              placeholder={customPlaceholder}
              className="flex-1 text-sm text-[#1d1b18] placeholder-[#808593] bg-transparent outline-none"
            />
          </label>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={!selected || (selected === "__custom" && !customText)}
          className="px-4 py-1.5 bg-[#1d1b18] text-white text-xs font-medium rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2f2f37] transition-colors"
        >
          Submit
        </button>
      </div>
    </motion.div>
  );
}
