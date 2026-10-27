import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  ArrowUpRight,
  Clock,
  Sparkles
} from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

export default function ContactDirectChannels() {
  const [copied, setCopied] = useState(false);

  const email = 'sunilkumarkv9535@gmail.com';
  const phone = '+91 8550032158';
  const location = 'Bengaluru, KA, India';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <GlassCard className="p-6 sm:p-8 space-y-6 relative overflow-hidden">
      {/* Header & Live Status Pill */}
      <div className="space-y-3 pb-5 border-b border-[var(--border-glass)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span>🟢 Typical response time: &lt; 24 hours</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            Direct Channels
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Prefer direct outreach? Reach out anytime via email, phone, or professional networks.
          </p>
        </div>
      </div>

      {/* Direct Contact Items */}
      <div className="space-y-4">
        {/* Email with 1-click Copy */}
        <div className="p-3.5 rounded-2xl ios-glass border border-[var(--border-glass)] hover:border-electric-blue/40 transition-all space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-electric-blue" />
              Direct Email
            </span>
            {copied && (
              <span className="text-[11px] text-emerald font-mono flex items-center gap-1 animate-in fade-in">
                <Check className="w-3 h-3" /> Copied!
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <a
              href={`mailto:${email}`}
              className="text-sm font-semibold text-[var(--text-primary)] hover:text-electric-blue transition-colors truncate"
              title="Send an email"
            >
              {email}
            </a>

            <button
              onClick={handleCopyEmail}
              className="p-1.5 rounded-lg ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 active:scale-95 transition-all flex-shrink-0"
              title="Copy email to clipboard"
              aria-label="Copy email"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className="p-3.5 rounded-2xl ios-glass border border-[var(--border-glass)] hover:border-emerald/40 transition-all space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
            <Phone className="w-3.5 h-3.5 text-emerald" />
            <span>Phone / Mobile</span>
          </div>
          <a
            href="tel:+918550032158"
            className="text-sm font-semibold text-[var(--text-primary)] hover:text-emerald transition-colors block"
          >
            {phone}
          </a>
        </div>

        {/* Location */}
        <div className="p-3.5 rounded-2xl ios-glass border border-[var(--border-glass)] space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>Base Location</span>
          </div>
          <div className="text-sm font-semibold text-[var(--text-primary)]">
            {location}
          </div>
        </div>
      </div>

      {/* Social Network Pills */}
      <div className="pt-2 border-t border-[var(--border-glass)] space-y-2.5">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
          Professional Profiles
        </span>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://github.com/SunilKumarKV"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl ios-glass border border-[var(--border-glass)] hover:border-white/30 text-xs font-medium text-[var(--text-primary)] hover:bg-white/5 active:scale-95 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-electric-blue" />
              <span>GitHub</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://www.linkedin.com/in/sunilkumarkv44"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl ios-glass border border-[var(--border-glass)] hover:border-electric-blue/40 text-xs font-medium text-[var(--text-primary)] hover:bg-white/5 active:scale-95 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
}
