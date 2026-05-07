"use client";

import { motion } from "framer-motion";

interface UserBubbleProps {
  text: string;
}

export default function UserBubble({ text }: UserBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex justify-end w-full"
    >
      <div className="bg-[#d4edda] text-[#1d1b18] text-sm leading-5 px-4 py-2.5 rounded-lg max-w-[480px]">
        {text}
      </div>
    </motion.div>
  );
}
