import type { Metadata } from "next";
import "../../app/globals.css";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export const metadata: Metadata = {
  title: "BlackOS Admin Panel",
  description: "Admin dashboard layout",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <div className="flex h-screen w-screen bg-[var(--color-black)] text-[var(--color-white)]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
