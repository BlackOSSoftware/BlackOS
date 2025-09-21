"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../Reuse/button";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

type Testimonial = {
  company: string;
  quote: string;
  author: string;
  role?: string;
  rating?: number; // 1-5
  stats?: { label: string; value: string }[];
};

const testimonials: Testimonial[] = [
  {
    company: "FinBridge",
    quote:
      "BlackOS crafted an enterprise-grade dashboard that helped us scale user analytics. Fast delivery, strong communication, and clean code — delivered full repo on handover.",
    author: "Nikhil Sharma",
    role: "Head of Product",
    rating: 5,
    stats: [
      { label: "engagement uplift", value: "38%" },
      { label: "support SLA improvement", value: "2x" },
    ],
  },
  {
    company: "LogiShip",
    quote:
      "We needed a high-performance web interface connected to our logistics API. BlackOS delivered a beautiful UI, documented source, and automated deployments.",
    author: "Aditi Rao",
    role: "CTO",
    rating: 5,
  },
  {
    company: "CryptoAxis",
    quote:
      "From prototyping to production, the BlackOS team guided our roadmap and shipped reliable features on time. The delivered source code was modular and easy to extend.",
    author: "Rohan Verma",
    role: "Founder",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-dotted">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
            <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
        >
          What Our Users Say
        </motion.button>
         
          <motion.h2
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold"
          >
            Trusted By Businesses Like Yours
          </motion.h2>
        </div>

        {/* Founder Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <img
                src="/Testimonial/1.png"
                alt="Thumbs up 3d with stars"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Right: Founder Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0f0f10] rounded-2xl p-8 shadow-lg border border-gray-800 w-full"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center font-bold text-black">
                B
              </div>
              <div>
                <div className="text-sm text-[var(--color-highlight)] font-semibold mb-2">
                  Ocvision
                </div>
                <h3 className="text-xl font-bold mb-2">
                  `&quot;BlackOS delivered a high-performance website that matched our
                  brand and technical needs.`&quot;
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Their attention to detail and commitment to deadlines was
                  exceptional. They supplied fully documented source code, CI
                  setup, and deployment instructions — one of the smoothest
                  development experiences we`&quote;ve had.
                </p>
                <div className="mt-4 text-sm text-gray-400">
                  <div className="font-semibold">Jay More</div>
                  <div>Founder & CEO</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-6 items-center">
              <div className="text-2xl font-extrabold text-[var(--color-primary)]">
                41%
              </div>
              <div className="text-sm text-gray-400">
                boost in product engagement
              </div>

              <div className="h-0 w-px bg-gray-700 mx-4 hidden md:block" />

              <div className="text-2xl font-extrabold text-[var(--color-primary)]">
                2X
              </div>
              <div className="text-sm text-gray-400">
                faster customer resolutions
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Swiper */}
        <div className="mt-8 w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-[#0f0f10] rounded-xl p-5 border border-gray-800 shadow-sm h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">{t.company}</div>
                      <div className="text-sm text-gray-400">
                        {t.author} {t.role && `• ${t.role}`}
                      </div>
                    </div>
                    <div className="text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < (t.rating ?? 0)
                              ? "opacity-100"
                              : "opacity-30"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4">&quot;{t.quote}&quot;</p>

                  {t.stats && (
                    <div className="flex gap-4 mt-auto">
                      {t.stats.map((s, i) => (
                        <div key={i} className="text-xs text-gray-400">
                          <div className="text-[var(--color-primary)] font-bold text-lg">
                            {s.value}
                          </div>
                          <div className="uppercase">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={() =>
              window.open(
                "https://wa.me/917869600155?text=Hello%2C%20I%20would%20like%20to%20discuss%20BlackOS%20services%20for%20my%20company%20(Referral%3A%20Website%20Testimonial%20Section)",
                "_blank"
              )
            }
          >
            Enquire Now on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
