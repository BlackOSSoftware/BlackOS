"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Button from "../components/Reuse/button";
import { useRouter, usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "About", href: "#about", id: "about" },
    { label: "Why Us", href: "#why-us", id: "why-us" },
    { label: "Mission", href: "#mission", id: "mission" },
    { label: "Works", href: "#works", id: "works" },
    { label: "Services", href: "/services", id: "services-page" },
    { label: "Pages", href: "#", id: "pages" },
  ];

  // ✅ Helper for navigation + scroll
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        // Already on home → smooth scroll
        const id = href.replace("#", "");
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Not on home → go to home with hash
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Active section highlight
  // ✅ Active section highlight
useEffect(() => {
  if (pathname === "/") {
    const handleScroll = () => {
      let current = "";
      navItems.forEach((item) => {
        if (item.href.startsWith("#")) {
          const section = document.getElementById(item.id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (
              rect.top <= window.innerHeight / 2 &&
              rect.bottom >= window.innerHeight / 2
            ) {
              current = item.label;
            }
          }
        }
      });
      if (current) {
        setActive(current);
      } else {
        setActive(""); // no section active
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  } else {
    // ✅ On other pages → mark correct page item
    const currentNav = navItems.find((item) => item.href === pathname);
    setActive(currentNav ? currentNav.label : "");
  }
}, [pathname]);


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
          <Link
            href="/"
            scroll={true}
            className="group flex items-center gap-2 text-xl font-bold cursor-pointer"
          >
            <span className="text-[var(--color-primary)] transition-transform duration-500 group-hover:rotate-180">
              ⟠
            </span>
            <span className="text-white transition-colors duration-300 group-hover:text-[var(--color-primary)]">
              BlackOS
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) =>
              item.label === "Pages" ? (
                <li key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`flex items-center gap-1 cursor-pointer transition-colors duration-300 ${
                      active === item.label
                        ? "text-[var(--color-primary)]"
                        : "text-white hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-48 bg-[var(--color-black)]/90 border border-white/10 rounded-xl shadow-lg backdrop-blur-md py-3"
                      >
                        {[
                          { label: "Contact Us", href: "/contact" },
                          { label: "Terms & Conditions", href: "/terms" },
                          { label: "Our Pricing", href: "/pricing" },
                          { label: "About Us", href: "/about" },
                        ].map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              className="block px-4 py-2 text-sm text-white hover:bg-[var(--color-primary)]/20 transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.label} className="relative">
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`cursor-pointer transition-colors duration-300 ${
                      active === item.label
                        ? "text-[var(--color-primary)]"
                        : "text-white hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {item.label}
                  </button>
                  {active === item.label && item.href.startsWith("#") && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-[var(--color-primary)] rounded-full"
                    />
                  )}
                </li>
              )
            )}
          </ul>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Button onClick={() => router.push("/contact")}>
              Let&apos;s Talk ↗
            </Button>
          </div>

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
              className="fixed top-0 right-0 h-full w-[75%] bg-[var(--color-black)]/75 backdrop-blur-md z-50 p-6 flex flex-col justify-between"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
            >
              <div>
                {/* Close Button */}
                <button
                  className="self-end mb-8 text-white transition-colors duration-300 hover:text-[var(--color-primary)]"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-7 h-7" />
                </button>

                {/* Links */}
                <ul className="flex flex-col gap-6 text-lg font-medium">
                  {navItems.map((item) =>
                    item.label === "Pages" ? (
                      <li key={item.label}>
                        <button
                          onClick={() =>
                            setIsMobileDropdownOpen((prev) => !prev)
                          }
                          className={`flex items-center justify-between w-full transition-colors ${
                            active === item.label
                              ? "text-[var(--color-primary)]"
                              : "text-white hover:text-[var(--color-primary)]"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              isMobileDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isMobileDropdownOpen && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mt-2 flex flex-col gap-3 border-l border-white/20 pl-4"
                            >
                              {[
                                { label: "Contact Us", href: "/contact" },
                                { label: "Terms & Conditions", href: "/terms" },
                                { label: "Our Pricing", href: "/pricing" },
                                { label: "About Us", href: "/about" },
                              ].map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-[var(--color-primary)]"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleNavClick(item.href);
                          }}
                          className={`cursor-pointer transition-colors duration-300 ${
                            active === item.label
                              ? "text-[var(--color-primary)]"
                              : "text-white hover:text-[var(--color-primary)]"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* ✅ Button always at bottom */}
              <Button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/contact");
                }}
                className="w-full mt-6"
              >
                Let&apos;s Talk ↗
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
