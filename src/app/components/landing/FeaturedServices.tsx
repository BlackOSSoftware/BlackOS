"use client";

import { ReactNode } from "react";
import { Code2, Smartphone, Bot, Megaphone, Palette } from "lucide-react";

type Service = {
  title: string;
  icon: ReactNode;
  color: string;
};

const services: Service[] = [
  {
    title: "Website Development",
    icon: <Code2 className="w-5 h-5" />,
    color: "var(--color-secondary)", // Blue
  },
  {
    title: "App Development",
    icon: <Smartphone className="w-5 h-5" />,
    color: "#A855F7", // Purple (custom for visibility)
  },
  {
    title: "AI Agents",
    icon: <Bot className="w-5 h-5" />,
    color: "var(--color-success)", // Green
  },
  {
    title: "Influencer Marketing",
    icon: <Megaphone className="w-5 h-5" />,
    color: "#EC4899", // Pink
  },
  {
    title: "Graphics Design",
    icon: <Palette className="w-5 h-5" />,
    color: "var(--color-primary)", // Orange
  },
];

export default function FeaturedServices() {
  return (
    <section className="w-full py-16 bg-[var(--color-black)]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-lg font-medium text-[var(--color-white)] mb-10">
          Our <span className="text-[var(--color-primary)]">Featured Services</span>
        </h2>

        {/* Services Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-[var(--color-black)]/70 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span style={{ color: service.color }}>{service.icon}</span>
              <span className="text-[var(--color-white)] font-medium text-sm md:text-base">
                {service.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
