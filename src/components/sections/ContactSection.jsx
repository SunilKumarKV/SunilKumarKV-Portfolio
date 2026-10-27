import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase, Rocket, Sparkles } from 'lucide-react';
import ContactForm from './contact/ContactForm';
import Footer from '../layout/Footer';
import GlassCard from '../ui/GlassCard';

export default function ContactSection() {
  const { profile } = portfolioData;
  const [intent, setIntent] = useState('hiring'); // 'hiring' | 'freelance'

  // Listen for programmatic intent switching (e.g. from ServicesSection)
  useEffect(() => {
    const handleIntentChange = (e) => {
      if (e.detail && (e.detail === 'hiring' || e.detail === 'freelance')) {
        setIntent(e.detail);
      }
    };
    window.addEventListener('set-contact-intent', handleIntentChange);
    return () => window.removeEventListener('set-contact-intent', handleIntentChange);
  }, []);

  return (
    <div id="contact" className="scroll-mt-28 space-y-16">
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span>Interactive Transmission Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Initiate Contact
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Open for high-impact full-stack roles, systems architecture, and selective contracts.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <GlassCard className="p-6 sm:p-8 space-y-6">
            {/* Dual-Intent Toggle */}
            <div className="flex p-1.5 rounded-2xl bg-slate-950/70 border border-[var(--border-glass)] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setIntent('hiring')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  intent === 'hiring'
                    ? 'bg-electric-blue text-white shadow-specular-blue'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Hiring for a Role</span>
              </button>

              <button
                type="button"
                onClick={() => setIntent('freelance')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  intent === 'freelance'
                    ? 'bg-emerald text-white shadow-specular-emerald'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Rocket className="w-4 h-4" />
                <span>Freelance Project</span>
              </button>
            </div>

            {/* Modular Form */}
            <ContactForm intent={intent} />
          </GlassCard>
        </div>
      </section>

      {/* Production Footer */}
      <Footer />
    </div>
  );
}
