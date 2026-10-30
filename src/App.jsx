import React from 'react';
import AuroraBackground from './components/layout/AuroraBackground';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import ProjectsGrid from './components/sections/ProjectsGrid';
import ServicesSection from './components/sections/ServicesSection';
import AnimatedSkills from './components/sections/AnimatedSkills';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import SectionDivider from './components/ui/SectionDivider';

/**
 * Root Application Layout
 * Standardized Apple-grade section rhythm (py-16 sm:py-20 lg:py-24)
 * with max-w-7xl / custom container constraints and section dividers.
 */

export default function App() {
  return (
    <div className="min-h-screen relative selection:bg-electric-blue/30 selection:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Visual Atmosphere: Fixed AuroraBackground with Drifting Orbs and Architectural Dot Grid */}
      <AuroraBackground />

      {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-electric-blue focus:text-white focus:rounded-xl focus:shadow-xl focus:font-mono focus:text-xs focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white transition-all"
      >
        Skip to main content
      </a>

      {/* Sticky Glass Navbar (iOS-grade frosted glass, 24px blur, 1px bottom border) */}
      <Navbar />

      {/* Main Content Sections (z-10 relative) */}
      <main id="main-content" tabIndex={-1} className="w-full relative z-10 focus:outline-none">
        {/* 1. 12-Column Hero Section */}
        <Hero />

        <SectionDivider />

        {/* 2. Flagship-First Bento Projects Section */}
        <ProjectsGrid />

        <SectionDivider />

        {/* 3. Services & Solutions (Symmetrical 3-Card Grid) */}
        <ServicesSection />

        <SectionDivider />

        {/* 4. Animated Skills Section (Dual Marquee & Category Matrix) */}
        <AnimatedSkills />

        <SectionDivider />

        {/* 5. Professional Experience Section (Constrained Timeline max-w-4xl) */}
        <ExperienceSection />

        <SectionDivider />

        {/* 6. Education & Certifications Section (Balanced 2-Col Split max-w-5xl) */}
        <EducationSection />

        <SectionDivider />

        {/* 7. Contact Section (2-Col Conversion Layout) */}
        <ContactSection />
      </main>

      {/* Standard Full-Width Page Footer */}
      <Footer />
    </div>
  );
}
