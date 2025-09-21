"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import Button from "../Reuse/button";
import { ArrowDownNarrowWide } from "lucide-react";

export default function OurMission() {
  return (
    <section className="relative bg-[var(--color-black)] text-center overflow-hidden py-10" id="mission">
      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
            <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
                >
                  Our Mission
                </motion.button>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-6xl font-bolder leading-snug mt-6 px-4 "
      >
        We Create <span className="text-[var(--color-primary)]">Impactful</span>{" "}
        Digital <br className="hidden sm:block" />
        <span className="text-[var(--color-primary)]">Experiences</span> That
        Inspire Growth
      </motion.h1>

      {/* Sub Text */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4"
      >
        First impressions matter. That’s why we focus on building digital
        products that engage, convert, and leave a lasting mark in every
        industry.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-8"
      >
         <Button className="mx-auto"> Book a Call ↗</Button>
      </motion.div>

      {/* Background Carousel */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <div className="w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)]" />
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-500" />
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-cyan-400" />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* Down Arrow Motion */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut",
            }}
            className="flex justify-center mt-6"
          >
            <ArrowDownNarrowWide className="w-7 h-7 text-[var(--color-primary)]" />
          </motion.div>
    </section>
  );
}
