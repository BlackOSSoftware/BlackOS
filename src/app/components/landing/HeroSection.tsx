"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const handleVideoPlay = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video.play().catch(() => {
      });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* Content */}
      <div className="relative z-20 px-6 max-w-5xl">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300 drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          BlackOS Software Solution
        </motion.h1>

        <motion.p
          className="mx-auto text-lg md:text-2xl leading-relaxed text-gray-100 mb-8 drop-shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          We empower businesses with{" "}
          <span className="text-orange-400 font-semibold">high-performance software</span>,{" "}
          <span className="text-yellow-400 font-semibold">AI solutions</span>, and{" "}
          <span className="text-orange-300 font-semibold">digital innovation</span>{" "}
          that drives real results. From startups to enterprises, we craft scalable,
          reliable, and future-ready solutions tailored to your needs.
        </motion.p>

        <motion.button
          onClick={() => (window.location.href = "/contact")}
          className="group relative px-10 py-4 rounded-full font-bold shadow-xl transition-transform hover:scale-105 overflow-hidden focus:outline-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 opacity-100 transition-opacity group-hover:opacity-80 rounded-full" />
          <span className="relative z-10 flex items-center gap-2 text-white">
            Get Started <ArrowRight className="w-6 h-6" />
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
