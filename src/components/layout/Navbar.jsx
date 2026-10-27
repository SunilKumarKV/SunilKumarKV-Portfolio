import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Menu, X } from 'lucide-react';
import FontSwitcher from '../ui/FontSwitcher';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import MobileDrawer from './navbar/MobileDrawer';

/**
 * Navbar Component
 * iOS-grade frosted glass header with specular border and saturation vibrancy.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section scroll spy
      const sections = ['work', 'projects', 'services', 'skills', 'experience', 'education', 'contact'];
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ios-glass border-b border-[var(--border-glass)] ${
        isScrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Branding */}
        <a 
          href="#hero" 
          onClick={(e) => handleSmoothScroll(e, '#hero')}
          className="group flex items-center space-x-3 focus:outline-none cursor-pointer py-2"
          aria-label="SunilCraft Portfolio Home"
        >
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

          <div className="relative h-8 overflow-hidden flex items-center select-none min-w-[130px]">
            <div className="flex items-center text-xl transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
              <span className="font-extrabold text-[var(--text-primary)] tracking-tight">Sunil</span>
              <span className="font-mono text-electric-blue font-semibold tracking-normal ml-0.5">craft</span>
            </div>

            <div className="absolute inset-0 flex items-center text-xl transition-all duration-300 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-extrabold text-[var(--text-primary)] tracking-tight whitespace-nowrap">
                Sunil Kumar <span className="font-mono text-electric-blue font-semibold">K V</span>
              </span>
            </div>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 px-3 py-1.5 rounded-full ios-glass-card shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1) || (link.href === '#work' && activeSection === 'projects');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-[var(--text-primary)] bg-white/10 shadow-sm' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.05]'
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

        {/* Right Side: Theme Switcher, Font Switcher, Resume & Hire Me */}
        <div className="hidden sm:flex items-center space-x-2.5">
          <ThemeSwitcher />
          <FontSwitcher />

          <a
            href="/resume.pdf"
            download="Sunil_Kumar_KV_Resume.pdf"
            className="group relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[var(--text-primary)] ios-glass hover:bg-white/10 border border-[var(--border-glass)] shadow-sm transition-all duration-200 active:scale-95"
            aria-label="Download Resume"
          >
            <Download className="w-3.5 h-3.5 text-slate-300 group-hover:text-electric-blue group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-electric-blue hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:shadow-[0_0_28px_rgba(59,130,246,0.7)] transition-all duration-200 active:scale-95 overflow-hidden"
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-[var(--border-glass)] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <MobileDrawer 
          navLinks={navLinks} 
          activeSection={activeSection} 
          onNavigate={handleSmoothScroll} 
        />
      )}
    </header>
  );
}
