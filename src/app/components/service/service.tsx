"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../Reuse/button";

type Service = {
  id: string;
  title: string;
  bullets: string[];
  short: string;
};

const SERVICES: Service[] = [
  {
    id: "website",
    title: "Website Design & Development",
    short: "Beautiful, fast, SEO-friendly websites tailored to your brand.",
    bullets: [
      "Custom UI/UX design",
      "Responsive & mobile-first layouts",
      "Headless & SSR (Next.js, React) setups",
      "Performance & accessibility optimization",
      "CMS integration (WordPress, Headless CMS)",
      "Ongoing maintenance & support",
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    short: "Scalable online stores with payments, inventory & automation.",
    bullets: [
      "Shopify / WooCommerce / Custom builds",
      "Optimized product pages & checkout",
      "Multi-vendor marketplace setup",
      "Inventory & order automation",
      "Secure payment gateway integration",
      "Customer account & loyalty systems",
    ],
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    short: "On-page, technical and local SEO to boost organic visibility.",
    bullets: [
      "On-page SEO (keywords, meta, headings)",
      "Technical SEO (site speed, mobile-friendly)",
      "Local SEO (Google My Business, citations)",
      "Backlink strategy & outreach",
      "Content optimization & blogging",
      "Analytics tracking & reporting",
    ],
  },
  {
    id: "algo-trading",
    title: "Algo Trading Bot Development",
    short: "Automated trading systems built for speed, precision & strategy.",
    bullets: [
      "Custom algorithmic trading strategies",
      "Integration with brokers & exchanges (Zerodha, Binance, etc.)",
      "Backtesting & simulation environments",
      "Real-time monitoring dashboards",
      "Risk management & stop-loss features",
      "Cloud deployment for 24/7 uptime",
    ],
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    short: "User-first design systems that drive engagement & conversions.",
    bullets: [
      "Wireframing & prototyping",
      "User journey mapping",
      "High-fidelity UI design",
      "Interactive prototypes (Figma/Adobe XD)",
      "Usability testing & feedback loops",
      "Design systems & component libraries",
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    short: "Cross-platform & native apps with polished UX and performance.",
    bullets: [
      "React Native / Flutter development",
      "Native iOS & Android builds",
      "Push notifications & deep linking",
      "App store publishing & updates",
      "App performance monitoring",
      "Analytics & crash reporting",
    ],
  },
  {
    id: "ai-solutions",
    title: "AI & Automation",
    short: "Integrate AI to automate workflows, insights, and personalization.",
    bullets: [
      "Custom AI chatbots",
      "AI-powered recommendations",
      "Automation pipelines & cron jobs",
      "Data-driven decision support",
      "Document / image processing AI",
      "API integrations with AI services",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    short: "Reliable infrastructure with automated deployment & monitoring.",
    bullets: [
      "AWS / GCP / Azure setup & scaling",
      "CI/CD pipelines",
      "Docker & Kubernetes orchestration",
      "Cloud security & compliance",
      "Performance monitoring (Grafana, Prometheus)",
      "Disaster recovery & backups",
    ],
  },
];


export default function ServicesPage() {
  // Replace with your business WhatsApp number
  const WHATSAPP_NUMBER = "917869600155"; 

  const getWhatsappLink = (service: string) => {
    const message = `Hello, I am interested in the "${service}" service. (Message from Services Page on your website)`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section id="services" className="bg-dotted py-20">
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <div className="text-center mb-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
          >
            Our Services
          </motion.button>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-tight"
          >
            High-impact digital services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-gray-400 max-w-2xl mx-auto"
          >
            Unlock your business potential with websites, e-commerce, apps,
            AI-powered automation and SEO strategies built for growth.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                translateY: -10,
              }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 border border-white/5 bg-[#0f0f10] 
             hover:bg-gradient-to-br hover:from-[var(--color-primary)]/10 hover:to-[var(--color-highlight)]/10
             hover:border-[var(--color-primary)]/50 
             transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-highlight)] flex items-center justify-center text-black mb-4 shadow-md">
                <span className="font-bold text-lg">
                  {service.title
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.short}</p>

              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                {service.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[var(--color-primary)]/80 inline-block flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* WhatsApp Button */}
              <Button
                className="mx-auto "
                onClick={() => getWhatsappLink(service.title)}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
