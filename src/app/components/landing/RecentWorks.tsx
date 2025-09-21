"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  name: string;
  description: string;
  impact: string;
  image: string;
  percent: number;
};

const projects: Project[] = [
  {
    name: "ShopEase",
    description:
      "Smart e-commerce platform with AI-powered recommendations and fast checkout experience.",
    impact: "45% boost in online conversions.",
    image: "https://astexai.tech/assets/1.JPG",
    percent: 85,
  },
  {
    name: "VisionX",
    description:
      "Revolutionizing product photography and media with cutting-edge AI visuals.",
    impact: "60% increase in engagement.",
    image: "https://astexai.tech/assets/2.JPG",
    percent: 78,
  },
  {
    name: "RideGo",
    description:
      "Urban mobility platform offering eco-friendly electric rides with seamless booking.",
    impact: "30% growth in ride bookings.",
    image: "https://astexai.tech/assets/3.JPG",
    percent: 82,
  },
];

export default function RecentWorksTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section
      id="works"
      className="py-20 bg-[var(--color-black)] text-[var(--color-white)]"
    >
      {/* Top Center Heading */}
      <div className="text-center max-w-3xl mx-auto px-4">
       
         <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
                >
                  Work That Makes Us Proud
                </motion.button>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-6 leading-snug">
          Recent Works,{" "}
          <span className="text-[var(--color-primary)]">Notable Impact</span>
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto px-4 mt-14 grid md:grid-cols-2 gap-12 items-center">
        {/* Left side tabs */}
        <div>
          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`text-left p-4 rounded-xl transition-all duration-300 border ${
                  activeIndex === index
                    ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]"
                    : "bg-transparent border-gray-700 hover:bg-[var(--color-highlight)]/10"
                }`}
              >
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {project.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right side image + stats */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.name}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={activeProject.image}
                alt={activeProject.name}
                className="rounded-2xl shadow-lg w-full transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute top-4 right-4 bg-[var(--color-primary)] text-black font-bold px-4 py-2 rounded-full">
                {activeProject.percent}%
              </span>
              <p className="mt-4 text-[var(--color-primary)] font-medium">
                {activeProject.impact}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
