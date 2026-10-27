import React from 'react';

/**
 * SectionDivider Component
 * Elegant Apple-grade subtle gradient line divider between major sections.
 * Maintains rhythm and visual hierarchy with soft end-fades.
 */
export default function SectionDivider({ className = '' }) {
  return (
    <div className={`relative w-full py-8 sm:py-12 flex items-center justify-center ${className}`} aria-hidden="true">
      {/* Outer Glow Line */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Center Specular Highlight Beam */}
      <div className="relative w-1/3 h-px bg-gradient-to-r from-transparent via-electric-blue/40 to-transparent" />
      
      {/* Center Accent Pip */}
      <div className="absolute w-1.5 h-1.5 rounded-full bg-electric-blue/60 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
    </div>
  );
}
