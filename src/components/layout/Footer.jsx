import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

/**
 * Footer Component
 * iOS-grade frosted glass footer with 3-column layout, social channels, and back-to-top action.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = 
      document.getElementById(id) || 
      (id === 'work' ? document.getElementById('projects') : null);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[var(--border-glass)] ios-glass backdrop-blur-md pt-12 pb-14 relative z-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Responsive 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Branding & Identity (5 cols on desktop) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.85)]" />
              </span>
              <span className="font-extrabold text-xl tracking-tight text-[var(--text-primary)]">
                Sunil<span className="font-mono text-electric-blue font-semibold">Craft</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Full-Stack Developer & Systems Automation Specialist.
            </p>

            <p className="text-xs text-[var(--text-secondary)] font-mono pt-1">
              © {currentYear} Sunil Kumar K V. Built for high-performance web experiences.
            </p>
          </div>

          {/* Center Column: Quick Anchors (3 cols on desktop) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block font-semibold">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Socials, Architecture Badge & Back to Top (4 cols on desktop) */}
          <div className="md:col-span-4 space-y-4 md:text-right flex flex-col md:items-end">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block font-semibold">
              Connect & Architecture
            </span>

            {/* Direct Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/SunilKumarKV"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 active:scale-95 transition-all shadow-sm"
                aria-label="GitHub Profile"
                title="GitHub: github.com/SunilKumarKV"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/sunilkumarkv44"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[#0A66C2] hover:bg-white/10 active:scale-95 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
                title="LinkedIn: linkedin.com/in/sunilkumarkv44"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="mailto:sunilkumarkv9535@gmail.com"
                className="p-2.5 rounded-xl ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-electric-blue hover:bg-white/10 active:scale-95 transition-all shadow-sm"
                aria-label="Email"
                title="Email: sunilkumarkv9535@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Monospace Architecture Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] shadow-sm">
              <span>Built with React, Vite & Tailwind CSS</span>
            </div>

            {/* Interactive Back to Top Action */}
            <button
              onClick={handleScrollToTop}
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] ios-glass hover:bg-white/10 border border-[var(--border-glass)] active:scale-95 transition-all shadow-sm"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
