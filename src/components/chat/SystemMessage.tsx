"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface SystemMessageProps {
  text: string;
  streamWordsPerSecond?: number;
  onStreamComplete?: () => void;
}

function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function SystemMessage({
  text,
  streamWordsPerSecond = 60,
  onStreamComplete,
}: SystemMessageProps) {
  const [displayedWords, setDisplayedWords] = useState(0);
  const words = text.split(" ");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const completeRef = useRef(false);

  useEffect(() => {
    const msPerWord = 1000 / streamWordsPerSecond;
    let current = 0;

    intervalRef.current = setInterval(() => {
      current++;
      setDisplayedWords(current);
      if (current >= words.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!completeRef.current) {
          completeRef.current = true;
          onStreamComplete?.();
        }
      }
    }, msPerWord);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [words.length, streamWordsPerSecond, onStreamComplete]);

  const visibleText = words.slice(0, displayedWords).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="text-sm leading-6 text-[#1d1b18] py-1"
    >
      <p>{renderMarkdown(visibleText)}</p>
    </motion.div>
  );
}
