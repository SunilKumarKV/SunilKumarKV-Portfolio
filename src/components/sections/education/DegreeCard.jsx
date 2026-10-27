import React from 'react';
import { Calendar } from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

/**
 * DegreeCard Component
 * Apple/iOS-grade frosted card for formal academic degrees
 */
export default function DegreeCard({ edu }) {
  const isPursuing = edu.status.toLowerCase().includes('pursuing');

  return (
    <GlassCard className="p-7 flex flex-col justify-between space-y-6 group">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-mono px-3 py-1 rounded-full border flex items-center gap-1.5 ${
            isPursuing 
              ? 'text-emerald bg-emerald/10 border-emerald/30 shadow-sm' 
              : 'text-slate-300 bg-white/5 border-white/10'
          }`}>
            {isPursuing && <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />}
            {edu.status}
          </span>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>{edu.period}</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-electric-blue transition-colors">
            {edu.degree}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[var(--text-secondary)] mt-1">
            <span className="text-electric-blue font-semibold">{edu.institution}</span>
            <span>•</span>
            <span className="text-slate-400">{edu.campus}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1">
          {edu.description}
        </p>
      </div>

      {/* Core Focus Areas */}
      <div className="pt-4 border-t border-[var(--border-glass)] space-y-2">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
          Core Curricular Competencies
        </span>
        <div className="flex flex-wrap gap-1.5">
          {edu.focusAreas.map((area) => (
            <span
              key={area}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-[var(--border-glass)] text-[var(--text-secondary)] group-hover:border-indigo-500/30 transition-colors"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
