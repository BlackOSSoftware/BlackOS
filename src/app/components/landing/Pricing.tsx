"use client";

import { motion } from "framer-motion";
import Button from "../Reuse/button";
import { useRouter } from "next/navigation";

const pricingPlans = [
  {
    title: "Starter Plan",
    price: "₹15,000 – ₹20,000",
    desc: "Perfect for small portfolios or simple websites. Includes full website with source code.",
    features: [
      "Up to 3 Pages",
      "Responsive Layout",
      "Basic SEO Setup",
      "1 Revision",
      "Full Source Code Included",
    ],
    link: "https://wa.me/917869600155?text=Hello%2C%20I%20am%20interested%20in%20the%20*Starter%20Plan*%20(₹15,000%20–%2020,000).%20This%20enquiry%20is%20from%20your%20website.",
  },
  {
    title: "Business Plan",
    price: "₹22,000 – ₹35,000",
    desc: "Best for startups and small businesses. Complete source code with advanced functionality.",
    features: [
      "Up to 7 Pages",
      "Mobile Optimized",
      "Contact Form + Analytics",
      "Image Gallery",
      "2 Revisions",
      "Full Source Code Included",
    ],
    popular: true,
    link: "https://wa.me/917869600155?text=Hello%2C%20I%20am%20interested%20in%20the%20*Business%20Plan*%20(₹22,000%20–%2035,000).%20This%20enquiry%20is%20from%20your%20website.",
  },
  {
    title: "Premium Plan",
    price: "₹35,000 – On Demand",
    desc: "Advanced solutions for professional websites. Delivered with full source code and custom features.",
    features: [
      "Unlimited Pages",
      "Custom Animations",
      "Advanced SEO",
      "Image + Video Embeds",
      "Social Media Integration",
      "3 Revisions",
      "Full Source Code Included",
    ],
    link: "https://wa.me/917869600155?text=Hello%2C%20I%20am%20interested%20in%20the%20*Premium%20Plan*%20(₹35,000%20–%20On%20Demand).%20This%20enquiry%20is%20from%20your%20website.",
  },
];


export default function PricingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[var(--color-black)] text-[var(--color-white)] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
        >
          Simple & Transparent Pricing
        </motion.button>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Website Development Pricing
        </motion.h2>
        <p className="text-lg text-gray-300 mb-12">
          Choose the perfect plan for your business needs. Each package includes
          the complete website along with full source code and support.
        </p>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`relative rounded-2xl shadow-lg p-8 bg-[#111] transition-all border ${
                plan.popular
                  ? "border-[var(--color-primary)]"
                  : "border-gray-700"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-3 right-3 bg-[var(--color-primary)] text-black text-xs px-3 py-1 rounded-full font-bold">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <p className="text-gray-400 mb-4">{plan.desc}</p>
              <p className="text-2xl font-extrabold mb-6">{plan.price}</p>
               <Button className="mx-auto mt-4 mb-3" onClick={() => window.open(plan.link, "_blank")}>
                Get Started →
              </Button>
              <ul className="text-left mb-6 space-y-2">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    ✅ {f}
                  </li>
                ))}
              </ul>
             
            </motion.div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} className="mt-12">
          <Button
            className="mx-auto"
            onClick={() => router.push("/pricing")}
          >
            View Complete Pricing Comparison →
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
