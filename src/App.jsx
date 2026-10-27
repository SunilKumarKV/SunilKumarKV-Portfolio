import React from 'react';
import AuroraBackground from './components/layout/AuroraBackground';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import ProjectsGrid from './components/sections/ProjectsGrid';
import AnimatedSkills from './components/sections/AnimatedSkills';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import SectionDivider from './components/ui/SectionDivider';

export default function App() {
  return (
    <div className="min-h-screen relative selection:bg-electric-blue/30 selection:text-white transition-colors duration-300">
      {/* Visual Atmosphere: Fixed AuroraBackground with Drifting Orbs and Architectural Dot Grid */}
      <AuroraBackground />

      {/* Sticky Glass Navbar (iOS-grade frosted glass, 24px blur, 1px bottom border) */}
      <Navbar />

      {/* Main Content Container (z-10 relative) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 relative z-10">
        
        {/* 2-Column Hero Section */}
        <Hero />

        <SectionDivider />

        {/* 1. Projects Section (Asymmetric Bento Grid with GitHub Sync) */}
        <ProjectsGrid />

        <SectionDivider />

        {/* 2. Animated Skills Section (Dual Marquee Tickers & Category Bento Matrix) */}
        <AnimatedSkills />

        <SectionDivider />

        {/* 3. Professional Experience Section (Dual-Audience Timeline) */}
        <ExperienceSection />

        <SectionDivider />

        {/* 4. Education & Certifications Section (Dedicated Section) */}
        <EducationSection />

        <SectionDivider />

        {/* 5. Contact Section & Interactive n8n Webhook Dispatch */}
        <ContactSection />

      </main>
    </div>
  );
}
