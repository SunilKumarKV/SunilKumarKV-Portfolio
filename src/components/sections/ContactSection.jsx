import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase, Rocket, Sparkles, ShieldCheck } from 'lucide-react';
import ContactForm from './contact/ContactForm';
import Footer from '../layout/Footer';
import GlassCard from '../ui/GlassCard';

export default function ContactSection() {
  const { profile } = portfolioData;
  const [intent, setIntent] = useState('hiring'); // 'hiring' | 'freelance'

  return (
    <div id="contact" className="scroll-mt-28 space-y-16">
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span>Interactive Transmission Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Initiate Contact
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Open for high-impact full-stack roles, systems architecture, and selective contracts.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <GlassCard className="p-6 sm:p-8 space-y-6">
            {/* Dual-Intent Toggle */}
            <div className="flex p-1.5 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setIntent('hiring')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  intent === 'hiring'
                    ? 'bg-electric-blue text-white shadow-specular-blue'
                    : 'text-slate-400 hover:text-white'
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
                    : 'text-slate-400 hover:text-white'
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
