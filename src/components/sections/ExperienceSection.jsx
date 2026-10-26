import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  Award, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  FileSpreadsheet, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

/**
 * ExperienceSection Component
 * Dual-audience timeline highlighting Sunil's role as SAP MM & Commercial Associate
 * at Reliance Retail Ltd. (Sep 2022 - Nov 2025), with inventory reduction metrics,
 * SKU replenishment automation, and highlighted 2x Support Star & 2x Best Support Person awards.
 */
export default function ExperienceSection() {
  const { professionalExperience } = portfolioData;
  const [lens, setLens] = useState('all'); // 'all' | 'systems' | 'operations'

  return (
    <section id="experience" className="scroll-mt-28 space-y-10 relative z-10">
      
      {/* Section Header */}
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

        {/* Dual-Audience Lens Filter */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setLens('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              lens === 'all' 
                ? 'bg-electric-blue text-white shadow-specular-blue' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Perspectives
          </button>
          <button
            onClick={() => setLens('systems')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              lens === 'systems' 
                ? 'bg-electric-blue text-white shadow-specular-blue' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Systems & Logic
          </button>
          <button
            onClick={() => setLens('operations')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              lens === 'operations' 
                ? 'bg-electric-blue text-white shadow-specular-blue' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Commercial Ops
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12 ml-2 sm:ml-4">
        
        {professionalExperience.map((job) => (
          <div key={job.id} className="relative group">
            
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-slate-950 border-2 border-electric-blue flex items-center justify-center shadow-specular-blue">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping" />
            </div>

            {/* Main Experience Glass Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl specular-border space-y-6 bg-slate-900/70 backdrop-blur-md">
              
              {/* Card Header & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Building2 className="w-5 h-5 text-electric-blue" />
                    <h3 className="text-2xl font-bold text-white tracking-tight">{job.company}</h3>
                    <span className="glass-pill px-2.5 py-0.5 text-xs font-mono text-emerald border-emerald/30">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-base font-mono text-electric-blue font-semibold">
                    {job.role}
                  </p>

                  <span className="text-xs font-mono text-slate-400 block">
                    {job.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 w-fit">
                  <Calendar className="w-4 h-4 text-electric-blue" />
                  <span>{job.period}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald font-semibold">{job.duration}</span>
                </div>
              </div>

              {/* Role Summary */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {job.summary}
              </p>

              {/* Dual-Audience Impact / Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Metric 1: Inventory Discrepancy Reduction */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  lens === 'operations' || lens === 'all'
                    ? 'bg-white/[0.03] border-emerald/30 shadow-specular-emerald/10'
                    : 'opacity-40 bg-white/[0.01] border-white/5'
                }`}>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-mono text-emerald flex items-center gap-1.5 font-bold">
                      <TrendingDown className="w-4 h-4" />
                      -15% Discrepancy Reduction
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Inventory Integrity</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Reduced recurring inventory discrepancy by 15% across physical-to-SAP reconciliations, daily cycle counts, and systemic process audits.
                  </p>
                </div>

                {/* Metric 2: SKU Replenishment Automation */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  lens === 'systems' || lens === 'all'
                    ? 'bg-white/[0.03] border-electric-blue/30 shadow-specular-blue/10'
                    : 'opacity-40 bg-white/[0.01] border-white/5'
                }`}>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-mono text-electric-blue flex items-center gap-1.5 font-bold">
                      <TrendingUp className="w-4 h-4" />
                      +10-12% SKU Clearance
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Replenishment Logic</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Engineered automated SKU replenishment triggers that accelerated non-moving stock clearance by 10-12% and prevented stockouts in high-velocity categories.
                  </p>
                </div>

                {/* Metric 3: Financial & Material Reconciliation */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  lens === 'operations' || lens === 'all'
                    ? 'bg-white/[0.03] border-indigo-400/30'
                    : 'opacity-40 bg-white/[0.01] border-white/5'
                }`}>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-mono text-indigo-300 flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      100% Audit Compliance
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Financial Accuracy</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Conducted monthly and quarterly financial and material balance reconciliations for multi-crore store operations with zero statutory deviations.
                  </p>
                </div>

                {/* Metric 4: Procurement & Logistics Workflows */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  lens === 'systems' || lens === 'all'
                    ? 'bg-white/[0.03] border-cyan-400/30'
                    : 'opacity-40 bg-white/[0.01] border-white/5'
                }`}>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 font-bold">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      SAP MM Logistics
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Pipeline Execution</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Managed PO generation, goods receipt notes (GRN), invoice verification, and vendor dispute resolution with cross-functional commercial teams.
                  </p>
                </div>

              </div>

              {/* Highlighted Awards & Recognition Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-electric-blue/10 to-emerald/10 border border-amber-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Award className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">Enterprise Excellence Awards</h4>
                      <p className="text-xs text-slate-300">Awarded 4x for operational excellence and cross-functional leadership</p>
                    </div>
                  </div>

                  {/* Highlighted Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="glass-pill px-3 py-1.5 text-xs font-mono text-amber-300 border-amber-400/40 bg-amber-500/15 font-bold flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Support Star of the Month (2x)
                    </span>
                    <span className="glass-pill px-3 py-1.5 text-xs font-mono text-emerald border-emerald-400/40 bg-emerald-500/15 font-bold flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
                      Best Support Person (2x)
                    </span>
                  </div>
                </div>
              </div>

              {/* Technology & Tool Stack Pills */}
              <div className="pt-2 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-slate-400 mr-2">Enterprise Stack:</span>
                {job.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:border-electric-blue/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
}
