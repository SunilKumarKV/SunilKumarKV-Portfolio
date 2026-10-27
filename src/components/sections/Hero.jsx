import React from 'react';
import HeroGraphic from '../ui/HeroGraphic';
import { portfolioData } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sparkles, 
  FolderGit2, 
  Briefcase, 
  Mail, 
  ArrowRight
} from 'lucide-react';

/**
 * Hero Section
 * 2-Column Desktop Layout:
 * - Left column (7 cols on lg): Sunil's profile, narrative, CTAs, and key operational metrics
 * - Right column (5 cols on lg): Seamless, floating full-stack SVG network animation (HeroGraphic)
 */
export default function Hero() {
  const { profile } = portfolioData;
  const { theme } = useTheme();

  return (
    <section 
      id="hero" 
      className="scroll-mt-28 pt-4 sm:pt-8 pb-12 relative z-10"
      aria-label="Introduction & Architecture Overview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Sunil's Narrative & Content (7 columns on desktop) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Availability & Role Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono bg-white/[0.05] border border-white/10 text-slate-200 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span className="tracking-wide">{profile.availability}</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Engineering Precision with{' '}
              <span className={`text-transparent bg-clip-text ${
                theme === 'cyberpunk'
                  ? 'bg-gradient-to-r from-[#FF2A6D] via-[#05D9E8] to-[#9B5DE5]'
                  : theme === 'pure-black'
                  ? 'bg-gradient-to-r from-white via-slate-200 to-sky-400'
                  : theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600'
                  : 'bg-gradient-to-r from-electric-blue via-indigo-400 to-emerald'
              }`}>
                Glass & Motion
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-medium text-electric-blue font-mono">
              {profile.name} <span className="text-slate-400 font-normal">|</span> {profile.title}
            </p>
          </div>

          {/* Bio Narrative */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            {profile.bio}
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a 
              href="#work"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-electric-blue hover:bg-blue-500 shadow-[0_0_24px_rgba(59,130,246,0.5)] hover:shadow-[0_0_32px_rgba(59,130,246,0.7)] transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a 
              href="#experience"
              className="px-5 py-3 rounded-xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-emerald" />
              <span>Enterprise Milestones</span>
            </a>

            <a 
              href="#contact"
              className="px-5 py-3 rounded-xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-electric-blue" />
              <span>Initiate Contact</span>
            </a>
          </div>

          {/* Operational Metrics Bento Strip */}
          <div className="pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {profile.metrics.map((metric) => (
                <div 
                  key={metric.label}
                  className="p-3.5 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md hover:border-white/20 transition-colors"
                >
                  <div className={`text-xl sm:text-2xl font-extrabold font-mono text-transparent bg-clip-text ${
                    theme === 'cyberpunk'
                      ? 'bg-gradient-to-r from-[#FF2A6D] to-[#05D9E8]'
                      : theme === 'pure-black'
                      ? 'bg-gradient-to-r from-white to-sky-400'
                      : theme === 'light'
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600'
                      : 'bg-gradient-to-r from-electric-blue to-emerald'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-white mt-1 leading-snug">
                    {metric.label}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5 leading-tight">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Floating Borderless Full-Stack Graphic Canvas (5 columns on desktop) */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <HeroGraphic />
        </div>

      </div>
    </section>
  );
}
