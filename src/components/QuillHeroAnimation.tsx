"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function QuillHeroAnimation() {
  const [done, setDone] = useState(false);
  const [animData, setAnimData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/Quill_Inkpot_72px.json")
      .then((r) => r.json())
      .then(setAnimData);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {!done && animData && (
          <motion.div
            key="lottie"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Lottie
              animationData={animData}
              loop={false}
              onComplete={() => setDone(true)}
              className="w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src="/icons/feather.svg"
        alt=""
        className="absolute inset-0 w-full h-full"
        style={{ transform: "scaleX(-1)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
