import NavBar from "@/components/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      {/* Main site content */}
      <main className="flex flex-col flex-1">
        {/* Hero — full viewport */}
        <HeroSection />

        {/* Sticky nav — appears after hero on scroll */}
        <NavBar />

        {/* ── Sections ────────────────────────────────────── */}
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Site footer */}
      <SiteFooter />

    </>
  );
}
