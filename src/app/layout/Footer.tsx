"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import Button from "../components/Reuse/button";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-dotted relative border-t border-gray-800">
      {/* Top CTA Section */}
      <section className="py-20 px-6 text-center">
        <p className="text-gray-400 text-sm mb-2">
          Does BlackOS Software Solution Offer Customized Solutions?
        </p>
        <h3 className="text-[var(--color-primary)] text-lg font-semibold mb-4">
          BlackOS Software Solution
        </h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Let&apos;s Turn Your <br /> Dream Into Reality
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          We bring your vision to life with creativity and precision. 
          Let&apos;s make it happen together.
        </p>
        <Button className="mx-auto" onClick={() => router.push("/contact")}>Book A Call ↗</Button>
      </section>

      {/* Footer Main Section */}
      <div className="py-16 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-primary)]">
              BlackOS Software Solution
            </h2>
            <p className="text-gray-400 mt-3 text-sm">
              We build scalable software, AI-driven solutions, and creative
              digital products for businesses worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe to our newsletter for the latest updates, news, and
              insights from BlackOS.
            </p>
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg bg-[#0f0f10] border border-gray-700 text-gray-300 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[var(--color-primary)] text-black font-semibold rounded-r-lg hover:bg-[var(--color-highlight)] transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Socials & Copyright */}
        <div className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-800 pt-8">
          {/* Social Icons */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-right">
            © {new Date().getFullYear()} BlackOS Software Solution. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
