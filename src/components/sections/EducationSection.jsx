import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GraduationCap, BadgeCheck } from 'lucide-react';
import DegreeCard from './education/DegreeCard';
import CertCard from './education/CertCard';
import GlassCard from '../ui/GlassCard';

/**
 * EducationSection Component
 * Dedicated section for Education & Certifications featuring:
 * - MCA at Bangalore University (Jnana Bharathi Campus, 2025-2027)
 * - BCA at Bangalore North University (2018-2022)
 * - Complete Web Development & JavaScript Bootcamps (Udemy)
 */
export default function EducationSection() {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="scroll-mt-28 space-y-10 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-glass)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Academic Pedigree & Continuing Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Education & Certifications
          </h2>

          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl leading-relaxed">
            Formal computer science foundations in software architecture and algorithms, paired with hands-on full-stack development bootcamps.
          </p>
        </div>

        <span className="glass-pill px-3 py-1.5 text-xs font-mono text-emerald border-emerald/30 hidden md:inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          Active MCA Student
        </span>
      </div>

      {/* Degree Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu) => (
          <DegreeCard key={edu.id} edu={edu} />
        ))}
      </div>

      {/* Certifications & Bootcamps Container */}
      <GlassCard className="p-7 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-glass)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald/15 border border-emerald/30 flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-emerald" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Verified Engineering Bootcamps</h3>
              <p className="text-xs text-[var(--text-secondary)]">Targeted full-stack web and language deep dives</p>
            </div>
          </div>
          <span className="text-xs font-mono text-[var(--text-secondary)] hidden sm:inline-block">
            Udemy Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
