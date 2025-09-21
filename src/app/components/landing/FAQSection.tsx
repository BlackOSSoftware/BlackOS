"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQ = {
    question: string;
    answer: string;
};

const faqs: FAQ[] = [
    {
        question: "What Makes BlackOS Software Solution Different?",
        answer:
            "BlackOS combines cutting-edge software engineering with creative design and AI-powered development expertise. We focus on real-world implementation, delivering solutions that are scalable, high-performance, and tailored to businesses that demand excellence.",
    },
    {
        question: "How Does BlackOS Ensure High-Performance Websites?",
        answer:
            "We use modern frameworks like Next.js, React, and TypeScript with CI/CD pipelines and clean documented source code. Every project is optimized for speed, security, and scalability.",
    },
    {
        question: "Does BlackOS Offer Customized Business Solutions?",
        answer:
            "Yes. Every business is unique, and our team delivers fully customized solutions — from websites and dashboards to mobile apps and API integrations — aligned with your growth strategy.",
    },
    {
        question: "Can BlackOS Handle End-to-End Deployment?",
        answer:
            "Absolutely. We provide complete deployment setup with CI/CD, version control, and cloud infrastructure integration, ensuring smooth delivery from prototype to production.",
    },
    {
        question: "Can I Work With BlackOS As a Partner or Client?",
        answer:
            "Yes, BlackOS partners with businesses, startups, and individuals. Whether you need full-stack development, technical consultation, or a long-term tech partner — we’ve got you covered.",
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-20 px-6 bg-dotted">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
                    >
                        Need to Know
                    </motion.button>
                    <h2 className="text-3xl md:text-5xl font-extrabold">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-[#0f0f10] border border-gray-800 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setActiveIndex(activeIndex === idx ? null : idx)
                                }
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="font-semibold">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 transition-transform ${activeIndex === idx
                                            ? "rotate-180 text-[var(--color-primary)]"
                                            : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-5 text-gray-300 text-sm leading-relaxed"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
