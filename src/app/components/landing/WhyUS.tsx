"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules"; // 👈 Autoplay module import
import { motion } from "framer-motion";
import { Lightbulb, Smartphone, Handshake, ArrowDownNarrowWide } from "lucide-react";
import { JSX } from "react";
import Button from "../Reuse/button";

type Benefit = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: <Lightbulb className="w-7 h-7 md:w-8 md:h-8 text-[var(--color-white)]" />,
    title: "Creative Innovation",
    description:
      "We transform bold ideas into practical solutions that stand out in competitive markets and drive measurable growth.",
  },
  {
    icon: <Smartphone className="w-7 h-7 md:w-8 md:h-8 text-[var(--color-white)]" />,
    title: "Seamless Digital Experience",
    description:
      "From mobile to desktop, our solutions deliver a consistent, intuitive, and engaging user journey across every platform.",
  },
  {
    icon: <Handshake className="w-7 h-7 md:w-8 md:h-8 text-[var(--color-white)]" />,
    title: "Trusted Partnerships",
    description:
      "We don’t just complete projects — we build lasting partnerships by offering continuous support and shared success.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 md:w-8 md:h-8 text-[var(--color-white)]" />,
    title: "Cutting-Edge Strategies",
    description:
      "We combine market research, design thinking, and modern technologies to craft strategies that keep you ahead of the curve.",
  },
  {
    icon: <Smartphone className="w-7 h-7 md:w-8 md:h-8 text-[var(--color-white)]" />,
    title: "Scalable Solutions",
    description:
      "Our solutions are built with flexibility, ensuring they can easily grow and adapt as your business expands.",
  },
];


export default function WhyUs() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--color-black)] text-center relative overflow-hidden" id="why-us">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-4"
      >
            <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
                >
                  Why Choose Us
                </motion.button>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-6 leading-snug">
          Empowering Businesses <br className="hidden sm:block" /> With Expertise & Innovation
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          Partner with us to unlock growth, deliver seamless experiences, and build long-term success for your business.
        </p>
      </motion.div>

      {/* Swiper Cards */}
      <div className="mt-12 sm:mt-16 max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]} // 👈 autoplay module activate
          loop={true} // 👈 infinite loop enable
          autoplay={{
            delay: 3000, // 👈 3 seconds
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#1a1a1a] to-[#111] p-6 sm:p-8 rounded-2xl shadow-xl text-left 
                           hover:md:-translate-y-2 hover:md:shadow-[0_0_25px_var(--color-primary)] 
                           transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl 
                                bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-highlight)] 
                                mb-6 shadow-md">
                  {benefit.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>

            </SwiperSlide>
          ))}
          <Button className="mx-auto mt-4">See Pricing</Button>
          

        </Swiper>
      </div>
    </section>
  );
}
