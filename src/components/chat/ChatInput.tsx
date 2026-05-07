"use client";

import { useState, useRef, useEffect } from "react";
import { SendIcon, ChevronDownIcon } from "@/components/icons";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  placeholder = "Type / for commands",
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full border border-[#ecedef] rounded-lg p-2 bg-white">
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={2}
        className="w-full text-sm leading-5 text-[#1d1b18] placeholder-[#808593] bg-transparent outline-none resize-none"
      />
      <div className="flex items-center justify-between mt-1">
        <button className="flex items-center justify-center w-6 h-6 rounded-md text-[#676c79]">
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md px-2 py-0.5">
            <span className="text-xs leading-[18px] text-[#676c79]">
              Opus 4.6
            </span>
            <ChevronDownIcon size={10} className="text-[#676c79]" />
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className="flex items-center justify-center w-6 h-6 rounded-md bg-[#2f2f37] p-1.5 disabled:opacity-40 transition-opacity text-white"
          >
            <SendIcon size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}
