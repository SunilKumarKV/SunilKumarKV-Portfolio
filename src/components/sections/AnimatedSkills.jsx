import React from 'react';
import TechMarquee from './TechMarquee';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import { SKILL_CATEGORIES } from './skills/skillsData';
import SkillPill from './skills/SkillPill';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import { Sparkles } from 'lucide-react';

export default function AnimatedSkills() {
  const { projects } = useGitHubProjects();

  const getProjectsUsingSkill = (skill) => {
    if (!projects || !Array.isArray(projects) || projects.length === 0) return [];
    
    // Safely extract name and aliases whether skill is a string or an object
    const skillName = (typeof skill === 'string' ? skill : skill?.name || '').toLowerCase();
    if (!skillName) return [];
    
    const aliases = (typeof skill === 'object' && Array.isArray(skill?.aliases) ? skill.aliases : []).map((a) => a.toLowerCase());
    const searchTerms = [skillName, ...aliases];

    return projects.filter((project) =>
      project?.techStack?.some((tech) => {
        if (!tech || typeof tech !== 'string') return false;
        const techLower = tech.toLowerCase();
        return searchTerms.some((term) => techLower.includes(term) || term.includes(techLower));
      })
    );
  };

  const categories = Array.isArray(SKILL_CATEGORIES) ? SKILL_CATEGORIES : [];

  return (
    <section 
      id="skills" 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-20 relative space-y-12"
    >
      {/* Standard Center-Aligned Heading */}
      <SectionHeading
        eyebrow="Competency Matrix"
        eyebrowIcon={Sparkles}
        title="Technical Fluency"
        subtitle="Bridging enterprise operational systems with modern reactive web engineering."
        align="center"
      />

      {/* Dual Marquee Tickers */}
      <div className="w-full overflow-hidden">
        <TechMarquee />
      </div>

      {/* 4 Category Bento Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, catIndex) => {
          const Icon = category?.icon;
          const skillsList = Array.isArray(category?.skills) ? category.skills : [];

          return (
            <div key={category?.id || `cat-${catIndex}`} className="min-w-0 w-full flex">
              <GlassCard className="p-6 sm:p-7 space-y-5 flex flex-col justify-between w-full min-w-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <div 
                          className="p-2.5 rounded-xl border border-[var(--border-glass)]"
                          style={{ backgroundColor: `${category?.color || '#3B82F6'}15`, color: category?.color || '#3B82F6' }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] font-mono">
                          {category?.title || 'Competencies'}
                        </h3>
                        {category?.badge && (
                          <span className="text-[11px] font-mono font-medium" style={{ color: category?.color || '#3B82F6' }}>
                            {category.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {category?.description && (
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-glass)]">
                  {skillsList.map((skill, skillIndex) => {
                    const matching = getProjectsUsingSkill(skill);
                    const pillKey = typeof skill === 'string' ? `${skill}-${skillIndex}` : (skill?.name || `skill-${skillIndex}`);

                    return (
                      <SkillPill
                        key={pillKey}
                        skill={skill}
                        matchingProjects={matching}
                        usedInCount={matching.length}
                        isEnterprise={category?.id === 'enterprise-ops'}
                      />
                    );
                  })}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
