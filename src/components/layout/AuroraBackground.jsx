import React from 'react';

/**
 * AuroraBackground Component
 * Fixed, non-intrusive background component positioned at z-0.
 * Renders slow-drifting, heavily blurred color orbs:
 * - Electric Blue (#3B82F6)
 * - Indigo (#6366F1)
 * - Emerald (#10B981)
 * Behind a subtle architectural dot/grid matrix with a vignette mask fading into the slate-950 canvas.
 */
export default function AuroraBackground({ children }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-slate-950">
      {/* Aurora Layer: Heavily Blurred Slow-Drifting Color Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Electric Blue Orb (#3B82F6) */}
        <div 
          className="absolute -top-[10%] left-[10%] w-[520px] h-[520px] rounded-full bg-[#3B82F6]/25 blur-[130px] mix-blend-screen animate-aurora-1" 
          aria-hidden="true"
        />

        {/* Indigo Orb (#6366F1) */}
        <div 
          className="absolute top-[28%] -right-[6%] w-[580px] h-[580px] rounded-full bg-[#6366F1]/20 blur-[140px] mix-blend-screen animate-aurora-2" 
          aria-hidden="true"
        />

        {/* Emerald Orb (#10B981) */}
        <div 
          className="absolute -bottom-[10%] left-[25%] w-[500px] h-[500px] rounded-full bg-[#10B981]/20 blur-[130px] mix-blend-screen animate-aurora-3" 
          aria-hidden="true"
        />

        {/* Ambient Deep Radial Core (#3B82F6 & #6366F1) */}
        <div 
          className="absolute top-[50%] left-[5%] w-[420px] h-[420px] rounded-full bg-[#3B82F6]/15 blur-[120px] mix-blend-screen animate-aurora-2" 
          aria-hidden="true"
        />
      </div>

      {/* Subtle Architectural Dot/Grid Matrix */}
      <div 
        className="absolute inset-0 architectural-grid opacity-70 pointer-events-none" 
        aria-hidden="true"
      />

      {/* Vignette Mask Fading into the Slate-950 Canvas (#0B0F19) */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(11, 15, 25, 0.5) 60%, #0B0F19 95%)'
        }}
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
