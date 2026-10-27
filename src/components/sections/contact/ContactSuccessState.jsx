import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

/**
 * ContactSuccessState Component
 * Rendered upon successful submission to n8n webhook
 */
export default function ContactSuccessState({ name, onReset }) {
  return (
    <div className="py-10 px-4 text-center space-y-4 animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-full bg-emerald/10 border border-emerald/30 text-emerald mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">
          Transmission Confirmed
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          Thank you, <span className="font-semibold text-[var(--text-primary)]">{name}</span>. Your message has been routed to Sunil's n8n pipeline. Expect a response within 24 hours.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium text-[var(--text-primary)] ios-glass hover:bg-white/10 border border-[var(--border-glass)] transition-all active:scale-95 shadow-sm"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Send Another Message</span>
      </button>
    </div>
  );
}
