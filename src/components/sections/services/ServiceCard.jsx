import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

export default function ServiceCard({ service, onSelectService }) {
  const handleActionClick = (e) => {
    e.preventDefault();
    if (onSelectService) {
      onSelectService(service.id);
    } else {
      window.dispatchEvent(
        new CustomEvent('set-contact-intent', { detail: 'freelance' })
      );
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <GlassCard className="p-6 sm:p-7 flex flex-col justify-between h-full min-w-0 w-full space-y-6 group hover:border-electric-blue/40 transition-all duration-300">
      <div className="space-y-4">
        {/* Service Badge & Icon */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] shadow-sm">
            <span>{service.emoji}</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {service.badge}
            </span>
          </span>

          <span 
            className="w-2.5 h-2.5 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all"
            style={{ backgroundColor: service.accentColor }}
          />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-electric-blue transition-colors">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Key Deliverables */}
        <div className="space-y-2 pt-2 border-t border-[var(--border-glass)]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Key Deliverables
          </span>
          <div className="space-y-1.5">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <CheckCircle2 
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color: service.accentColor }}
                />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Value Callout */}
        <div className="p-3.5 rounded-xl ios-glass border border-[var(--border-glass)] space-y-1 bg-white/[0.02]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)]">
            <TrendingUp className="w-3 h-3 text-emerald" />
            <span className="font-semibold text-[var(--text-primary)]">Business Value</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {service.businessValue}
          </p>
        </div>
      </div>

      {/* Interactive CTA Link */}
      <div className="pt-4 border-t border-[var(--border-glass)]">
        <a
          href="#contact"
          onClick={handleActionClick}
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-electric-blue/90 hover:bg-electric-blue shadow-[0_0_16px_rgba(59,130,246,0.35)] hover:shadow-[0_0_24px_rgba(59,130,246,0.6)] transition-all duration-200 active:scale-95 group/btn"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </GlassCard>
  );
}
