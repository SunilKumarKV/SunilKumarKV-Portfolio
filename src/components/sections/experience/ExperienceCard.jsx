import React from 'react';
import { 
  Building2, 
  Calendar, 
  Award, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

export default function ExperienceCard({ job, lens }) {
  return (
    <div className="relative group">
      {/* Timeline Glowing Node */}
      <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-slate-950 border-2 border-electric-blue flex items-center justify-center shadow-specular-blue">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping" />
      </div>

      <GlassCard className="p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-electric-blue" />
              <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">{job.company}</h3>
            </div>
            <p className="text-base font-semibold text-emerald font-mono">{job.role}</p>
          </div>
          <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-electric-blue" />{job.period}</span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">{job.duration} • {job.location}</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{job.summary}</p>

        {/* Quantified Metrics Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Inventory Discrepancy</span>
              <TrendingDown className="w-4 h-4 text-emerald" />
            </div>
            <div className="text-2xl font-black text-emerald font-mono">-15% Reduction</div>
            <p className="text-xs text-slate-400">Achieved via physical-to-SAP reconciliations and process audits.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">SKU Clearance Velocity</span>
              <TrendingUp className="w-4 h-4 text-electric-blue" />
            </div>
            <div className="text-2xl font-black text-electric-blue font-mono">+10-12% Clearance</div>
            <p className="text-xs text-slate-400">Accelerated non-moving inventory stock turns via replenishment automation.</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-electric-blue" /> Key Enterprise Milestones
          </h4>
          <div className="space-y-2.5">
            {job.achievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <span className="font-semibold text-white">{item.title}: </span>
                  <span className="text-slate-300 leading-relaxed">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        {job.awards && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Operational Recognition (4x Total)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job.awards.map((award, i) => (
                <div key={i} className="p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">{award.count}</div>
                  <div>
                    <div className="text-xs font-bold text-white">{award.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{award.frequency}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
