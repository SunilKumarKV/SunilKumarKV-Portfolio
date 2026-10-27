import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { GraduationCap, BadgeCheck } from 'lucide-react';
import DegreeCard from './education/DegreeCard';
import CertCard from './education/CertCard';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';

/**
 * EducationSection Component
 * Constrained container (max-w-5xl mx-auto) with balanced 2-column split.
 * Left: MCA @ Bangalore University; Right: BCA @ Bangalore North University.
 */
export default function EducationSection() {
  const { education, certifications } = portfolioData;

  const activeStudentBadge = (
    <span className="glass-pill px-3.5 py-1.5 text-xs font-mono text-emerald border-emerald/30 inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-emerald animate-pulse flex-shrink-0" />
      <span>Active MCA Student</span>
    </span>
  );

  return (
    <section 
      id="education" 
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-20 relative z-10 space-y-10"
    >
      {/* Standard Section Heading */}
      <SectionHeading
        eyebrow="Academic Pedigree & Continuing Education"
        eyebrowIcon={GraduationCap}
        title="Education & Certifications"
        subtitle="Formal computer science foundations in software architecture and algorithms, paired with hands-on full-stack development bootcamps."
        action={activeStudentBadge}
      />

      {/* Balanced 2-Column Degree Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {education.map((edu) => (
          <div key={edu.id} className="min-w-0 w-full flex">
            <DegreeCard edu={edu} />
          </div>
        ))}
      </div>

      {/* Verified Engineering Bootcamps Container */}
      <GlassCard className="p-7 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald/15 border border-emerald/30 flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-emerald" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Verified Engineering Bootcamps
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Targeted full-stack web and language deep dives
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[var(--text-secondary)] hidden sm:inline-block">
            Udemy Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="min-w-0 w-full flex">
              <CertCard cert={cert} />
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
