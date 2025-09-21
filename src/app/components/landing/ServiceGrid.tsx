"use client";

import { motion } from "framer-motion";
import { JSX } from "react";
import { FaRobot, FaCode, FaMobileAlt, FaPaintBrush, FaChartLine, FaGlobe, FaCloud, FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import Button from "../Reuse/button";
import { useRouter } from "next/navigation";

type Service = {
  title: string;
  icon: JSX.Element;
};

const services: Service[] = [
  { title: "AI Agent Development", icon: <FaRobot className="text-[var(--color-primary)]" /> },
  { title: "Website Development", icon: <FaGlobe className="text-[var(--color-primary)]" /> },
  { title: "App Development", icon: <FaMobileAlt className="text-[var(--color-primary)]" /> },
  { title: "Graphic Design", icon: <FaPaintBrush className="text-[var(--color-primary)]" /> },
  { title: "Algo Trading Systems", icon: <FaExchangeAlt className="text-[var(--color-primary)]" /> },
  { title: "Financial Platforms", icon: <FaChartLine className="text-[var(--color-primary)]" /> },
  { title: "E Commerce Websites", icon: <FaShoppingCart className="text-[var(--color-primary)]" /> },
  { title: "Portfolio Websites", icon: <FaCode className="text-[var(--color-primary)]" /> },
];

export default function ServicesGrid() {
    const router = useRouter();
  return (
    <section className="bg-[var(--color-black)] text-[var(--color-white)] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-[#111] px-6 py-4 rounded-2xl shadow-md hover:shadow-[0_0_15px_var(--color-primary)] transition-all duration-300 cursor-pointer"
            >
              <span className="text-xl">{service.icon}</span>
              <h3 className="text-base md:text-lg font-medium">{service.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <Button className="mx-auto" onClick={() => router.push("/services")}>View all services →</Button>
        </div>
      </div>
    </section>
  );
}
