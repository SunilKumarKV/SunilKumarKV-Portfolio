import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * CertCard Component
 * Sub-card for verified engineering bootcamps
 */
export default function CertCard({ cert }) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-[var(--border-glass)] hover:border-emerald/30 transition-all space-y-3 group/cert">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-[var(--text-primary)] group-hover/cert:text-emerald transition-colors">
            {cert.title}
          </h4>
          <span className="text-xs font-mono text-[var(--text-secondary)] mt-0.5 block">
            Issued by <strong className="text-[var(--text-primary)]">{cert.issuer}</strong>
          </span>
        </div>
        <span className="glass-pill px-2.5 py-0.5 text-[10px] font-mono text-emerald border-emerald/30 flex items-center gap-1 flex-shrink-0">
          <CheckCircle2 className="w-3 h-3 text-emerald" />
          Verified
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-[var(--border-glass)] text-[var(--text-secondary)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
