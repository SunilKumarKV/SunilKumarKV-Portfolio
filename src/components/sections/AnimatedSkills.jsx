import React from 'react';
import TechMarquee from './TechMarquee';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import { SKILL_CATEGORIES } from './skills/skillsData';
import SkillPill from './skills/SkillPill';
import GlassCard from '../ui/GlassCard';
import { Sparkles } from 'lucide-react';

export default function AnimatedSkills() {
  const { projects } = useGitHubProjects();

  const getProjectsUsingSkill = (skill) => {
    if (!projects || projects.length === 0) return [];
    const searchTerms = [skill.name.toLowerCase(), ...(skill.aliases || [])];
    return projects.filter((project) =>
      project.techStack?.some((tech) =>
        searchTerms.some((term) => tech.toLowerCase().includes(term) || term.includes(tech.toLowerCase()))
      )
    );
  };

  return (
    <section id="skills" className="scroll-mt-28 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
          <span>Competency Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Technical Fluency
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Bridging enterprise operational systems with modern reactive web engineering.
        </p>
      </div>

      {/* Dual Marquee Tickers */}
      <TechMarquee />

      {/* 4 Category Bento Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <GlassCard key={category.id} className="p-6 sm:p-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2.5 rounded-xl border border-white/10"
                      style={{ backgroundColor: `${category.color}15`, color: category.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-mono">{category.title}</h3>
                      <span className="text-[11px] font-mono font-medium" style={{ color: category.color }}>
                        {category.badge}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{category.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {category.skills.map((skill) => (
                  <SkillPill
                    key={skill.name}
                    skill={skill}
                    matchingProjects={getProjectsUsingSkill(skill)}
                    isEnterprise={category.id === 'enterprise-ops'}
                  />
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
