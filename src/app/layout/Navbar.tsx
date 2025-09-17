"use client";

import React from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[85%] backdrop-blur-md"
    >
      <nav className="flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-[var(--color-black)] shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-[var(--color-primary)]">⟠</span>
          <span className="text-white">BlackOS</span>
        </div>

        {/* Menu Items */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          <li className="text-white hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            Why Us
          </li>
          <li className="text-white hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            Mission
          </li>
          <li className="text-white hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            Works
          </li>
          <li className="text-white hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            Services
          </li>
          <li className="text-white hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            Pages
          </li>
        </ul>

        {/* Button */}
        <button
          className="hidden md:block relative px-5 py-2 rounded-xl font-semibold overflow-hidden group border border-white/10"
          style={{ color: "var(--color-white)" }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          <span className="relative z-10 flex items-center gap-2">
            Let&apos;s Talk ↗
          </span>
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>
      </nav>
    </motion.header>
  );
};

export default Navbar;
