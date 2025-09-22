"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";
import Button from "../Reuse/button"; // ✅ adjust path if needed

// ✅ Pricing Card Props
type PricingCardProps = {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
};

// ✅ Static Website Plans
const staticPlans: PricingCardProps[] = [
  {
    title: "Basic Static",
    price: "₹10,000 – ₹12,000 (one-time)",
    features: [
      "Up to 5 pages",
      "Responsive Design",
      "Basic SEO",
      "Contact Form (non-functional)",
      "1 Revision Round",
    ],
  },
  {
    title: "Standard Static",
    price: "₹15,000 – ₹18,000 (one-time)",
    features: [
      "Up to 8 pages",
      "Mobile Optimized",
      "Functional Contact Form (Email)",
      "Basic SEO + Analytics",
      "Image Gallery",
      "2 Revision Rounds",
    ],
    popular: true,
  },
  {
    title: "Premium Static",
    price: "₹20,000 – ₹25,000 (one-time)",
    features: [
      "12+ pages",
      "Custom Animations",
      "Contact Form + Google Map",
      "Advanced SEO Optimization",
      "Image + Video Embeds",
      "Social Media Integration",
      "3 Revision Rounds",
    ],
  },
];

// ✅ Dynamic Website Plans
const dynamicPlans: PricingCardProps[] = [
  {
    title: "Basic Dynamic",
    price: "₹25,000 – ₹30,000 (one-time)",
    features: [
      "Up to 6 dynamic pages",
      "Admin Panel (Basic CRUD)",
      "Database Integration (MongoDB / MySQL)",
      "Authentication (Login/Signup)",
      "1 Month Free Maintenance",
    ],
  },
  {
    title: "Standard Dynamic",
    price: "₹35,000 – ₹45,000 (one-time)",
    features: [
      "10–15 dynamic pages",
      "Advanced Admin Dashboard",
      "Role-based User Access",
      "Payment Gateway Integration",
      "SEO + Analytics Setup",
      "2 Months Free Maintenance",
    ],
    popular: true,
  },
  {
    title: "Premium Dynamic",
    price: "₹50,000 – ₹70,000 (one-time)",
    features: [
      "Unlimited Dynamic Pages",
      "Custom Features & API Integrations",
      "E-Commerce Ready",
      "AI Chatbot / Automation (Optional)",
      "Advanced Security Setup",
      "6 Months Free Maintenance",
    ],
  },
];

// ✅ Function to open WhatsApp with plan details
const getWhatsappLink = (planTitle: string) => {
  const phone = "917869600155"; // ✅ country code +91
  const message = `Hello, I’m interested in the "${planTitle}" website pricing. I found this on your website.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

export default function PricingPlans() {
  return (
    <section className="py-20 px-6 bg-black text-white relative overflow-hidden">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12 mt-4">
        <motion.h2
          className="text-4xl font-bold text-[var(--color-primary)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transparent Pricing Plans
        </motion.h2>
        <p className="text-gray-400 mt-4">
          Choose the perfect plan for your business needs. All plans include{" "}
          <span className="text-[var(--color-highlight)] font-medium">
            free consultation
          </span>{" "}
          and 30-day support.
        </p>
      </div>

      {/* ✅ Static Website Plans */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold text-[var(--color-primary)]">
          Static Website Plans
        </h3>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Ideal for businesses needing an online presence without backend
          functionality. Perfect for portfolios, small businesses, and
          informational sites.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {staticPlans.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`relative rounded-2xl p-6 border border-white/5 bg-[#0f0f10]
              hover:bg-gradient-to-br hover:from-[var(--color-primary)]/10 hover:to-[var(--color-highlight)]/10
              hover:border-[var(--color-primary)]/50 transition-all duration-500 flex flex-col
              ${plan.popular ? "border-[var(--color-primary)]" : ""}`}
          >
            {plan.popular && (
              <span className="absolute top-4 right-4 bg-[var(--color-primary)] text-black font-bold text-xs px-3 py-1 rounded-full">
                POPULAR
              </span>
            )}

            <h4 className="text-xl font-semibold text-[var(--color-primary)]">
              {plan.title}
            </h4>
            <p className="text-2xl font-bold mt-4">{plan.price}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                className="mx-auto"
                onClick={() => getWhatsappLink(plan.title)}
              >
                Get Started →
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✅ Dynamic Website Plans */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold text-[var(--color-primary)]">
          Dynamic Website Plans
        </h3>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Designed for businesses requiring advanced features, admin dashboards,
          and real-time data updates. Perfect for startups, SaaS, and
          e-commerce.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {dynamicPlans.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`relative rounded-2xl p-6 border border-white/5 bg-[#0f0f10]
              hover:bg-gradient-to-br hover:from-[var(--color-primary)]/10 hover:to-[var(--color-highlight)]/10
              hover:border-[var(--color-primary)]/50 transition-all duration-500 flex flex-col
              ${plan.popular ? "border-[var(--color-primary)]" : ""}`}
          >
            {plan.popular && (
              <span className="absolute top-4 right-4 bg-[var(--color-primary)] text-black font-bold text-xs px-3 py-1 rounded-full">
                POPULAR
              </span>
            )}

            <h4 className="text-xl font-semibold text-[var(--color-primary)]">
              {plan.title}
            </h4>
            <p className="text-2xl font-bold mt-4">{plan.price}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                className="mx-auto"
                onClick={() => getWhatsappLink(plan.title)}
              >
                Get Started →
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
