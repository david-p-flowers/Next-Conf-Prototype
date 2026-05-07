"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@/components/icons";
import QuillAnimation from "@/components/QuillAnimation";
import type { QuillAnimationType } from "@/components/QuillAnimation";

interface ThinkingIndicatorProps {
  durationSeconds: number;
  isComplete: boolean;
}

const thinkingPhrases = [
  "Inkstorming...",
  "Sharpening the quill...",
  "Scanning citations...",
  "Galaxy-braining...",
  "Dipping the inkwell...",
  "Pontificating...",
  "Combing the SERPs...",
  "Pondersmithing...",
  "Drafting in the margins...",
  "Doing the agent thing...",
  "Tone-tuning...",
  "Cogitating...",
  "Reading the answers...",
  "Penning the play...",
  "Earning my keep...",
  "Synthesizing...",
  "Annotating...",
  "Big-braining...",
  "Auditing the answers...",
  "Narrative-building...",
  "Ruminating...",
  "Looking smart...",
  "Decoding the prompt...",
  "Marginalia-ing...",
  "Strategizering...",
  "On-brand-ing...",
  "Contemplating...",
  "Brain-noodling...",
  "Triangulating...",
  "Convening the lineup...",
  "MQL-ing...",
  "Soliloquizing...",
  "Hypothesizing...",
  "ToFu-ing...",
  "Captaining...",
  "Opining...",
  "Theorizing...",
  "Voice-finding...",
  "Musing...",
  "Channeling my inner Alex...",
  "Lowering CAC...",
  "ROAS-ing...",
  "Punditing...",
  "Deliberating...",
  "Discerning...",
];

const thinkingAnimCycle: QuillAnimationType[] = ["research", "searching", "infinity"];

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ThinkingIndicator({
  durationSeconds,
  isComplete,
}: ThinkingIndicatorProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);
  const shuffledPhrases = useRef(shuffled(thinkingPhrases));

  useEffect(() => {
    if (isComplete) return;
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % shuffledPhrases.current.length);
      setAnimIndex((prev) => (prev + 1) % thinkingAnimCycle.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isComplete]);

  const currentPhrase = shuffledPhrases.current[phraseIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2 py-2"
    >
      {!isComplete && (
        <div className="w-5 h-5 shrink-0">
          <QuillAnimation
            key={thinkingAnimCycle[animIndex]}
            type={thinkingAnimCycle[animIndex]}
            size="24"
          />
        </div>
      )}
      <div className="relative h-5 overflow-hidden">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.span
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[13px] text-[#676c79] leading-5 block"
            >
              Thought for {durationSeconds} seconds
            </motion.span>
          ) : (
            <motion.span
              key={currentPhrase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-[13px] text-[#676c79] leading-5 block whitespace-nowrap"
            >
              {currentPhrase}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <ChevronDownIcon
        size={10}
        className={`text-[#676c79] transition-transform duration-200 ${isComplete ? "" : "animate-pulse"}`}
      />
    </motion.div>
  );
}
