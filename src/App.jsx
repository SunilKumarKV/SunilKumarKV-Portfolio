import React from 'react';
import AuroraBackground from './components/layout/AuroraBackground';
import Navbar from './components/layout/Navbar';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import ProjectsGrid from './components/sections/ProjectsGrid';
import AnimatedSkills from './components/sections/AnimatedSkills';
import ContactSection from './components/sections/ContactSection';
import { portfolioData } from './data/portfolioData';
import { 
  Sparkles, 
  Terminal, 
  FolderGit2, 
  Briefcase, 
  Mail,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const { profile } = portfolioData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative selection:bg-electric-blue/30 selection:text-white">
      {/* Visual Atmosphere: Fixed AuroraBackground with Drifting Orbs and Architectural Dot Grid */}
      <AuroraBackground />

      {/* Sticky Glass Navbar (Tier 1 frosted glass, 24px blur, 1px bottom border) */}
      <Navbar />

      {/* Main Content Container (z-10 relative) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-28 relative z-10">
        
        {/* Hero Section */}
        <section id="hero" className="scroll-mt-28 text-center space-y-8 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald animate-ping" />
            <Terminal className="w-3.5 h-3.5 text-electric-blue" />
            <span>Full-Stack Development & Systems Automation</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Engineering Precision with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-indigo-400 to-emerald">
                Glass & Motion
              </span>
            </h1>

            <p className="text-base sm:text-xl font-medium text-electric-blue font-mono">
              {profile.title}
            </p>

            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a 
              href="#work"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-electric-blue hover:bg-blue-500 shadow-[0_0_24px_rgba(59,130,246,0.45)] hover:shadow-[0_0_32px_rgba(59,130,246,0.65)] transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Projects</span>
            </a>
            <a 
              href="#experience"
              className="px-6 py-3 rounded-xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-emerald" />
              <span>Enterprise Milestones</span>
            </a>
            <a 
              href="#contact"
              className="px-6 py-3 rounded-xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-electric-blue" />
              <span>Initiate Contact</span>
            </a>
          </div>

          {/* Key Metrics Bento Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-4xl mx-auto">
            {profile.metrics.map((metric) => (
              <div 
                key={metric.label}
                className="glass-card p-4 rounded-2xl specular-border text-center space-y-1 bg-slate-900/60"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-emerald font-mono">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-white">{metric.label}</div>
                <div className="text-[11px] font-mono text-slate-400">{metric.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 1. Projects Section (Asymmetric Bento Grid with GitHub Sync) */}
        <ProjectsGrid />

        {/* 2. Animated Skills Section (Dual Marquee Tickers & Category Bento Matrix) */}
        <AnimatedSkills />

        {/* 3. Professional Experience Section (Dual-Audience Timeline) */}
        <ExperienceSection />

        {/* 4. Education & Certifications Section (Dedicated Section) */}
        <EducationSection />

        {/* 5. Contact & Footer Section (Dual-Intent n8n Webhook Pipeline & Footer) */}
        <ContactSection />

      </main>
    </div>
  );
}
