"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Why Us", href: "#whyus" },
    { label: "Mission", href: "#mission" },
    { label: "Works", href: "#works" },
    { label: "Services", href: "#services" },
    { label: "Pages", href: "#pages" },
  ];

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[85%] backdrop-blur-md"
      >
        <nav className="flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-[var(--color-black)]/75 shadow-lg">
          {/* Logo */}
          <div
            className="group flex items-center gap-2 text-xl font-bold cursor-pointer"
            onClick={() => setActive("about")}
          >
            <span className="text-[var(--color-primary)] transition-transform duration-500 group-hover:rotate-180">
              ⟠
            </span>
            <span className="text-white transition-colors duration-300 group-hover:text-[var(--color-primary)]">
              BlackOS
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                <a
                  href={item.href}
                  onClick={() => setActive(item.label)}
                  className={`cursor-pointer transition-colors duration-300 ${
                    active === item.label
                      ? "text-[var(--color-primary)]"
                      : "text-white hover:text-[var(--color-primary)]"
                  }`}
                >
                  {item.label}
                </a>
                {active === item.label && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-[var(--color-primary)] rounded-full"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Button (Desktop Only) */}
          <button className="hidden md:block relative px-5 py-2 rounded-xl font-semibold border border-white/10 text-[var(--color-white)] transition-all duration-300 hover:scale-105 group overflow-hidden">
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Let&apos;s Talk ↗
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition-colors duration-300 hover:text-[var(--color-primary)]"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[75%] bg-[var(--color-black)]/75 backdrop-blur-md z-50 p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
            >
              {/* Close Button */}
              <button
                className="self-end mb-8 text-white transition-colors duration-300 hover:text-[var(--color-primary)]"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-7 h-7" />
              </button>

              {/* Links */}
              <ul className="flex flex-col gap-6 text-lg font-medium">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => {
                        setActive(item.label);
                        setIsOpen(false);
                      }}
                      className={`cursor-pointer transition-colors duration-300 ${
                        active === item.label
                          ? "text-[var(--color-primary)]"
                          : "text-white hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="mt-10 relative px-6 py-3 rounded-xl font-semibold overflow-hidden group border border-white/10 text-white transition-transform duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <span className="relative z-10">Let&apos;s Talk ↗</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
