import React from 'react';
import { Download, Sparkles, ChevronRight } from 'lucide-react';
import FontSwitcher from '../../ui/FontSwitcher';
import ThemeSwitcher from '../../ui/ThemeSwitcher';

/**
 * MobileDrawer Component
 * Frosted iOS-style glass drawer for mobile navigation
 */
export default function MobileDrawer({
  navLinks,
  activeSection,
  onNavigate,
}) {
  return (
    <div 
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="lg:hidden px-4 pt-3 pb-6 ios-glass bg-slate-900/95 border-b border-[var(--border-glass)] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <nav className="flex flex-col space-y-1">
        {navLinks.map((link) => {
          const isActive = 
            activeSection === link.href.substring(1) || 
            (link.href === '#work' && activeSection === 'projects');
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => onNavigate(e, link.href)}
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

      {/* Mobile Theme & Font Switchers */}
      <div className="pt-2 pb-1 border-t border-[var(--border-glass)] flex items-center justify-between gap-2">
        <ThemeSwitcher />
        <FontSwitcher />
      </div>

      <div className="pt-2 border-t border-[var(--border-glass)] flex flex-col gap-2.5">
        <a
          href="/resume.pdf"
          download="Sunil_Kumar_KV_Resume.pdf"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-white bg-white/5 border border-slate-700/60 active:scale-95 transition-all shadow-sm"
        >
          <Download className="w-4 h-4 text-electric-blue" />
          <span>Download Resume</span>
        </a>

        <a
          href="#contact"
          onClick={(e) => onNavigate(e, '#contact')}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-electric-blue shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Hire Me</span>
        </a>
      </div>
    </div>
  );
}
