import AboutSection from "./components/landing/About";
import HeroSection from "./components/landing/HeroSection";
import FeaturedServices from "./components/landing/FeaturedServices";
import WhyUs from "./components/landing/WhyUS";
import OurMission from "./components/landing/OurMission";
import RecentWorks from "./components/landing/RecentWorks";
import Stats from "./components/landing/Stats";
import Services from "./components/landing/Service";
import ServicesGrid from "./components/landing/ServiceGrid";
import PricingPage from "./components/landing/Pricing";
import Testimonials from "./components/landing/Testimonials";
import FAQSection from "./components/landing/FAQSection";
import ContactSection from "./components/landing/GetInTouch";

export default function Home() {

 
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedServices />
      <WhyUs />
      <OurMission />
      <RecentWorks />
      <Stats />
      <Services />
      <ServicesGrid />
      <PricingPage />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  );
}
