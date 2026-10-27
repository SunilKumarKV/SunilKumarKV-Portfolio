import React, { useState, useEffect } from 'react';
import { Briefcase, Rocket, Sparkles } from 'lucide-react';
import ContactForm from './contact/ContactForm';
import ContactDirectChannels from './contact/ContactDirectChannels';
import GlassCard from '../ui/GlassCard';

/**
 * ContactSection Component
 * Dual-intent contact form wired to n8n webhook with 2-column layout & direct channels.
 */
export default function ContactSection() {
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
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span>Direct Transmission Hub</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Let's Build Something Meaningful.
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Whether you're hiring a full-stack developer, looking for a freelance partner, or exploring a product idea, let's connect.
          </p>
        </div>

        {/* Responsive 2-Column Layout (7 cols Form / 5 cols Direct Channels) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form with Dual-Intent Segmented Toggle (7 columns on desktop) */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 sm:p-8 space-y-6">
              {/* Segmented Dual-Intent Toggle */}
              <div className="flex p-1.5 rounded-2xl bg-slate-950/70 border border-[var(--border-glass)] backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setIntent('hiring')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    intent === 'hiring'
                      ? 'bg-electric-blue text-white shadow-specular-blue'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  aria-pressed={intent === 'hiring'}
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
                  aria-pressed={intent === 'freelance'}
                >
                  <Rocket className="w-4 h-4" />
                  <span>Freelance Project</span>
                </button>
              </div>

              {/* Form Fields & n8n Transmission */}
              <ContactForm 
                intent={intent} 
                onIntentChange={setIntent} 
              />
            </GlassCard>
          </div>

          {/* Right Column: Direct Channels Glass Card (5 columns on desktop) */}
          <div className="lg:col-span-5">
            <ContactDirectChannels />
          </div>

        </div>
      </section>
    </div>
  );
}
