import HeroSection from "./components/landing/HeroSection";

export default function Home() {

   const metadata = {
  title: "BlackOS — AI-driven software & design",
  description: "BlackOS builds enterprise AI solutions and modern UX. Design-led engineering, secure systems, and fast delivery.",
  openGraph: {
    title: "BlackOS — AI-driven software & design",
    description: "BlackOS builds enterprise AI solutions and modern UX.",
  }
};
  return (
    <>
      <HeroSection />
    </>
  );
}
