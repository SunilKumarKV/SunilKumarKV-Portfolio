import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

/**
 * Footer Component
 * Standard Apple-grade responsive layout with direct social channels,
 * smooth anchor navigation, and back-to-top interaction.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
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
    <footer className="w-full border-t border-slate-200/70 dark:bg-slate-950/80 dark:border-slate-800/70 backdrop-blur-md transition-colors duration-300 relative z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        
        {/* Main 3-Column / Flex Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Left: Branding & Identity */}
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.85)]" />
              </span>
              <span className="font-extrabold text-xl tracking-tight text-[var(--text-primary)]">
                Sunil<span className="font-mono text-electric-blue font-semibold">Craft</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] leading-relaxed">
              Full-Stack Developer & Systems Automation Specialist.
            </p>

            <p className="text-xs text-[var(--text-secondary)] font-mono">
              © {currentYear} Sunil Kumar K V. Built for high-performance web experiences.
            </p>
          </div>

          {/* Center: Quick Anchors */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Socials, Badge & Back to Top */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-stretch md:self-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/SunilKumarKV"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 active:scale-95 transition-all shadow-sm"
                aria-label="GitHub Profile"
                title="GitHub: github.com/SunilKumarKV"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/sunilkumarkv44"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[#0A66C2] hover:bg-white/10 active:scale-95 transition-all shadow-sm"
                aria-label="LinkedIn Profile"
                title="LinkedIn: linkedin.com/in/sunilkumarkv44"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="mailto:sunilkumarkv9535@gmail.com"
                className="p-2 rounded-xl ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-electric-blue hover:bg-white/10 active:scale-95 transition-all shadow-sm"
                aria-label="Email"
                title="Email: sunilkumarkv9535@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={handleScrollToTop}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] ios-glass hover:bg-white/10 border border-[var(--border-glass)] active:scale-95 transition-all shadow-sm"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
            </button>
          </div>

        </div>

        {/* Bottom Metadata & Monospace Architecture Badge */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--text-secondary)]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] ios-glass border border-[var(--border-glass)]">
            <span>Built with React, Vite & Tailwind CSS</span>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            Engineered with iOS-Style Glassmorphism & Multi-Theme System
          </span>
        </div>

      </div>
    </footer>
  );
}
