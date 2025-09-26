"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Button from "../Reuse/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
        credentials: "include", // important for cookies
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong");
    }
  };

  return (
    <section className="mb-25 mt-30 bg-black relative px-6">
      <Swiper autoplay={{ delay: 4000 }} loop className="absolute inset-0 w-full h-full opacity-20">
        <SwiperSlide className="bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-highlight)]/20" />
        <SwiperSlide className="bg-gradient-to-br from-[var(--color-success)]/20 to-[var(--color-primary)]/20" />
        <SwiperSlide className="bg-gradient-to-br from-[var(--color-highlight)]/20 to-[var(--color-success)]/20" />
      </Swiper>

      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-white/10 bg-[#0f0f10] shadow-lg
            hover:shadow-[0_0_25px_var(--color-primary)] transition-all duration-500"
        >
          <motion.h2 className="text-3xl font-bold text-center text-[var(--color-primary)] mb-2">
            Welcome Back
          </motion.h2>
          <p className="text-gray-400 text-center mb-8">Please login to continue</p>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email / Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500
              focus:outline-none focus:border-[var(--color-primary)] transition-all duration-300"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500
                focus:outline-none focus:border-[var(--color-primary)] transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[var(--color-primary)]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

          <div className="mt-6">
            <Button onClick={handleLogin} className="w-full flex items-center justify-center gap-2">
              <LogIn size={18} /> Login
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
