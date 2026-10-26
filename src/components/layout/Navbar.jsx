import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight,
  FileText
} from 'lucide-react';

/**
 * Navbar Component
 * Tier 1 frosted glass header with backdrop-blur-md, bg-slate-900/80, and 1px bottom border slate-800.
 * Features:
 * - SunilCraft branding with pulsing emerald availability dot (#10B981)
 * - Interactive hover state crossfading/revealing "Sunil Kumar K V"
 * - Smooth anchor navigation links (Work, Skills, Experience, Education, Contact)
 * - High-contrast "Resume" download button (/resume.pdf) & primary "Hire Me" button
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section scroll spy
      const sections = ['work', 'projects', 'skills', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section === 'projects' ? 'work' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    // Support both #work and #projects targets
    const element = document.getElementById(targetId) || (targetId === 'work' ? document.getElementById('projects') : null);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 ${
        isScrolled ? 'shadow-lg shadow-black/30' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Branding: "SunilCraft" with Hover State revealing "Sunil Kumar K V" */}
        <a 
          href="#hero" 
          onClick={(e) => handleSmoothScroll(e, '#hero')}
          className="group flex items-center space-x-3 focus:outline-none cursor-pointer py-2"
          aria-label="SunilCraft Portfolio Home"
        >
          {/* Pulsing Emerald Availability Dot (#10B981) */}
          <div className="relative flex items-center justify-center w-3 h-3 flex-shrink-0" title="Available for hire">
            <span 
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: '#10B981' }}
            />
            <span 
              className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-[0_0_10px_rgba(16,185,129,0.85)]"
              style={{ backgroundColor: '#10B981' }}
            />
          </div>

          {/* Logo with Smooth Crossfade/Reveal on Hover */}
          <div className="relative h-8 overflow-hidden flex items-center select-none min-w-[130px]">
            {/* Default State: "SunilCraft" */}
            <div className="flex items-center text-xl transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
              <span className="font-extrabold text-white tracking-tight">Sunil</span>
              <span className="font-mono text-electric-blue font-semibold tracking-normal ml-0.5">craft</span>
            </div>

            {/* Hover State: "Sunil Kumar K V" */}
            <div className="absolute inset-0 flex items-center text-xl transition-all duration-300 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-extrabold text-white tracking-tight whitespace-nowrap">
                Sunil Kumar <span className="font-mono text-electric-blue font-semibold">K V</span>
              </span>
            </div>
          </div>
        </a>

        {/* Center: Smooth Anchor Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1) || (link.href === '#work' && activeSection === 'projects');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-white bg-white/10 shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-electric-blue" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Side: High-Contrast "Resume" Download & "Hire Me" Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* High-Contrast "Resume" Download Button */}
          <a
            href="/resume.pdf"
            download="Sunil_Kumar_KV_Resume.pdf"
            className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-100 bg-white/5 hover:bg-white/10 border border-slate-700 hover:border-slate-500 shadow-sm transition-all duration-200 active:scale-95"
            aria-label="Download Resume"
          >
            <Download className="w-4 h-4 text-slate-300 group-hover:text-electric-blue group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span>Resume</span>
          </a>

          {/* Primary "Hire Me" Action Button */}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-electric-blue hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:shadow-[0_0_28px_rgba(59,130,246,0.7)] transition-all duration-200 active:scale-95 overflow-hidden"
          >
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Matching Frosted Glass Tier 1) */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1) || (link.href === '#work' && activeSection === 'projects');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-electric-blue/15 text-electric-blue border border-electric-blue/30' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <a
              href="/resume.pdf"
              download="Sunil_Kumar_KV_Resume.pdf"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-white bg-white/5 border border-slate-700 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 text-electric-blue" />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-electric-blue shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
