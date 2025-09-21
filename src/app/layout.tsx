import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "BlackOS — AI-driven software & design",
  description: "BlackOS builds enterprise AI solutions and modern UX. Design-led engineering, secure systems, and fast delivery.",
  openGraph: {
    title: "BlackOS — AI-driven software & design",
    description: "BlackOS builds enterprise AI solutions and modern UX.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  ${geistMono.variable} antialiased`}
      >
        <Navbar />
            {children}
            <Footer />
      </body>
    </html>
  );
}
