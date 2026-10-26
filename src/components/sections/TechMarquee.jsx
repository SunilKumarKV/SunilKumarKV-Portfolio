import React from 'react';

/**
 * Ticker items for Dual Marquee rows
 */
const MARQUEE_ROW_1 = [
  { name: 'React.js', color: '#61DAFB' },
  { name: 'JavaScript (ES6+)', color: '#F7DF1E' },
  { name: 'Tailwind CSS', color: '#38BDF8' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'Vite', color: '#BD34FE' },
  { name: 'Redux / Context', color: '#764ABC' },
  { name: 'HTML5 & CSS3', color: '#E34F26' },
  { name: 'REST APIs', color: '#E10098' },
  { name: 'n8n Workflows', color: '#EA580C' },
  { name: 'Core Java', color: '#F89820' },
];

const MARQUEE_ROW_2 = [
  { name: 'SAP MM', color: '#0284C7' },
  { name: 'SAP CRM', color: '#0369A1' },
  { name: 'Git & GitHub', color: '#F05032' },
  { name: 'Data Structures (DSA)', color: '#A855F7' },
  { name: 'Inventory Optimization', color: '#10B981' },
  { name: 'Webhooks & Automation', color: '#10B981' },
  { name: 'Operating Systems', color: '#6366F1' },
  { name: 'Financial Reconciliation', color: '#F59E0B' },
  { name: 'C Programming', color: '#00599C' },
  { name: 'Commercial Operations', color: '#14B8A6' },
];

/**
 * TechMarquee Component
 * Dual infinite auto-scrolling rows of technology pills using CSS keyframes.
 * Row 1 scrolls left, Row 2 scrolls right.
 * Pauses smoothly on mouse hover.
 */
export default function TechMarquee() {
  return (
    <div className="relative py-4 space-y-4 overflow-hidden marquee-mask group select-none">
      
      {/* Row 1: Scrolling Left */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-left flex items-center gap-3 group-hover:[animation-play-state:paused] py-1">
          {/* Duplicated for seamless infinite looping */}
          {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((tech, index) => (
            <div
              key={`row1-${tech.name}-${index}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-white/30 shadow-glass-sm backdrop-blur-md transition-all cursor-default"
            >
              <span 
                className="w-2 h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-xs font-mono font-medium text-slate-200 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolling Right */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-right flex items-center gap-3 group-hover:[animation-play-state:paused] py-1">
          {/* Duplicated for seamless infinite looping */}
          {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((tech, index) => (
            <div
              key={`row2-${tech.name}-${index}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-white/30 shadow-glass-sm backdrop-blur-md transition-all cursor-default"
            >
              <span 
                className="w-2 h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-xs font-mono font-medium text-slate-200 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker Interaction Label */}
      <div className="text-center pt-1">
        <span className="text-[11px] font-mono text-slate-500">
          Hover over tickers to pause stream
        </span>
      </div>
    </div>
  );
}
