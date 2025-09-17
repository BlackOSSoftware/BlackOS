"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const AboutSection: React.FC = () => {
    return (
        <section
            id="about"
            className="relative max-w-7xl mx-auto bg-[var(--color-black)] text-[var(--color-white)] py-20"
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        About{" "}
                        <span className="text-[var(--color-primary)]">BlackOS</span>
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                        At BlackOS Software Solution, we empower businesses with{" "}
                        <span className="text-[var(--color-primary)] font-semibold">
                            innovative software
                        </span>{" "}
                        and{" "}
                        <span className="text-[var(--color-accent)] font-semibold">
                            digital transformation
                        </span>
                        . Our mission is to craft scalable, reliable, and future-ready
                        solutions that help you achieve sustainable growth in a
                        fast-changing world.
                    </p>
                    <button
                        className="relative px-6 py-3 rounded-xl font-semibold overflow-hidden border border-white/10 text-[var(--color-white)] transition-all duration-300 group"
                    >
                        {/* Background Layer */}
                        <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)] opacity-100 group-hover:opacity-80 transition-opacity duration-300 rounded-xl" />

                        {/* Text */}
                        <span className="relative z-10 flex items-center gap-2">
                            Learn More ↗
                        </span>
                    </button>

                </motion.div>

                {/* Right Image Slider */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full rounded-2xl overflow-hidden shadow-lg"
                >
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop
                        className="w-full h-[300px] md:h-[400px] lg:h-[450px]"
                    >
                        <SwiperSlide>
                            <Image
                                src="/about/about1.jpg"
                                alt="About BlackOS - Software Development"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="/about/about3.jpg"
                                alt="BlackOS - Digital Transformation"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="/about/about2.jpg"
                                alt="BlackOS Team Collaboration"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="/about/about4.jpg"
                                alt="BlackOS Team Collaboration"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
