import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * AuroraBackground Component
 * Fixed background component positioned at z-0.
 * Dynamic color orbs that adjust smoothly based on the active theme:
 * - Pure Black: True pitch-black (#000000) canvas with subtle monochrome silver/white glowing stardust
 * - Light: Crisp Sapphire, Soft Teal, and Sky Blue on #F8FAFC
 * - Cyberpunk: Neon Pink (#FF2A6D), Neon Cyan (#05D9E8), Neon Purple (#9B5DE5) on #05050A
 * - Deep Dark: Electric Blue (#3B82F6), Indigo (#6366F1), Emerald (#10B981) on #0B0F19
 */
export default function AuroraBackground({ children }) {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      {/* Aurora Layer: Heavily Blurred Slow-Drifting Color Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {theme === 'pure-black' ? (
          <>
            {/* Pure Black Mode: Minimalist Monochrome Stardust / Silver Halos */}
            <div 
              className="absolute -top-[10%] left-[15%] w-[480px] h-[480px] rounded-full bg-white/[0.04] blur-[150px] mix-blend-screen animate-aurora-1" 
              aria-hidden="true"
            />
            <div 
              className="absolute top-[30%] -right-[5%] w-[520px] h-[520px] rounded-full bg-slate-400/[0.03] blur-[160px] mix-blend-screen animate-aurora-2" 
              aria-hidden="true"
            />
            <div 
              className="absolute -bottom-[10%] left-[25%] w-[450px] h-[450px] rounded-full bg-cyan-400/[0.03] blur-[140px] mix-blend-screen animate-aurora-3" 
              aria-hidden="true"
            />
          </>
        ) : theme === 'cyberpunk' ? (
          <>
            {/* Cyberpunk Neon Pink Orb */}
            <div 
              className="absolute -top-[10%] left-[10%] w-[540px] h-[540px] rounded-full bg-[#FF2A6D]/20 blur-[140px] mix-blend-screen animate-aurora-1" 
              aria-hidden="true"
            />
            {/* Cyberpunk Neon Cyan Orb */}
            <div 
              className="absolute top-[28%] -right-[6%] w-[580px] h-[580px] rounded-full bg-[#05D9E8]/20 blur-[150px] mix-blend-screen animate-aurora-2" 
              aria-hidden="true"
            />
            {/* Cyberpunk Neon Purple Orb */}
            <div 
              className="absolute -bottom-[10%] left-[25%] w-[500px] h-[500px] rounded-full bg-[#9B5DE5]/20 blur-[130px] mix-blend-screen animate-aurora-3" 
              aria-hidden="true"
            />
          </>
        ) : theme === 'light' ? (
          <>
            {/* Light Theme Sapphire Orb */}
            <div 
              className="absolute -top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#3B82F6]/10 blur-[120px] mix-blend-multiply animate-aurora-1" 
              aria-hidden="true"
            />
            {/* Light Theme Sky Orb */}
            <div 
              className="absolute top-[25%] -right-[5%] w-[550px] h-[550px] rounded-full bg-[#06B6D4]/10 blur-[130px] mix-blend-multiply animate-aurora-2" 
              aria-hidden="true"
            />
            {/* Light Theme Emerald Orb */}
            <div 
              className="absolute -bottom-[10%] left-[25%] w-[480px] h-[480px] rounded-full bg-[#10B981]/10 blur-[120px] mix-blend-multiply animate-aurora-3" 
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            {/* Deep Dark Theme Electric Blue Orb (#3B82F6) */}
            <div 
              className="absolute -top-[10%] left-[10%] w-[520px] h-[520px] rounded-full bg-[#3B82F6]/22 blur-[130px] mix-blend-screen animate-aurora-1" 
              aria-hidden="true"
            />
            {/* Deep Dark Theme Indigo Orb (#6366F1) */}
            <div 
              className="absolute top-[28%] -right-[6%] w-[580px] h-[580px] rounded-full bg-[#6366F1]/18 blur-[140px] mix-blend-screen animate-aurora-2" 
              aria-hidden="true"
            />
            {/* Deep Dark Theme Emerald Orb (#10B981) */}
            <div 
              className="absolute -bottom-[10%] left-[25%] w-[500px] h-[500px] rounded-full bg-[#10B981]/18 blur-[130px] mix-blend-screen animate-aurora-3" 
              aria-hidden="true"
            />
          </>
        )}
      </div>

      {/* Subtle Architectural Dot/Grid Matrix */}
      <div 
        className="absolute inset-0 architectural-grid opacity-60 pointer-events-none" 
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
