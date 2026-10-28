import React, { useState } from 'react';

/**
 * SkillPill Component
 * Safely handles both string values ("React") and object structures ({ name: "React", brandColor: "#...", icon: "⚛️" })
 * Displays an interactive tooltip showing portfolio repo usage count and enterprise context.
 */
export default function SkillPill({
  skill,
  matchingProjects,
  usedInCount,
  isEnterprise = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Normalize skill: handles string values ("React") and object structures ({ name: "React", brandColor: "#...", icon: "⚛️" })
  const skillName = typeof skill === 'string' ? skill : skill?.name || 'Skill';
  const brandColor = (typeof skill === 'object' && skill?.brandColor) ? skill.brandColor : '#3B82F6';
  const icon = (typeof skill === 'object' && skill?.icon) ? skill.icon : null;

  // Defensive check for count: handles undefined, array, or numeric usedInCount safely
  const count = typeof usedInCount === 'number'
    ? usedInCount
    : Array.isArray(matchingProjects)
    ? matchingProjects.length
    : matchingProjects?.length || 0;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={`${skillName}${count > 0 ? `, used in ${count} repositories` : ''}`}
        style={{
          boxShadow: isHovered 
            ? `0 0 16px ${brandColor}40, inset 0 0 8px ${brandColor}20` 
            : 'none',
          borderColor: isHovered ? brandColor : undefined,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : undefined,
        }}
        className="group/pill inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 border border-[var(--border-glass)] ios-glass cursor-pointer select-none"
      >
        {icon ? (
          <span className="text-sm leading-none flex-shrink-0">{icon}</span>
        ) : (
          <span 
            className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover/pill:scale-125"
            style={{ backgroundColor: brandColor, boxShadow: `0 0 6px ${brandColor}` }}
          />
        )}
        <span>{skillName}</span>
        {count > 0 && (
          <span 
            className="text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono transition-colors"
            style={{ 
              backgroundColor: `${brandColor}25`, 
              color: brandColor 
            }}
          >
            {count}
          </span>
        )}
      </button>

      {/* Floating Tooltip */}
      {isHovered && (
        <div 
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl bg-slate-900/95 border backdrop-blur-xl shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-150"
          style={{ borderColor: `${brandColor}50` }}
        >
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold mb-1" style={{ color: brandColor }}>
            <span className="truncate">{skillName}</span>
            <span className="flex-shrink-0 ml-1">
              {count > 0 ? `${count} Repos` : isEnterprise ? 'Production' : 'Core'}
            </span>
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
