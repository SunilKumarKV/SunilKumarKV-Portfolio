import React, { useState } from 'react';
import { GitBranch, ChevronDown, ChevronUp } from 'lucide-react';
import BentoProjectCard from './BentoProjectCard';
import ProjectSkeleton from './ProjectSkeleton';

/**
 * OpenSourceSubGrid Component
 * Collapsible grid of secondary auto-synced GitHub repositories
 */
export default function OpenSourceSubGrid({
  repositories,
  loading,
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!loading && (!repositories || repositories.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-6 pt-6 border-t border-[var(--border-glass)]">
      {/* Sub-grid Header with Accordion Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/5 border border-[var(--border-glass)] text-electric-blue">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              More Open Source Repositories
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Auto-synced public projects with topic "portfolio" from GitHub
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-white/5 hover:bg-white/10 border border-[var(--border-glass)] transition-all active:scale-95"
          aria-expanded={isExpanded}
        >
          <span>{repositories.length} Repos</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Grid Content */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {loading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            repositories.map((repo) => (
              <BentoProjectCard
                key={repo.id}
                project={repo}
                isFeatured={false}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
