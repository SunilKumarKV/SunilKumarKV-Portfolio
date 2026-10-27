import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase } from 'lucide-react';
import ExperienceCard from './experience/ExperienceCard';

/**
 * ExperienceSection Component
 * Highlights Sunil's 3+ years enterprise operations background at Reliance Retail Ltd.
 */
export default function ExperienceSection() {
  const { professionalExperience } = portfolioData;

  return (
    <section id="experience" className="scroll-mt-28 space-y-10 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--border-glass)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-electric-blue/10 border border-electric-blue/20 text-electric-blue backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-electric-blue" />
            <span>Enterprise Operations & Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Professional Experience
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl leading-relaxed">
            3+ years of high-volume enterprise operations at Reliance Retail Ltd., applying data integrity and automated workflows to multi-crore retail logistics.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl ios-glass border border-[var(--border-glass)] text-xs font-mono text-emerald self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span>3+ Years Enterprise Ops</span>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l border-[var(--border-glass)] space-y-12 ml-2 sm:ml-4">
        {professionalExperience.map((job) => (
          <ExperienceCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
