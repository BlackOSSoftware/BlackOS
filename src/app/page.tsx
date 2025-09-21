import AboutSection from "./components/landing/About";
import HeroSection from "./components/landing/HeroSection";
import FeaturedServices from "./components/landing/FeaturedServices";
import WhyUs from "./components/landing/WhyUS";
import OurMission from "./components/landing/OurMission";

export default function Home() {

 
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedServices />
      <WhyUs />
      <OurMission />
    </>
  );
}
