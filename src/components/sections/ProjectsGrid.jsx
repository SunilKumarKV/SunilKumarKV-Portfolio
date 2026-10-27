import React from 'react';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import { FolderGit2, RotateCw, CheckCircle2 } from 'lucide-react';
import BentoProjectCard from './projects/BentoProjectCard';
import ProjectSkeleton from './projects/ProjectSkeleton';

export default function ProjectsGrid() {
  const { projects, loading, isFallback, lastSyncTime, refreshProjects } = useGitHubProjects();

  return (
    <section id="projects" className="scroll-mt-28 space-y-10 relative">
      <div id="work" className="absolute -top-28" />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300 backdrop-blur-md">
            <FolderGit2 className="w-3.5 h-3.5 text-electric-blue" />
            <span>GitHub Live Repositories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineered Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            Real-world full-stack web applications, automation pipelines, and interface architectures.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            onClick={refreshProjects}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-electric-blue' : ''}`} />
            <span>Sync</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
            <span>{isFallback ? 'Cached Mock Mode' : 'Live GitHub API'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <ProjectSkeleton isFeatured={true} />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </>
        ) : (
          projects.map((project) => (
            <BentoProjectCard
              key={project.id}
              project={project}
              isFeatured={project.isFeatured}
            />
          ))
        )}
      </div>
    </section>
  );
}
