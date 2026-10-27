import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const { profile } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 pt-12 pb-16 space-y-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Author Info */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-extrabold text-lg tracking-tight text-white">
              Sunil<span className="font-mono text-electric-blue font-semibold">Craft</span>
            </span>
            <span className="glass-pill px-2.5 py-0.5 text-[10px] font-mono text-emerald border-emerald/30">
              v0.1.0 Production
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            {profile.name} • {profile.title}
          </p>
        </div>

        {/* Direct Contact Quick Links */}
        <div className="flex items-center space-x-3">
          <a
            href={`mailto:${profile.email}`}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all shadow-sm flex items-center gap-2 text-xs font-mono"
            aria-label="Direct Email"
          >
            <Mail className="w-4 h-4 text-electric-blue" />
            <span className="hidden sm:inline">{profile.email}</span>
          </a>

          {profile.phone && (
            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all shadow-sm flex items-center gap-2 text-xs font-mono"
              aria-label="Phone Number"
            >
              <Phone className="w-4 h-4 text-emerald" />
              <span className="hidden sm:inline">{profile.phone}</span>
            </a>
          )}

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all shadow-sm"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
        <p>© {currentYear} Sunil Kumar K V • SunilCraft Portfolio. All rights reserved.</p>
        <div className="flex items-center gap-3 text-[11px]">
          <span>React + Vite</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>pnpm</span>
        </div>
      </div>
    </footer>
  );
}
