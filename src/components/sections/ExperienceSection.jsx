import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase } from 'lucide-react';
import ExperienceCard from './experience/ExperienceCard';
import SectionHeading from '../ui/SectionHeading';

/**
 * ExperienceSection Component
 * Constrained container (max-w-4xl mx-auto) with clean vertical timeline.
 * Highlights Sunil's 3+ years enterprise operations at Reliance Retail Ltd.
 */
export default function ExperienceSection() {
  const { professionalExperience } = portfolioData;

  const opsBadge = (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl ios-glass border border-[var(--border-glass)] text-xs font-mono text-emerald">
      <span className="w-2 h-2 rounded-full bg-emerald animate-pulse flex-shrink-0" />
      <span>3+ Years Enterprise Ops</span>
    </div>
  );

  return (
    <section 
      id="experience" 
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-20 relative z-10 space-y-10"
    >
      {/* Standard Section Heading */}
      <SectionHeading
        eyebrow="Enterprise Operations & Career Milestones"
        eyebrowIcon={Briefcase}
        title="Professional Experience"
        subtitle="3+ years of high-volume enterprise operations at Reliance Retail Ltd., applying data integrity and automated workflows to multi-crore retail logistics."
        action={opsBadge}
      />

      {/* Constrained Left-Rail Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l border-slate-200/70 dark:border-slate-800/70 space-y-12 ml-2 sm:ml-4">
        {professionalExperience.map((job) => (
          <div key={job.id} className="min-w-0 w-full">
            <ExperienceCard job={job} />
          </div>
        ))}
      </div>
    </section>
  );
}
