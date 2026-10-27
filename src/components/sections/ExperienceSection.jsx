import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase } from 'lucide-react';
import ExperienceCard from './experience/ExperienceCard';

export default function ExperienceSection() {
  const { professionalExperience } = portfolioData;
  const [lens, setLens] = useState('all'); // 'all' | 'systems' | 'operations'

  return (
    <section id="experience" className="scroll-mt-28 space-y-10 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-electric-blue/10 border border-electric-blue/20 text-electric-blue backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-electric-blue" />
            <span>Enterprise Operations & Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            3+ years of high-volume enterprise operations at Reliance Retail Ltd., applying data integrity and automated workflows to multi-crore retail logistics.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono">
          {['all', 'systems', 'operations'].map((item) => (
            <button
              key={item}
              onClick={() => setLens(item)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                lens === item ? 'bg-electric-blue text-white shadow-specular-blue' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item === 'all' ? 'All Perspectives' : item === 'systems' ? 'Systems & Logic' : 'Commercial Ops'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12 ml-2 sm:ml-4">
        {professionalExperience.map((job) => (
          <ExperienceCard key={job.id} job={job} lens={lens} />
        ))}
      </div>
    </section>
  );
}
