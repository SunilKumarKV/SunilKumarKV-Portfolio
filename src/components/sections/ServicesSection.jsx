import React from 'react';
import { SERVICES } from './services/servicesData';
import ServiceCard from './services/ServiceCard';
import SectionHeading from '../ui/SectionHeading';
import { Sparkles, Layers } from 'lucide-react';

/**
 * ServicesSection Component
 * Symmetrical 3-Card Grid for Sunil's freelance service offerings.
 */
export default function ServicesSection() {
  const handleSelectService = () => {
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

  const disciplineBadge = (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl ios-glass border border-[var(--border-glass)] text-xs font-mono text-electric-blue">
      <Layers className="w-3.5 h-3.5 text-electric-blue flex-shrink-0" />
      <span>3 Core Disciplines</span>
    </div>
  );

  return (
    <section 
      id="services" 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-20 relative space-y-10"
    >
      {/* Standard Section Heading */}
      <SectionHeading
        eyebrow="Strategic Solutions & Contract Engineering"
        eyebrowIcon={Sparkles}
        title="Services & Solutions"
        tagline="Engineered for Performance. Built for Reliability."
        subtitle="Helping startups, founders, and businesses turn requirements into production web applications and automated workflows."
        action={disciplineBadge}
      />

      {/* Symmetrical 3-Card Grid (min-w-0 on each column item) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {SERVICES.map((service, index) => (
          <div 
            key={service.id} 
            className={`min-w-0 w-full flex ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            <ServiceCard
              service={service}
              onSelectService={handleSelectService}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
