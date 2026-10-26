import React, { useState } from 'react';
import TechMarquee from './TechMarquee';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import { portfolioData } from '../../data/portfolioData';
import { 
  Layout, 
  Workflow, 
  Cpu, 
  Database, 
  Terminal, 
  Sparkles,
  Layers,
  Award
} from 'lucide-react';

/**
 * 4 Category Bento Matrix mapping directly to Sunil Kumar K V's real background
 */
const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    badge: 'Core Focus',
    description: 'Component architecture, reactive state pipelines, modern ES6+ tooling, and responsive glassmorphic UI.',
    icon: Layout,
    color: '#3B82F6', // Electric Blue
    skills: [
      { name: 'React.js', brandColor: '#61DAFB', aliases: ['react', 'reactjs'] },
      { name: 'Hooks', brandColor: '#06B6D4', aliases: ['react', 'hooks'] },
      { name: 'Redux / Context', brandColor: '#764ABC', aliases: ['redux', 'context'] },
      { name: 'JavaScript (ES6+)', brandColor: '#F7DF1E', aliases: ['javascript', 'js'] },
      { name: 'HTML5 & CSS3', brandColor: '#E34F26', aliases: ['html', 'css', 'html5', 'css3'] },
      { name: 'Tailwind CSS', brandColor: '#38BDF8', aliases: ['tailwind', 'tailwindcss'] },
      { name: 'Vite', brandColor: '#BD34FE', aliases: ['vite'] },
    ],
  },
  {
    id: 'workflow',
    title: 'Workflow & Automation',
    badge: 'Backend & Orchestration',
    description: 'Node.js services, n8n webhook automation pipelines, RESTful integration, and event-driven backend logic.',
    icon: Workflow,
    color: '#10B981', // Emerald
    skills: [
      { name: 'Node.js', brandColor: '#68A063', aliases: ['node', 'nodejs'] },
      { name: 'Core Java', brandColor: '#F89820', aliases: ['java'] },
      { name: 'n8n Workflows', brandColor: '#EA580C', aliases: ['n8n', 'workflow', 'automation'] },
      { name: 'Webhooks', brandColor: '#10B981', aliases: ['webhook', 'api', 'automation'] },
      { name: 'REST APIs', brandColor: '#E10098', aliases: ['rest', 'api'] },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core CS & Systems',
    badge: 'MCA / BCA Foundations',
    description: 'Algorithmic thinking, operating system fundamentals, memory structures, and Git version control.',
    icon: Cpu,
    color: '#6366F1', // Indigo
    skills: [
      { name: 'C Programming', brandColor: '#00599C', aliases: ['c', 'system'] },
      { name: 'Operating Systems', brandColor: '#6366F1', aliases: ['os', 'linux'] },
      { name: 'Data Structures (DSA)', brandColor: '#A855F7', aliases: ['dsa', 'algorithms'] },
      { name: 'Git & GitHub', brandColor: '#F05032', aliases: ['git', 'github'] },
    ],
  },
  {
    id: 'enterprise-ops',
    title: 'Enterprise & Operations (SAP MM)',
    badge: 'Reliance Retail (3+ Yrs)',
    description: '3+ years at Reliance Retail Ltd. managing inventory discrepancy (-15%), SKU replenishment (+10-12%), and financial audits.',
    icon: Database,
    color: '#0284C7', // SAP Blue
    skills: [
      { name: 'SAP MM', brandColor: '#0284C7', aliases: ['sap', 'sap-mm', 'materials-management'] },
      { name: 'SAP CRM', brandColor: '#0369A1', aliases: ['crm', 'sap'] },
      { name: 'Inventory Optimization', brandColor: '#10B981', aliases: ['inventory', 'retail'] },
      { name: 'Commercial Operations', brandColor: '#14B8A6', aliases: ['operations', 'commercial'] },
      { name: 'Financial Reconciliation', brandColor: '#F59E0B', aliases: ['reconciliation', 'audit'] },
    ],
  },
];

/**
 * SkillPill Component
 * Features brand color accent, hover elevation, brand glow,
 * and a floating tooltip showing how many synced GitHub repos utilize that technology.
 */
