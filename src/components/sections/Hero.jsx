import React from 'react';
import HeroGraphic from '../ui/HeroGraphic';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sparkles, 
  FolderGit2, 
  Mail, 
  ArrowRight 
} from 'lucide-react';

/**
 * Hero Section
 * 2-Column Desktop Layout (7 cols text / 5 cols full-stack graphic):
 * Features project-first narrative, live proof badges, and seamless theme adaptation.
 */
export default function Hero() {
  const { theme } = useTheme();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = 
      document.getElementById(targetId) || 
      (targetId === 'projects' ? document.getElementById('work') : null);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${targetId}`;
    }
  };

  return (
    <section 
      id="hero" 
      className="scroll-mt-28 pt-4 sm:pt-8 pb-8 relative z-10"
      aria-label="Introduction & Architecture Overview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Sunil's Narrative & Project-First Content (7 columns on desktop) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Status Badge with Pulsing Emerald Dot */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span className="tracking-wide">
              Available for Full-Stack Roles & Select Product Contracts
            </span>
          </div>

          {/* Headline: Full-Stack Developer | React Specialist with Gradient Accent */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Full-Stack Developer{' '}
              <span className="text-[var(--text-secondary)] font-light">|</span>{' '}
              <span className="text-[var(--text-primary)]">React Specialist</span>
              <span className={`block mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text ${
                theme === 'cyberpunk'
                  ? 'bg-gradient-to-r from-[#FF2A6D] via-[#05D9E8] to-[#9B5DE5]'
                  : theme === 'pure-black'
                  ? 'bg-gradient-to-r from-white via-slate-200 to-sky-400'
                  : theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600'
                  : 'bg-gradient-to-r from-electric-blue via-indigo-400 to-emerald'
              }`}>
                Building Real Products. Solving Real Problems.
              </span>
            </h1>
          </div>

          {/* Sub-headline / Bio Narrative */}
          <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-2xl">
            I'm Sunil Kumar K V, an MCA student and engineer focused on building production-ready web applications, SaaS tools, and responsive interfaces. With 3+ years of enterprise operations experience at Reliance Retail, I bring business reliability and data precision to scalable software.
          </p>

          {/* Quick Proof Badges (Inline Monospace Pills) */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:border-electric-blue/40 transition-colors shadow-sm">
              <span>⚡</span>
              <span className="font-semibold text-[var(--text-primary)]">4+ Live Products</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:border-emerald/40 transition-colors shadow-sm">
              <span>🏢</span>
              <span className="font-semibold text-[var(--text-primary)]">3+ Years Enterprise Ops</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:border-indigo-400/40 transition-colors shadow-sm">
              <span>🎓</span>
              <span className="font-semibold text-[var(--text-primary)]">MCA (Bangalore University)</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a 
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, 'projects')}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-electric-blue hover:bg-blue-500 shadow-[0_0_24px_rgba(59,130,246,0.5)] hover:shadow-[0_0_32px_rgba(59,130,246,0.7)] transition-all duration-200 active:scale-95 flex items-center gap-2 group"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Featured Projects</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a 
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="px-5 py-3 rounded-xl text-sm font-medium text-[var(--text-primary)] ios-glass hover:bg-white/10 border border-[var(--border-glass)] hover:border-white/30 backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2"
              title="Let's Connect (sunilkumarkv9535@gmail.com)"
            >
              <Mail className="w-4 h-4 text-electric-blue" />
              <span>Let's Connect</span>
            </a>
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
