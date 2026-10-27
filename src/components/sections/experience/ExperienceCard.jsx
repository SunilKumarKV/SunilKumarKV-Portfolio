import React from 'react';
import { 
  Building2, 
  Calendar, 
  Award, 
  TrendingDown, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  Code2 
} from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

export default function ExperienceCard({ job }) {
  return (
    <div className="relative group">
      {/* Timeline Glowing Node */}
      <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-slate-950 border-2 border-electric-blue flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.6)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping" />
      </div>

      <GlassCard className="p-6 sm:p-8 space-y-6">
        {/* Header: Company, Role, Period & Location */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-glass)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-electric-blue" />
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-mono">
                {job.company}
              </h3>
            </div>
            <p className="text-base font-semibold text-emerald font-mono">
              {job.role}
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-electric-blue" />
              {job.period}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)]">
              {job.duration} • {job.location}
            </span>
          </div>
        </div>

        {/* Context Summary */}
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {job.summary}
        </p>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          <div className="p-4 rounded-2xl ios-glass border border-[var(--border-glass)] space-y-1.5 group/stat hover:border-emerald/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-secondary)]">Audit Discrepancy</span>
              <TrendingDown className="w-4 h-4 text-emerald" />
            </div>
            <div className="text-2xl font-black text-emerald font-mono">-15%</div>
            <p className="text-xs text-[var(--text-secondary)] leading-snug">
              Inventory Discrepancies achieved via proactive auditing & tracking.
            </p>
          </div>

          <div className="p-4 rounded-2xl ios-glass border border-[var(--border-glass)] space-y-1.5 group/stat hover:border-electric-blue/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-secondary)]">Stock Clearance</span>
              <TrendingUp className="w-4 h-4 text-electric-blue" />
            </div>
            <div className="text-2xl font-black text-electric-blue font-mono">+10–12%</div>
            <p className="text-xs text-[var(--text-secondary)] leading-snug">
              Aged-SKU Clearance driven by custom reporting automation.
            </p>
          </div>

          <div className="p-4 rounded-2xl ios-glass border border-[var(--border-glass)] space-y-1.5 group/stat hover:border-indigo-400/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-secondary)]">Financial Streams</span>
              <CreditCard className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-indigo-400 font-mono">Multi-Channel</div>
            <p className="text-xs text-[var(--text-secondary)] leading-snug">
              POS / UPI / NEFT daily commercial reconciliation & audit balancing.
            </p>
          </div>
        </div>

        {/* Core Responsibilities Bullet Points */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-electric-blue" /> Core Operational Responsibilities
          </h4>
          <div className="space-y-2.5">
            {job.responsibilities?.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-3.5 rounded-xl ios-glass border border-[var(--border-glass)] hover:border-white/20 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-electric-blue flex-shrink-0 mt-2" />
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Honors Row */}
        <div className="pt-2 border-t border-[var(--border-glass)] space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" /> Operational Awards & Honors
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.08)]">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs flex-shrink-0">
                2x
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span>Support Star of the Month — 2x</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] font-mono">
                  Recognized for operational excellence & defect reduction
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.08)]">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs flex-shrink-0">
                2x
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span>Best Support Person — 2x</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] font-mono">
                  Awarded for cross-functional audit coordination & data integrity
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Software Engineering Translation Callout Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-electric-blue/10 via-indigo-500/10 to-emerald/10 border border-electric-blue/30 backdrop-blur-md space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-electric-blue uppercase tracking-wide">
            <Code2 className="w-4 h-4" />
            <span>Bridge to Software Engineering</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
            Demonstrates a proven track record of handling high-stakes business data, building tools that eliminate operational drag, and maintaining production-grade reliability.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
