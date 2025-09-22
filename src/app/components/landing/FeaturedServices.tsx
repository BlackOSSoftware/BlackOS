"use client";

import { ReactNode } from "react";
import {
  Code2,
  Smartphone,
  PenTool,
  DollarSign,
  Presentation,
} from "lucide-react";
import { motion } from "framer-motion";

type Service = {
  title: string;
  icon: ReactNode;
  color: string;
};

// const services: Service[] = [
//   { title: "Website Development", icon: <Code2 className="w-5 h-5" />, color: "var(--color-secondary)" },
//   { title: "App Development", icon: <Smartphone className="w-5 h-5" />, color: "#A855F7" },
//   { title: "UI/UX Design", icon: <PenTool className="w-5 h-5" />, color: "#F59E0B" },
//   { title: "E-commerce Websites", icon: <ShoppingCart className="w-5 h-5" />, color: "#22D3EE" },
//   { title: "Portfolio Websites", icon: <Palette className="w-5 h-5" />, color: "var(--color-primary)" },
//   { title: "ERP Systems", icon: <ClipboardList className="w-5 h-5" />, color: "#14B8A6" },
//   { title: "CRM Solutions", icon: <Users className="w-5 h-5" />, color: "#EC4899" },
//   { title: "AI Agents", icon: <Bot className="w-5 h-5" />, color: "var(--color-success)" },
//   { title: "Algo Trading Bots", icon: <Cpu className="w-5 h-5" />, color: "#EAB308" },
//   { title: "Forex Trading Systems", icon: <DollarSign className="w-5 h-5" />, color: "#10B981" },
//   { title: "Stock Market Dashboards", icon: <BarChart3 className="w-5 h-5" />, color: "#9333EA" },
//   { title: "Blockchain Apps", icon: <Layers className="w-5 h-5" />, color: "#8B5CF6" },
//   { title: "Real Estate Websites", icon: <Building2 className="w-5 h-5" />, color: "#F97316" },
//   { title: "Educational LMS", icon: <GraduationCap className="w-5 h-5" />, color: "#3B82F6" },
//   { title: "Hospital & Clinic Systems", icon: <ClipboardList className="w-5 h-5" />, color: "#EF4444" },
//   { title: "Hotel & Booking Systems", icon: <Hotel className="w-5 h-5" />, color: "#06B6D4" },
//   { title: "News Portals", icon: <Newspaper className="w-5 h-5" />, color: "#7DD3FC" },
//   { title: "Job Portals", icon: <Briefcase className="w-5 h-5" />, color: "#FACC15" },
//   { title: "Business Dashboards", icon: <Database className="w-5 h-5" />, color: "#A3E635" },
//   { title: "Global Multi-language Websites", icon: <Globe className="w-5 h-5" />, color: "#0EA5E9" },
//   { title: "Startup Websites", icon: <Rocket className="w-5 h-5" />, color: "#E11D48" },
//   { title: "Event & Conference Sites", icon: <Presentation className="w-5 h-5" />, color: "#F43F5E" },
// ];

const services: Service[] = [
  { title: "Website Development", icon: <Code2 className="w-5 h-5" />, color: "var(--color-secondary)" },
  { title: "App Development", icon: <Smartphone className="w-5 h-5" />, color: "#A855F7" },
  { title: "UI/UX Design", icon: <PenTool className="w-5 h-5" />, color: "#F59E0B" },
  { title: "Forex Trading Systems", icon: <DollarSign className="w-5 h-5" />, color: "#10B981" },
  { title: "Graphic Design", icon: <Presentation className="w-5 h-5" />, color: "#FACC15" },
];

export default function FeaturedServices() {
  return (
    <section className="w-full py-16 bg-[var(--color-black)]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
       
         <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
        >
          Featured Services
        </motion.button>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
