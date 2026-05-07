"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface CreatedItemProps {
  title: string;
  subtitle: string;
  animationDelay?: number;
}

type Phase = "waiting" | "ink" | "writing" | "done";

export default function CreatedItem({ title, subtitle, animationDelay = 0 }: CreatedItemProps) {
  const [phase, setPhase] = useState<Phase>(
    animationDelay > 0 ? "waiting" : "ink"
  );
  const [inkData, setInkData] = useState<object | null>(null);
  const [scribbleData, setScribbleData] = useState<object | null>(null);
  const [successData, setSuccessData] = useState<object | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/animations/Quill_Inkpot_24px.json").then((r) => r.json()),
      fetch("/animations/scribbling.json").then((r) => r.json()),
      fetch("/animations/Quill_Success_24px.json").then((r) => r.json()),
    ]).then(([ink, scribble, success]) => {
      setInkData(ink);
      setScribbleData(scribble);
      setSuccessData(success);
    });
  }, []);

  useEffect(() => {
    if (phase === "waiting" && animationDelay > 0) {
      const t = setTimeout(() => setPhase("ink"), animationDelay);
      return () => clearTimeout(t);
    }
  }, [phase, animationDelay]);

  useEffect(() => {
    if (phase === "ink") {
      const t = setTimeout(() => setPhase("writing"), 1800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "writing") {
      const t = setTimeout(() => setPhase("done"), 4000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const statusText = () => {
    switch (phase) {
      case "waiting": return "Queued";
      case "ink": return "Starting...";
      case "writing": return "Creating...";
      case "done": return subtitle;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center gap-3 w-full border border-[#ecedef] rounded-lg px-4 py-3 my-1 bg-white"
    >
      <div className="w-8 h-8 flex items-center justify-center shrink-0 overflow-hidden">
        {phase === "waiting" && (
          <div className="w-full h-full bg-[#f3f4f6] rounded-full animate-pulse" />
        )}
        {phase === "ink" && inkData && (
          <Lottie animationData={inkData} loop={false} className="w-8 h-8" />
        )}
        {phase === "writing" && scribbleData && (
          <Lottie animationData={scribbleData} loop className="w-10 h-10" />
        )}
        {phase === "done" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-8 h-8"
          >
            <Lottie animationData={successData} loop={false} className="w-full h-full" />
          </motion.div>
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-[#1d1b18] truncate">
          {title}
        </span>
        <span className="text-xs text-[#676c79]">
          {statusText()}
        </span>
      </div>
    </motion.div>
  );
}
