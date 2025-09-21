"use client";

import { motion } from "framer-motion";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`hidden md:block relative px-5 py-2 rounded-xl font-semibold border border-white/10 text-[var(--color-white)] group overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(60% 120% at 100% 100%, rgba(255,138,0,0.95) 0%, rgba(30,30,30,0.9) 100%)",
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
