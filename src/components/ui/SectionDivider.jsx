import React from 'react';

/**
 * SectionDivider Component
 * Standard Apple-grade horizontal divider between major sections.
 * Clean, subtle, and adapts across Light, Dark, Pure Black, and Cyberpunk.
 */
export default function SectionDivider({ className = '' }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} aria-hidden="true">
      <div className="h-px w-full bg-slate-200/70 dark:bg-slate-800/70 transition-colors duration-300" />
    </div>
  );
}
