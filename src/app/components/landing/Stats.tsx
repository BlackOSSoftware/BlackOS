"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Projects Completed", value: "30+" },
  { label: "Active Clients", value: "12+" },
  { label: "Average Rating", value: "4.9" },
  { label: "Team Members", value: "25+" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-[var(--color-black)] text-[var(--color-white)]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="hover:scale-110 transition-transform duration-300"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-[var(--color-white)]">
              {stat.value}
            </h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
