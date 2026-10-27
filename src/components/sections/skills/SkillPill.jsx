import React, { useState } from 'react';
import { Layers, Award } from 'lucide-react';

export default function SkillPill({ skill, matchingProjects, isEnterprise = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const count = matchingProjects.length;

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered 
            ? `0 0 16px ${skill.brandColor}40, inset 0 0 8px ${skill.brandColor}20` 
            : 'none',
          borderColor: isHovered ? skill.brandColor : 'rgba(255, 255, 255, 0.08)',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.03)',
        }}
        className="group/pill inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 border cursor-pointer select-none"
      >
        <span 
          className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover/pill:scale-125"
          style={{ backgroundColor: skill.brandColor, boxShadow: `0 0 6px ${skill.brandColor}` }}
        />
        <span>{skill.name}</span>
        {count > 0 && (
          <span 
            className="text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono transition-colors"
            style={{ 
              backgroundColor: `${skill.brandColor}25`, 
              color: skill.brandColor 
            }}
          >
            {count}
          </span>
        )}
      </button>

      {/* Floating Tooltip */}
      {isHovered && (
        <div 
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl bg-slate-900/95 border border-white/15 backdrop-blur-xl shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-150"
          style={{ borderColor: `${skill.brandColor}50` }}
        >
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold mb-1" style={{ color: skill.brandColor }}>
            <span>{skill.name}</span>
            <span>{count > 0 ? `${count} Repos` : isEnterprise ? 'Production' : 'Core'}</span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans leading-tight">
            {count > 0 ? (
              <>Utilized across <span className="text-white font-semibold">{count}</span> live portfolio project{count > 1 ? 's' : ''}.</>
            ) : isEnterprise ? (
              <>Applied across 3+ years of enterprise retail operations at Reliance Retail Ltd.</>
            ) : (
              <>Core competency implemented in foundational academic and production workflows.</>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
