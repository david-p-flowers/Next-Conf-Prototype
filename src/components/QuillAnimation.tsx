"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export type QuillAnimationType =
  | "idle"
  | "inkpot"
  | "q-logo"
  | "success"
  | "infinity"
  | "research"
  | "searching";

const animationFiles: Record<QuillAnimationType, { "24": string; "72": string }> = {
  idle: { "24": "/animations/Quill_Idle_24px.json", "72": "/animations/Quill_Idle_72px.json" },
  inkpot: { "24": "/animations/Quill_Inkpot_24px.json", "72": "/animations/Quill_Inkpot_72px.json" },
  "q-logo": { "24": "/animations/Quill_Q-Logo_24px.json", "72": "/animations/Quill_Q-Logo_72px.json" },
  success: { "24": "/animations/Quill_Success_24px.json", "72": "/animations/Quill_Success_72px.json" },
  infinity: { "24": "/animations/Quill_Infinity_24px.json", "72": "/animations/Quill_Infinity_72px.json" },
  research: { "24": "/animations/Quill_Research_24px.json", "72": "/animations/Quill_Research_72px.json" },
  searching: { "24": "/animations/Quill_Searching_24px.json", "72": "/animations/Quill_Searching_72px.json" },
};

interface QuillAnimationProps {
  type: QuillAnimationType;
  size?: "24" | "72";
  loop?: boolean;
  className?: string;
}

export default function QuillAnimation({
  type,
  size = "72",
  loop = true,
  className,
}: QuillAnimationProps) {
  const [animData, setAnimData] = useState<object | null>(null);

  useEffect(() => {
    fetch(animationFiles[type][size])
      .then((r) => r.json())
      .then(setAnimData);
  }, [type, size]);

  if (!animData) return null;

  return (
    <Lottie
      animationData={animData}
      loop={loop}
      className={className ?? "w-full h-full"}
    />
  );
}
