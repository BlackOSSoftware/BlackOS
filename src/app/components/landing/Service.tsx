"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
};

const services: ServiceCardProps[] = [
  {
    title: "Strategy & Planning",
    description:
      "We design roadmaps for businesses to align their goals with actionable strategies, ensuring long-term growth.",
    image: "/service/1.png",
  },
  {
    title: "Tailored Development",
    description:
      "Our team builds custom solutions with modern tech stacks, perfectly suited to your unique business needs.",
    image: "/service/2.png",
  },
  {
    title: "AI-Driven Automation",
    description:
      "We integrate AI workflows to reduce repetitive tasks and boost operational efficiency seamlessly.",
    image: "/service/3.png",
  },
];

export default function Services() {
  return (
    <section className="bg-[var(--color-black)] text-[var(--color-white)] py-20 px-4">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
          >
            Our Services
          </motion.button>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Empowering Innovation Through Expertise
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            From concept to execution, we craft solutions that transform challenges
            into opportunities.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#111] rounded-2xl shadow-lg p-6 h-full flex flex-col transition-all duration-300 hover:shadow-[0_0_20px_var(--color-primary)]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-xl mb-4 w-full h-40 object-cover"
                />
                <h3 className="text-lg md:text-xl font-semibold text-[var(--color-primary)] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {service.description}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