function SkillPill({ skill, matchingProjects, isEnterprise = false }) {
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
          borderColor: isHovered ? `${skill.brandColor}80` : 'rgba(255, 255, 255, 0.08)',
          transform: isHovered ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
        }}
        className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer bg-white/[0.03] hover:bg-white/[0.08] border focus:outline-none"
      >
        {/* Brand Color Dot */}
        <span 
          className="w-2 h-2 rounded-full transition-transform duration-200 group-hover:scale-125"
          style={{ backgroundColor: skill.brandColor }}
        />

        {/* Skill Name */}
        <span className="text-slate-200 group-hover:text-white transition-colors">
          {skill.name}
        </span>
      </button>

      {/* Floating Tooltip displaying synced GitHub repos utilization */}
      {isHovered && (
        <div 
          className="absolute -top-11 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap pointer-events-none shadow-2xl border animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(11, 15, 25, 0.95)',
            borderColor: `${skill.brandColor}70`,
            color: '#F8FAFC',
            boxShadow: `0 8px 24px -4px ${skill.brandColor}35`,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ backgroundColor: skill.brandColor }} 
            />
            <span>
              {count > 0 
                ? `Used in ${count} synced ${count === 1 ? 'repo' : 'repos'}` 
                : isEnterprise
                  ? 'Reliance Retail Enterprise (3+ Yrs)'
                  : 'Core Academic / Bootcamp Skill'}
            </span>
          </div>

          {/* Tooltip Arrow */}
          <div 
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b"
            style={{ 
              backgroundColor: 'rgba(11, 15, 25, 0.95)',
              borderColor: `${skill.brandColor}70`
            }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * AnimatedSkills Section Component
 * Incorporates:
 * 1. TechMarquee (dual infinite auto-scrolling rows of technology pills)
 * 2. Category Bento Matrix (4 frosted glass cards mapped to Sunil's background)
 * 3. Skill Pills & Interactive Tooltips (brand color accents, glow, GitHub repo counts)
 */
export default function AnimatedSkills() {
  const { projects } = useGitHubProjects();

  /**
   * Calculate matching repositories from live GitHub sync
   */
  const getMatchingProjects = (skill) => {
    if (!projects || projects.length === 0) return [];
    
    const targets = [skill.name.toLowerCase(), ...(skill.aliases || [])];
    
    return projects.filter(project => {
      const hasInStack = project.techStack?.some(tech => 
        targets.some(target => tech.toLowerCase().includes(target))
      );
      const hasInDesc = targets.some(target => 
        project.description?.toLowerCase().includes(target)
      );
      const hasInName = targets.some(target => 
        project.name?.toLowerCase().includes(target)
      );

      return hasInStack || hasInDesc || hasInName;
    });
  };

  return (
    <section id="skills" className="scroll-mt-28 space-y-12 relative z-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-electric-blue backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5 text-electric-blue" />
          <span>Technical Competencies & Matrix</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Animated Skill Matrix
        </h2>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Mapped from Sunil's real background across modern web development, workflow automation, and 3+ years of enterprise operations.
        </p>
      </div>

      {/* 1. TechMarquee: Dual Infinite Auto-Scrolling Rows */}
      <TechMarquee />

      {/* 2. Category Bento Matrix: 4 Frosted Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((category) => {
          const CategoryIcon = category.icon;
          const isEnterprise = category.id === 'enterprise-ops';

          return (
            <div
              key={category.id}
              className="glass-card-hover p-7 rounded-3xl specular-border flex flex-col justify-between space-y-6 group bg-slate-900/60"
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div 
                    className="w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${category.color}15`,
                      borderColor: `${category.color}35`,
                      boxShadow: `0 0 20px ${category.color}25`,
                    }}
                  >
                    <CategoryIcon 
                      className="w-5 h-5" 
                      style={{ color: category.color }} 
                    />
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {category.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-slate-100 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* 3. Skill Pills & Interactive Tooltips */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {category.skills.map((skill) => {
                  const matchingProjects = getMatchingProjects(skill);

                  return (
                    <SkillPill
                      key={skill.name}
                      skill={skill}
                      matchingProjects={matchingProjects}
                      isEnterprise={isEnterprise}
                    />
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
