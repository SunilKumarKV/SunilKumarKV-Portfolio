import React, { useState, useMemo } from 'react';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import { portfolioData } from '../../data/portfolioData';
import { FolderGit2, RotateCw, CheckCircle2, Sparkles } from 'lucide-react';
import BentoProjectCard from './projects/BentoProjectCard';
import ProjectSkeleton from './projects/ProjectSkeleton';
import ProjectFilterTabs from './projects/ProjectFilterTabs';
import OpenSourceSubGrid from './projects/OpenSourceSubGrid';

function matchesCategory(project, tabId) {
  if (tabId === 'all') return true;
  const cat = (project.category || '').toLowerCase();
  const stack = (project.techStack || []).map((t) => t.toLowerCase());

  if (tabId === 'fullstack') {
    return (
      cat.includes('full-stack') ||
      cat.includes('fullstack') ||
      stack.some((t) => ['react', 'node.js', 'express', 'full stack', 'websockets'].includes(t))
    );
  }
  if (tabId === 'saas') {
    return (
      cat.includes('saas') ||
      cat.includes('utilities') ||
      stack.some((t) => ['saas', 'utility', 'compression', 'webassembly', 'ai / ml', 'devtools'].includes(t))
    );
  }
  return true;
}

export default function ProjectsGrid() {
  const { projects, loading, isFallback, refreshProjects } = useGitHubProjects();
  const [activeTab, setActiveTab] = useState('all');

  const featuredProducts = portfolioData.featuredProducts || [];

  // Deduplicate: Exclude repositories already highlighted in pinned flagships
  const openSourceRepos = useMemo(() => {
    const featuredNames = new Set(
      featuredProducts.map((p) => (p.name || '').toLowerCase())
    );
    return projects.filter((p) => !featuredNames.has((p.name || '').toLowerCase()));
  }, [projects, featuredProducts]);

  // Filtered views based on selected category tab
  const filteredFeatured = useMemo(
    () => featuredProducts.filter((p) => matchesCategory(p, activeTab)),
    [featuredProducts, activeTab]
  );

  const filteredOpenSource = useMemo(
    () => openSourceRepos.filter((p) => matchesCategory(p, activeTab)),
    [openSourceRepos, activeTab]
  );

  // Category counts for interactive pills
  const counts = useMemo(() => {
    const combined = [...featuredProducts, ...openSourceRepos];
    return {
      all: combined.length,
      fullstack: combined.filter((p) => matchesCategory(p, 'fullstack')).length,
      saas: combined.filter((p) => matchesCategory(p, 'saas')).length,
    };
  }, [featuredProducts, openSourceRepos]);

  return (
    <section id="projects" className="scroll-mt-28 space-y-8 relative">
      <div id="work" className="absolute -top-28" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
            <span>Production Products & Repositories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl">
            Real-world full-stack web applications, SaaS file-processing tools, and responsive interface systems.
          </p>
        </div>

        {/* Sync Status & Action */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            onClick={refreshProjects}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] ios-glass hover:bg-white/10 border border-[var(--border-glass)] transition-all active:scale-95 disabled:opacity-50"
            title="Refresh GitHub repositories cache"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-electric-blue' : ''}`} />
            <span>Sync</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
            <span>{isFallback ? 'Cached Mode' : 'Live GitHub API'}</span>
          </div>
        </div>
      </div>

      {/* Interactive Glass Category Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <ProjectFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />
        <span className="text-xs font-mono text-[var(--text-secondary)] hidden sm:inline-block">
          Showing {filteredFeatured.length + filteredOpenSource.length} of {counts.all} Projects
        </span>
      </div>

      {/* Pinned Flagship Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatured.map((product, idx) => {
          const isWide = filteredFeatured.length === 4 ? idx === 0 || idx === 3 : false;
          return (
            <BentoProjectCard
              key={product.id}
              project={product}
              isFeatured={isWide}
            />
          );
        })}
      </div>

      {/* Auto-Synced GitHub Sub-Grid */}
      <OpenSourceSubGrid
        repositories={filteredOpenSource}
        loading={loading}
      />
    </section>
  );
}
