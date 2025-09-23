"use client";

import Button from "@/app/components/Reuse/button";
import { Bell, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header className="w-full bg-[var(--color-black)] flex items-center justify-end px-6 py-3 shadow-md">
      <div className="flex items-center gap-4 text-[var(--color-white)]">
        <button className="hover:text-[var(--color-highlight)] transition">
          <Bell size={20} />
        </button>
        <button className="hover:text-[var(--color-highlight)] transition">
          <Settings size={20} />
        </button>
        {/* <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded flex items-center gap-2 transition"
        >
          <LogOut size={16} /> Logout
        </button> */}
        <Button onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </Button>
      </div>
    </header>
  );
}
