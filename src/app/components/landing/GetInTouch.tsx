"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Mail, Globe, Phone, MapPin } from "lucide-react";
import Button from "../Reuse/button";
import { useRouter } from "next/navigation";

const contacts = [
  {
    icon: <Mail className="w-6 h-6 text-white" />,
    title: "Email",
    value: "blackossoftware.contact@gmail.com",
    bg: "bg-gray-700", // white icon, dark bg
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-500" />,
    title: "Website",
    value: "BlackOSSoftware.com",
    bg: "bg-blue-100/10", // subtle blue bg
  },
  {
    icon: <Phone className="w-6 h-6 text-red-500" />,
    title: "Phone",
    value: "+91 7869600155",
    bg: "bg-red-100/10", // subtle red bg
  },
  {
    icon: <MapPin className="w-6 h-6 text-purple-500" />,
    title: "Location",
    value: "Indore, India",
    bg: "bg-purple-100/10", // purple accent
  },
];

export default function ContactSection() {
    const router = useRouter();
  return (
    <section className="py-20 px-6 bg-dotted">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Want to transform your business with AI and automation? Contact ASTEX
          today and let&apos;s build something amazing together!
        </p>

        {/* Contact Cards - Swiper on Mobile */}
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="mb-12"
        >
          {contacts.map((item, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-[#0f0f10] border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:border-[var(--color-primary)] transition-all"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.bg} mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.value}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Button */}
          <Button className="mx-auto " onClick={() => router.push('/contact')}>
            Start Your Project
          </Button>

        {/* Footer Text */}
        <p className="text-gray-400 text-sm mt-6">
          Join us in transforming ideas into impactful realities.
        </p>
      </div>
    </section>
  );
}
