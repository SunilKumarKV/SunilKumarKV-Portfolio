import React, { useState, useEffect } from 'react';
import { Briefcase, Rocket, Sparkles } from 'lucide-react';
import ContactForm from './contact/ContactForm';
import ContactDirectChannels from './contact/ContactDirectChannels';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';

/**
 * ContactSection Component
 * Conversion Layout: 2-Column split (7 cols form / 5 cols direct channels).
 * Preserves dual-intent toggle, n8n webhook dispatch, and live copy-to-clipboard.
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
    <section 
      id="contact" 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-20 relative space-y-10"
    >
      {/* Standard Center-Aligned Heading */}
      <SectionHeading
        eyebrow="Direct Transmission Hub"
        eyebrowIcon={Sparkles}
        title="Let's Build Something Meaningful."
        subtitle="Whether you're hiring a full-stack developer, looking for a freelance partner, or exploring a product idea, let's connect."
        align="center"
      />

      {/* Responsive 2-Column Conversion Layout (7 cols Form / 5 cols Direct Channels) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column: Form with Dual-Intent Segmented Toggle (7 columns on desktop, min-w-0) */}
        <div className="lg:col-span-7 min-w-0 w-full">
          <GlassCard className="p-6 sm:p-8 space-y-6">
            {/* Segmented Dual-Intent Toggle */}
            <div 
              role="group" 
              aria-label="Inquiry type selector"
              className="flex p-1.5 rounded-2xl bg-slate-950/70 border border-[var(--border-glass)] backdrop-blur-md"
            >
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
                <Briefcase className="w-4 h-4 flex-shrink-0" />
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
                <Rocket className="w-4 h-4 flex-shrink-0" />
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

        {/* Right Column: Direct Channels Glass Card (5 columns on desktop, min-w-0) */}
        <div className="lg:col-span-5 min-w-0 w-full">
          <ContactDirectChannels />
        </div>

      </div>
    </section>
  );
}
