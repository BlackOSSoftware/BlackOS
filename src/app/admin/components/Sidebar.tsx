"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Users, MessageSquare, Settings, Target, CalendarCheck, FileText, UserCog, Briefcase, BarChart3 } from "lucide-react";
import clsx from "clsx";

interface MenuItem {
  name: string;
  icon: ReactNode;
  link: string;
  notification?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: <Target size={20} />, link: "/admin" },

  // CRM / Leads
  { name: "Leads", icon: <Target size={20} />, link: "/admin/leads", notification: true },
  { name: "Meetings", icon: <Target size={20} />, link: "/admin/meetings" },
  { name: "Tasks", icon: <CalendarCheck size={20} />, link: "/admin/tasks" },
  { name: "Reports", icon: <FileText size={20} />, link: "/admin/reports" },

  // Team & Roles
  { name: "Employees", icon: <Users size={20} />, link: "/admin/employees" },
  { name: "Managers", icon: <UserCog size={20} />, link: "/admin/managers" },
  { name: "Boss Panel", icon: <Briefcase size={20} />, link: "/admin/boss" },

  // Productivity / Monitoring
  { name: "Workflows", icon: <Target size={20} />, link: "/admin/workflows" },
  { name: "Analytics", icon: <BarChart3 size={20} />, link: "/admin/analytics" },

  // Communication
  { name: "Messages", icon: <MessageSquare size={20} />, link: "/admin/messages" },

  // System Config
  { name: "Settings", icon: <Settings size={20} />, link: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => setIsMobileOpen(false), [pathname]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setIsMobileOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[var(--color-black)] text-white shadow-md"
        onClick={() => setIsMobileOpen((p) => !p)}
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "h-screen p-4 flex flex-col fixed md:static top-0 left-0 z-40 transition-transform duration-300 bg-[var(--color-black)] border-r border-white/10",
          {
            "w-60": isOpen,
            "w-16": !isOpen,
            "translate-x-0": isMobileOpen,
            "-translate-x-full md:translate-x-0": !isMobileOpen,
          }
        )}
      >
        {/* Logo */}
        <div className={clsx("flex items-center mb-8", { "justify-center": !isOpen })}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[var(--color-primary)] flex items-center justify-center text-black font-bold">
              B
            </div>
            {isOpen && <span className="text-[var(--color-primary)] font-bold text-xl">BlackOS</span>}
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={item.name}
                href={item.link}
                className={clsx(
                  "relative flex items-center gap-3 p-2 rounded-md transition-all duration-200 ",
                  { "justify-center": !isOpen },
                  isActive
                    ? "text-black font-semibold" // removed bg from class
                    : "text-gray-300 hover:bg-[var(--color-secondary)]/30 hover:text-[var(--color-accent)]"
                )}
                style={
                  isActive
                    ? {
                      background:
                        "radial-gradient(60% 120% at 100% 100%, rgba(255,138,0,0.95) 0%, rgba(30,30,30,0.9) 100%)",
                        color: "white",
                    }
                    : undefined
                }
              >
                {isActive && (
                  <span className="absolute left-0 h-full w-1 bg-[var(--color-primary)]" />
                )}
                <span>{item.icon}</span>
                {isOpen && <span className="flex-1">{item.name}</span>}
                {item.notification && isOpen && (
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                )}
              </Link>

            );
          })}
        </nav>
      </aside>
    </>
  );
}
