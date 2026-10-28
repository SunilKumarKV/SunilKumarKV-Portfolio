import React, { useState, useMemo } from 'react';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import { portfolioData } from '../../data/portfolioData';
import { RotateCw, CheckCircle2, Sparkles, FolderGit2, AlertCircle } from 'lucide-react';
import BentoProjectCard from './projects/BentoProjectCard';
import ProjectSkeleton from './projects/ProjectSkeleton';
import ProjectFilterTabs from './projects/ProjectFilterTabs';
import SectionHeading from '../ui/SectionHeading';

function matchesCategory(project, tabId) {
  if (tabId === 'all') return true;
  const cat = (project.category || '').toLowerCase();
  const stack = (project.techStack || []).map((t) => t.toLowerCase());
  if (tabId === 'fullstack') {
    return cat.includes('full') || stack.some((t) => ['react', 'node.js', 'express', 'full stack', 'websockets'].includes(t));
  }
  if (tabId === 'saas') {
    return cat.includes('saas') || stack.some((t) => ['saas', 'utility', 'compression', 'webassembly', 'ai / ml', 'devtools'].includes(t));
  }
  return true;
}

export default function ProjectsGrid() {
  const { projects, isLoading, isFallback, fromCache, error, refetch } = useGitHubProjects();
  const [activeTab, setActiveTab] = useState('all');

  const featuredProducts = portfolioData.featuredProducts || [];

  // Pinned Tier 1 Flagships: ChessPlay and AttendanceTracker
  const flagshipIds = ['chessplay', 'attendancetracker'];
  const primaryFlagships = useMemo(
    () => featuredProducts.filter((p) => flagshipIds.includes(p.id.toLowerCase())),
    [featuredProducts]
  );

  // Secondary Tier: GetCompressly, DevWithSunil, + remaining auto-synced repos
  const secondaryFeatured = useMemo(
    () => featuredProducts.filter((p) => !flagshipIds.includes(p.id.toLowerCase())),
    [featuredProducts]
  );

  // Deduplicated Open-Source Repositories (exclude featured flagship names)
  const openSourceRepos = useMemo(() => {
    const featuredNames = new Set(
      featuredProducts.map((p) => (p.name || '').toLowerCase())
    );
    return projects.filter((p) => !featuredNames.has((p.name || '').toLowerCase()));
  }, [projects, featuredProducts]);

  // Combined secondary pool
  const allSecondary = useMemo(
    () => [...secondaryFeatured, ...openSourceRepos],
    [secondaryFeatured, openSourceRepos]
  );

  // Filtered views
  const filteredPrimary = useMemo(
    () => primaryFlagships.filter((p) => matchesCategory(p, activeTab)),
    [primaryFlagships, activeTab]
  );

  const filteredSecondary = useMemo(
    () => allSecondary.filter((p) => matchesCategory(p, activeTab)),
    [allSecondary, activeTab]
  );

  // Total counts for filter pills
  const counts = useMemo(() => {
    const total = [...featuredProducts, ...openSourceRepos];
    return {
      all: total.length,
      fullstack: total.filter((p) => matchesCategory(p, 'fullstack')).length,
      saas: total.filter((p) => matchesCategory(p, 'saas')).length,
    };
  }, [featuredProducts, openSourceRepos]);

  const syncAction = (
    <div className="flex items-center gap-2.5">
      <button
        onClick={refetch}
        disabled={isLoading}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] ios-glass hover:bg-white/10 border border-[var(--border-glass)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        title={isLoading ? 'Synchronizing with GitHub API...' : 'Refresh GitHub repositories cache'}
        aria-label="Synchronize GitHub repositories"
      >
        <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-electric-blue' : ''}`} />
        <span>{isLoading ? 'Syncing...' : 'Sync'}</span>
      </button>

      <div
        className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)]"
        title={error || (fromCache ? 'Data loaded from 1-hour localStorage cache' : isFallback ? 'Curated fallback projects' : 'Live data from GitHub API')}
      >
        {isLoading ? (
          <><RotateCw className="w-3.5 h-3.5 text-electric-blue animate-spin flex-shrink-0" /><span className="text-electric-blue">Syncing...</span></>
        ) : error || isFallback ? (
          <><AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /><span className="text-amber-400">{isFallback ? 'Fallback Mode' : 'Sync Issue'}</span></>
        ) : fromCache ? (
          <><CheckCircle2 className="w-3.5 h-3.5 text-emerald flex-shrink-0" /><span>Cached</span></>
        ) : (
          <><CheckCircle2 className="w-3.5 h-3.5 text-emerald flex-shrink-0" /><span>Live API</span></>
        )}
      </div>
    </div>
  );

  return (
    <section 
      id="projects" 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 scroll-mt-20 relative space-y-10"
    >
      <div id="work" className="absolute -top-20" />

      {/* Standard Section Heading */}
      <SectionHeading
        eyebrow="Production Products & Repositories"
        eyebrowIcon={Sparkles}
        title="Featured Products"
        subtitle="Real-world full-stack web applications, SaaS file-processing tools, and responsive interface systems."
        action={syncAction}
      />

      {/* Interactive Category Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <ProjectFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />
        <span className="text-xs font-mono text-[var(--text-secondary)] hidden sm:inline-block">
          Showing {filteredPrimary.length + filteredSecondary.length} of {counts.all} Projects
        </span>
      </div>

      {/* Tier 1: Primary Flagships Grid (ChessPlay & AttendanceTracker - 2-Col on Desktop) */}
      {filteredPrimary.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-electric-blue font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Primary Flagships</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {filteredPrimary.map((product) => (
              <div key={product.id} className="min-w-0 w-full flex">
                <BentoProjectCard
                  project={product}
                  isFeatured={false}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tier 2: Secondary Flagships & Auto-Synced Repositories (3-Col on Desktop) */}
      <div className="space-y-4 pt-4 border-t border-slate-200/70 dark:border-slate-800/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            <span>SaaS Utilities & Open Source ({filteredSecondary.length})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {isLoading && allSecondary.length === 0 ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            filteredSecondary.map((project) => (
              <div key={project.id} className="min-w-0 w-full flex">
                <BentoProjectCard
                  project={project}
                  isFeatured={false}
                  className="w-full"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
