"use client";

import { useEffect } from "react";
import { restoreScrollPosition } from "@/lib/navigation-scroll";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import AboutSection from "@/components/home/AboutSection";
import BoardSection from "@/components/home/BoardSection";
import ProgramSection from "@/components/home/ProgramSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TeachersSection from "@/components/home/TeachersSection";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";

import ExtraSection from "@/components/home/ExtraSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CalendarSection from "@/components/home/CalendarSection";
import ContactSection from "@/components/home/ContactSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  // Restore scroll position on page load (for back navigation)
  useEffect(() => {
    restoreScrollPosition();
  }, []);

  return (
    <>
      <main>
        <HeroSection />

        <ScrollAnimation delay={0.2} direction="up">
          <StatsSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <AboutSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <BoardSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <TeachersSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <ProgramSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <FeaturesSection />
        </ScrollAnimation>



        <ScrollAnimation delay={0.1}>
          <FacilitiesSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <ActivitiesSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <ExtraSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <TestimonialsSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <FaqSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <CalendarSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <ContactSection />
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <CtaSection />
        </ScrollAnimation>
      </main>
    </>
  );
}
