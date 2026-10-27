import React from 'react';
import { SERVICES } from './services/servicesData';
import ServiceCard from './services/ServiceCard';
import { Sparkles, Layers } from 'lucide-react';

/**
 * ServicesSection Component
 * Highlights Sunil's freelance service offerings with Apple/iOS glassmorphism.
 */
export default function ServicesSection() {
  const handleSelectService = () => {
    // Dispatch custom event to flip ContactSection toggle to 'freelance'
    window.dispatchEvent(
      new CustomEvent('set-contact-intent', { detail: 'freelance' })
    );

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#contact';
    }
  };

  return (
    <section id="services" className="scroll-mt-28 space-y-10 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--border-glass)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-electric-blue/10 border border-electric-blue/20 text-electric-blue backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span>Strategic Solutions & Contract Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Services & Solutions
            <span className="block text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-indigo-400 to-emerald mt-1">
              Engineered for Performance. Built for Reliability.
            </span>
          </h2>

          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl leading-relaxed">
            Helping startups, founders, and businesses turn requirements into production web applications and automated workflows.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl ios-glass border border-[var(--border-glass)] text-xs font-mono text-electric-blue self-start md:self-auto">
          <Layers className="w-3.5 h-3.5 text-electric-blue" />
          <span>3 Core Disciplines</span>
        </div>
      </div>

      {/* 3-Column Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelectService={handleSelectService}
          />
        ))}
      </div>
    </section>
  );
}
